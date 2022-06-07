import { manGIFs, firstGIFs, introGIFs, flyGIFs, angerGIFs, blurbGIFs } from '../public/gifData/gifData';
import { IManGIF, IFlyGIF } from '../public/gifData/gifData';
import { useEffect, useState, useRef } from 'react'

interface IProps {
    loading: boolean;
}

const Mascot = (props: IProps) => {

    const SPEAK_LENGTH = 3000                                                                           // length of time blurb GIF remains on screen
    const INTRO = Math.floor(Math.random() * (Math.floor(3) - Math.ceil(0) + 1) + Math.ceil(0));        // random index for intro GIFs, shuffle algo does not work for intro GIFs ¯\_(ツ)_/¯
    const INTRO_SCRIPT = [[firstGIFs[INTRO][0], introGIFs[INTRO][0],introGIFs[INTRO][1]]];            
    
    let loadingGIF: NodeJS.Timeout;
    let loadingText: NodeJS.Timeout;
    
    // States
    const [currentGIF, setCurrentGIF] = useState<IManGIF | IFlyGIF>(manGIFs[0]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [currentText, setCurrentText] = useState(firstGIFs[0][0]);
    const [isIntro, setIsIntro] = useState(true);

    const isFlyingRef = useRef(false);
    const blurbRef = useRef(0);
    const angerRef = useRef(0);
    
    // Shuffle text arrays once
    useEffect(() => {
        shuffle(angerGIFs);
        shuffle(blurbGIFs)
    }, [])
    
    // hardcoded intro animation
    useEffect(() => {
        
        if (!props.loading) {

            promiseGIF(findGIF("idle_in"))
            .then(() => {
                return promiseGIF(findGIF("lipSyncIdle_in"));
            })
            .then(() => {
                mountText({ array: INTRO_SCRIPT, current: 0 });
                setIsSpeaking(true);
                setIsIntro(false)
                return promiseGIF(findGIF("lipSyncIdle"));
            })
        }
        

    }, [props.loading])

    // GIF controller, updates when currentGIF state changes
    useEffect(() => {
        
        // wait until images are cached before running
        if(!isIntro && !isFlyingRef.current) {

            // loop lipSync animation while the mascot is speaking
            if (!isSpeaking && "next" in currentGIF) {
                let next = findNext(currentGIF.next.length)

                // wait for GIF animation to end, then load next GIF
                loadingGIF = setTimeout(()=> { 
                    
                    // if next GIF is a lipSync, begin loop on next render
                    if(next) {
                        if(next.isSpeaking) {
                            setIsSpeaking(true);
                        }
                        setCurrentGIF(next);
                    } 

                    // if current gif is a looping GIF, set timeout for the GIF length multiplied by a random int between 3-5
                }, currentGIF.looping ? currentGIF.length * Math.floor(Math.random() * (Math.floor(5) - Math.ceil(3) + 1) + Math.ceil(3)) : currentGIF.length);
            }
        }

        return () => {
            clearTimeout(loadingGIF);
            clearTimeout(loadingText);
        }

    }, [currentGIF]);

    // Text controller. Recursively mounts text while isSpeaking is true. 
    useEffect(() => {
        if(!props.loading && !isIntro) {
            
            let script = findScript()!;

            if(isSpeaking) {
                mountText(script);
            } else {
                unmountText();
            }
        }
    }, [isSpeaking]);
  
    // used when you need a promise returned when a GIF is complete
    function promiseGIF(gif: IManGIF | IFlyGIF) {
        setCurrentGIF(gif);
        return new Promise((resolve, reject) => {
            if ("src" in gif) {
                setTimeout(() => {
                    resolve(`${gif.name} is set`);
                }, gif.length)
            } else {
                reject("there is no src property in gif argument");
            }
        })
    }

    // array shuffler
    function shuffle(a: any[]) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    // Find which dialogue script to load
    function findScript() {

        // Angry lipsync or normal lipsync
        if (/anger|fly/g.test(currentGIF.name)) {
            return {array: angerGIFs, current: angerRef.current};
        } else {
            return {array: blurbGIFs, current: blurbRef.current};
        }

    }

    // find next GIF that is stored in next property

    function findNext(length: number) {
        const index = Math.floor(Math.random() * length);
        
        let next: IManGIF;
        if("next" in currentGIF) {
            next = findGIF(currentGIF.next[index]);
            return next;
        } else {
            console.error("next property does not exist on currentGIF")
        }   

    }

    function findGIF(query: string) {
        let gif = manGIFs.find(({ name }) => {
            return name === query;
        })!;

        return gif;
    }

    // mount text GIF from script to DOM

    function mountText(script: {array: string[][], current: number}, subIdx?: number) {

        let arr = script.array;
        let index = script.current;
        
        subIdx = subIdx || 0;
           
        if (subIdx < arr[index].length) {
        
            setCurrentText(arr[index][subIdx]);
        
            subIdx++;
        
            loadingText = setTimeout(() => {
                mountText(script, subIdx) 
            }, SPEAK_LENGTH);

        } else {
            loadingText = setTimeout(() => {
                setIsSpeaking(false);
            }, SPEAK_LENGTH)

        }
    }

    // transition out of talking animation, and then increase index of script array

    function unmountText() {

        let next: IManGIF;
        
        if("next" in currentGIF) {
            next = findNext(currentGIF.next.length)!;
            setCurrentGIF(next);
        }

        const scriptMatch = currentText.match(/anger|blurb/g);
        
        if (scriptMatch != null)
            switch(scriptMatch[0]) {
                case "anger":
                    angerRef.current = (angerRef.current < angerGIFs.length - 1) ? angerRef.current + 1 : 0;
                    break;
                case "blurb":
                    blurbRef.current = (blurbRef.current < blurbGIFs.length - 1) ? blurbRef.current + 1 : 0 
                    break;
            }
    }

    function punch(e: any) {
        if (!isFlyingRef.current) {
            e.preventDefault();
            clearTimeout(loadingGIF);
            clearTimeout(loadingText);
            setIsSpeaking(false);
            isFlyingRef.current = true;
            shuffle(flyGIFs);

            promiseGIF(findGIF("fly"))
            .then(()=> {
                return promiseGIF(findGIF("fly_in"));
             })
            .then(()=> {
                return promiseGIF(flyGIFs[0]);
            })
            .then(()=> {
                return promiseGIF(flyGIFs[1]);
            })
            .then(()=> {
                return promiseGIF(flyGIFs[2]); 
            })
            .then(()=> {
                isFlyingRef.current = false;
                return promiseGIF(findGIF("fly_out"));   
            })
        }
    }

    return (
        <div className="flex-container">
            <div className="l-mascot" onClick={(e) => {punch(e)} }>
                <div className="text-Box">
                    <img src={currentText} className={isSpeaking ? "is-Speaking" : "isNot-Speaking"} />
                </div>
                <div className="gif-Man">
                    { <img src={currentGIF.src} /> }
                </div> 
            </div>
        </div>
    );
}

export default Mascot