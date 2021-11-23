import { manGIFs, firstGIFs, introGIFs, flyGIFs, angerGIFs, blurbGIFs } from '../public/gifData/gifData';
import { IManGIF, IFlyGIF } from '../public/gifData/gifData';
import { useEffect, useState, useReducer } from 'react'
import next from 'next';

interface IProps {
    loading: boolean;
}


const Mascot = (props: IProps) => {
    
    
    const SPEAK_LENGTH = 3500                                                                           // length of time blurb GIF remains on screen
    const FLY_REPEAT = 3;                                                                               // iterations of fly animation
    const LOOP = Math.floor(Math.random() * (Math.floor(5) - Math.ceil(3) + 1) + Math.ceil(3));         // random loop amount

    // Shuffle text arrays once
    useEffect(() => {
        shuffle(introGIFs);
        shuffle(flyGIFs);
        shuffle(angerGIFs);
        shuffle(blurbGIFs)
    }, [])

    // States
    const [currentGIF, setCurrentGIF] = useState(manGIFs[0]);
    const [currentText, setText] = useState(firstGIFs[0][0]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isIntro, setIsIntro] = useState(true);
    const [blurbState, setBlurbState] = useState({array: [firstGIFs[0], introGIFs[0]], current: 0})
    const [angerState, setAngerState] = useState({array: angerGIFs, current: 0})
    const [introState, setIntroState] = useState({array: blurbGIFs, current: 0})


    // GIF controller, updates when currentGIF state changes
    useEffect(() => {
        
        // wait until images are cached before running
        if(!props.loading) {

            if(isIntro) {
                setCurrentGIF(manGIFs[19]);
            }
            
            // loop lipSync animation while the mascot is speaking
            if (!isSpeaking) {
                let next = findNext(currentGIF.next.length)

                // wait for GIF animation to end, then load next GIF
                setTimeout(()=> { 

                    // if next GIF is a lipSync, begin loop on next render
                    if(next.isSpeaking) {
                        setIsSpeaking(true);
                    }
                    setCurrentGIF(next);

                }, currentGIF.length);
            }
        }

    }, [props.loading, currentGIF]);

    // Text controller. Recursively mounts text while isSpeaking is true. 
    useEffect(() => {
        if(!props.loading) {
            
            let script = findScript()!;

            if(isSpeaking) {
                mountText(script)
            } else {
                unmountText();
            }
        }
    }, [isSpeaking]);
    
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

    function findScript() {
        if (isIntro) {
            setIsIntro(false);
            return introState;
        }

        if (/anger/g.test(currentGIF.src)) {
            return angerState;
        }

        if (/blurb/g.test(currentGIF.src)) {
            return blurbState;
        }
    }

    function findNext(length: number) {
        const index = Math.floor(Math.random() * length);

        let next = manGIFs.find(({ name }) => {
            return name === currentGIF.next[index];
        })!;

        return next;
    }

    function mountText(script: {array: string[][], current: number}, subIdx?: number) {

        let array = script.array;
        let index = script.current;
        
        subIdx = subIdx || 0;
        console.log(subIdx);
           
        if (subIdx < array[index].length) {
        
            setText(array[index][subIdx]);
        
            subIdx++;
        
            setTimeout(() => {
                mountText(script, subIdx) 
            }, SPEAK_LENGTH);

        } else {
            setTimeout(() => {
                setIsSpeaking(false);
            }, SPEAK_LENGTH)

        }
    }

    function unmountText() {

        const next = findNext(currentGIF.next.length);
        
        setCurrentGIF(next);

        const scriptMatch = currentGIF.src.match(/first|intro|anger|blurb/g);
        
        if (scriptMatch)
            switch(scriptMatch[0]) {
                case ("first" || "intro"):
                    setIntroState({...introState, current: (introState.current < introState.array.length) ? introState.current++ : 0 });
                    break;
                case "anger":
                    setAngerState({...angerState, current: (angerState.current < angerState.array.length) ? angerState.current++ : 0 });
                    break;
                case "blurb":
                    setBlurbState({...blurbState, current: (blurbState.current < blurbState.array.length) ? blurbState.current++ : 0 });
                    break;
            }
    }

    return (
        <div className="flex-container">
            <div className="debug">
                <p>debug - current GIF</p>
                <p>loading: {props.loading.toString()}</p>
                <p>isSpeaking: {isSpeaking.toString()}</p>
                <p>currentText: {currentText} </p>
                <p>Intro: {{...introState}} </p>
                <p>Anger: {{...angerState}} </p>
                <p>Blurb: {{...blurbState}} </p>
                <p>name: {currentGIF.name}</p>
                <p>next: {currentGIF.next[0]}</p>
                <p>src: {currentGIF.src}</p>
                <p>length: {currentGIF.length}</p>
            </div>
            <div className="l-mascot">
                <div className="text-Box">
                    <img src={currentText} className={isSpeaking ? "is-Speaking" : "isNot-Speaking"} />
                </div>
                <div className="gif-Man">
                    { <img src={currentGIF.src} /*onClick={poke()}*/ /> }
                </div> 
            </div>
        </div>
    );
}

export default Mascot