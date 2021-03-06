import WebItem from "../components/WebItem";

const portfolioItems = [
    {
        id: "trading-app",
        itemURL: "https://pmw-trading-app.herokuapp.com/login",
        class: "desktop-mobile",
        img: ["./img/trading-app-desktop.png", "./img/trading-app-mobile.png"],
        title: "Paper Trading App - Fullstack Web App",
        srcURL: "https://github.com/pmaxwellward/trading-app/",
        info: `A simple paper trading app that demonstrates the principles of full stack development.<br>
            <br>
            Create an account (do not use any self-identifying or sensitive information) and trade stocks with fake money. I use the IEX Cloud API for all the financial data.<br>   
            <br>
            The app is deployed on Heroku, and will take a moment to "wake up" upon initilization.<br>
            <br>
            Built with:<br>
            - Flask (python)<br>
            - Gunicorn (python)<br>
            - HTML5/CSS/JavaScript<br>
            - PostgreSQL<br>  
            - Heroku`
    },
    {
        id: "product",
        itemURL: "https://pmaxwellward.github.io/product-page/",
        class: "desktop-mobile",
        img: ["./img/product-desktop.png", "./img/product-mobile.png"],
        title: "The Product - Mock Product Site",
        srcURL: "https://github.com/pmaxwellward/product-page",
        info: `A sample product page using an interactive 3D model<br>
            <br>
            This app uses a webGL 3D engine to display and handle interaction with the product model. Besides that, this project is light on JavaScript and uses CSS keyframes and the Intersection Observer 
            API to power much of the animation. CSS grid is also heavily used to handle the responsive layout. <br>
            <br>
            Built with:<br>
            - HTML5/CSS/JavaScript<br>
            - Blender (3D modeling software)<br>
            - BabylonJS (webGL framework)<br>`
    },
    {
        id: "critical-targets",
        itemURL: "https://pmaxwellward.github.io/critical-targets/",
        class: "desktop-only",
        img: ["./img/critical-targets-desktop.png"],
        title: "Critical Targets - Interactive 3D",
        srcURL: "https://github.com/pmaxwellward/critical-targets",
        info: `A fully interactive educational 3D site that explores Jupiter and it's largest moons. <br>
            <br>
            This app operates more like a game than a traditional web app. The HTML DOM and CSS is used for the UI, and all functionality is powered by the 3D engine. 
            All info is from NASA. Best experienced on desktop<br>
            <br>
            Built with:<br>
            - HTML5/CSS/JavaScript<br>
            - BabylonJS<br>`
    },
    {
        id: "jbm-legal",
        itemURL: "https://www.figma.com/proto/58aVBRMCTPsSbvXCX00oIc/JBM-Legal?node-id=8%3A4",
        class: "desktop-mobile",
        img: ["./img/jbm-desktop.png", "./img/jbm-mobile.png"],
        title: "JBM Legal Homepage - UI/UX Mockup",
        srcURL: "https://www.figma.com/file/58aVBRMCTPsSbvXCX00oIc/JBM-Legal?node-id=0%3A1",
        info: `A home page mockup for a law firm. <br>
            <br>
            Built with:<br>
            - Figma<br>`
    },
    {
        id: "ready-set-home",
        itemURL: "https://pmaxwellward.github.io/readysethome-demo/",
        class: "desktop-only",
        img: ["./img/rsh-desktop.png"],
        title: "Ready. Set. Home! - Fire TV Web App",
        srcURL: "https://github.com/pmaxwellward/readysethome-demo/",
        info: `An HTML5 video app designed for the Amazon Fire TV platform.<br>
            <br>
            The videos provide medical tutorials and information for family caregivers to children. It was built with a boilerplate template built by Amazon engineers.<br>
            <br>
            <em>Note: All the video content has been replaced with a trailer for the program</em><br>
            <br>
            Client: The Children's Home & Lemieux Family Center / Anthem Video <br>
            <br>
            Built with:<br>
            - HTML5/CSS/JavaScript<br>
            - jQuery<br>
            - PHP <br>`
    },
    {
        id: "cai-sinead",
        itemURL: "https://cai-sinead.com",
        class: "desktop-mobile",
        img: ["/img/cai-sinead-desktop.png", "/img/cai-sinead-mobile.png"],
        title: "cai-sinead - Portfolio Site",
        srcURL: "https://github.com/pmaxwellward/caisinead",
        info: `A artistic portfolio once again using interactive 3D in the browser.<br>
            <br>
            Another site powered by a webGL 3D engine, but this time, a different one from BabylonJS.
            <br>
            Built with:<br>
            - HTML5/CSS/JavaScript<br>
            - Cinema4D<br>
            - three.js<br>`
    }

]

const WebRoute = () => {
    return (
        <main className="work-main">
            <div className="web-intro">
                With my background in animation/design and skills in fullstack web development, I build web applications that are clear, functional, and entertaining.<br/>
                <br/>
                I use Figma and Adobe XD to mockup and prototype. <br/>
                <br/>
                I primarily use HTML5/CSS/JavaScript, Python, SQL, and webGL to build apps.<br/>
                <br/>
                I am also familiar with React, TypeScript, Node, REST APIs, git, and app deployment.<br/>
                <br/>
                Below are samples of my work with information on the technology used.<br/> 
            </div>
            {
                portfolioItems.map((item) =>
                    <WebItem key={item.id} {...item} />
                )
            }
        </main>
    );
}

export default WebRoute;