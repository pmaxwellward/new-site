import React from "react";
import { useRef, useState, useEffect } from "react";

interface IProps {
    onAddComment: (data: ICommentForm) => Promise<number>;
}

interface ICommentForm {
    author: string;
    content: string;
}

const NewCommentForm = (props: IProps) => {

    const authorInputRef = useRef<HTMLInputElement>(null);
    const contentInputRef = useRef<HTMLTextAreaElement>(null);
    const captchaInputRef = useRef<HTMLInputElement>(null);

    const [showForm, setShowForm] = useState(false);
    const [c, setC] = useState("");
    

    useEffect(() => {
        const canvas: HTMLCanvasElement = document.querySelector("#captcha")!;
    
        const ctx = canvas.getContext("2d")!;
        ctx.font = "30px Roboto";
        ctx.fillStyle = "hsl(230, 95%, 55%)"

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // alphaNums contains the characters with which you want to create the CAPTCHA
        let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let emptyArr = [];
        // This loop generates a random string of 7 characters using alphaNums
        // Further this string is displayed as a CAPTCHA
        for (let i = 1; i <= 7; i++) {
            emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
        }

        setC(emptyArr.join(''));

        ctx.fillText(emptyArr.join(''),canvas.width/4, canvas.height/2);
    
    }, []);

    function refreshCaptcha() {
        const canvas: HTMLCanvasElement = document.querySelector("#captcha")!;
        const status = document.querySelector("#cap-status")!;
        const btn: HTMLButtonElement = document.querySelector("#comment-submit")!;
    
        const ctx = canvas.getContext("2d")!;
        ctx.font = "30px Roboto";
        ctx.fillStyle = "hsl(230, 95%, 55%)";
        
        // alphaNums contains the characters with which you want to create the CAPTCHA
        let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let refreshArr = [];
        
        for (let j = 1; j <= 7; j++) {
            refreshArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        setC(refreshArr.join(''));
        ctx.fillText(refreshArr.join(''),canvas.width/4, canvas.height/2);
        
        status.classList.remove("correct", "incorrect");
        btn.disabled = true;
        btn.classList.remove("enabled");
        btn.classList.add("disabled");

        captchaInputRef.current!.value = "";
    }

    async function submitHandler (e: React.SyntheticEvent) {
        
        e.preventDefault();

        const enteredAuthor = authorInputRef.current!.value;
        const enteredContent = contentInputRef.current!.value;
        const enteredCaptcha = captchaInputRef.current!.value;

        const commentStatus = document.querySelector("#comment-status");
        
        const commentData = {
            author: enteredAuthor,
            content: enteredContent,
            admin_user: null
        }

        const submitStatus = await props.onAddComment(commentData);

        if (submitStatus == 200 && enteredCaptcha.toLowerCase() == c.toLowerCase()) {
            handleShowForm();
            authorInputRef.current!.value = "";
            contentInputRef.current!.value = "";
            captchaInputRef.current!.value = "";
            commentStatus?.classList.remove("comment-fail");
            commentStatus?.classList.add("comment-ok");
        }
        else {
            commentStatus?.classList.remove("comment-ok");
            commentStatus?.classList.add("comment-fail"); 
        }
    }

    function handleShowForm () {
        const commentStatus = document.querySelector("#comment-status")!;
        setShowForm(!showForm)
        refreshCaptcha();
        commentStatus.classList.remove("comment-ok", "comment-fail");
    }

    function speek () {
        let speechStr = "";
        let cSplit = c.split("");
        cSplit.forEach((element) => {
            speechStr += element;
            speechStr += " ";
        });

        let utterance = new SpeechSynthesisUtterance(speechStr);
        utterance.rate = 0.1;
        speechSynthesis.speak(utterance);
    }

    function checkCaptcha(str: string) {
    
        let status = document.querySelector("#cap-status")!;
        let btn: HTMLButtonElement = document.querySelector("#comment-submit")!;

        if (str.length >= 7) {
            if (str.toLowerCase() == c.toLowerCase()) {
                status.classList.add("correct");
                status.classList.remove("incorrect");
                
                btn.disabled = false;
                btn.classList.remove("disabled");
                btn.classList.add("enabled");
            } 
            else {
                status.classList.add("incorrect");
                status.classList.remove("correct");
                
                btn.disabled = true;
                btn.classList.remove("enabled");
                btn.classList.add("disabled");
            }
        } 
        else {
            status.classList.remove("correct", "incorrect");
            btn.disabled = true;
            btn.classList.remove("enabled");
            btn.classList.add("disabled");
        }
    }

    return (
        <>
        <div id="comment-status" />
        <button className="form-toggle" onClick={handleShowForm} tabIndex={5}>Add Comment {showForm ? "-" : "+"}</button>
        <div className={(!showForm) ? "l-comment-form hidden" : "l-comment-form"}>
            <form className="new-comment-form" onSubmit={submitHandler}>
                <input tabIndex={6} type="text" name="author" autoComplete="off" placeholder="name" required ref={authorInputRef} />
                <textarea tabIndex={7} name="content" autoComplete="off" placeholder="comment" rows={10} required ref={contentInputRef} />
                <div className="l-captcha">
                    <canvas id="captcha" />
                    <div className="l-captcha-icons">
                        <img src="/img/captcha_hearing.svg" tabIndex={8} aria-label="hear captcha" role="button" onClick={speek} onKeyDown={(e) => (e.key == "Enter" || e.key == " ") ? speek() : null} />
                        <img src="/img/captcha_refresh.svg" tabIndex={9} aria-label="refresh" role="button" onClick={refreshCaptcha} onKeyDown={(e) => (e.key == "Enter" || e.key == " ") ? refreshCaptcha() : null} />
                    </div>
                </div>
                <label>
                    Please type the characters above: <span id="cap-status"></span>
                    <input tabIndex={10} type="text" name="captcha" onChange={ (e) => checkCaptcha(e.target.value) } required ref={captchaInputRef} />
                </label>
                <button tabIndex={11} id="comment-submit" className="disabled" disabled>submit</button>
            </form>
        </div>
        </>
    )
}

export default NewCommentForm;