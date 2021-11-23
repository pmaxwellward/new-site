import WorkLink from "../components/WorkLink";

export default function WorkRoute() {
    return (
        <main>
            <div className="l-work-links">
                <WorkLink url="web" titleImg='/img/web-title.png' thumbnailImg='/img/web.png' />
                <WorkLink url="animation" titleImg='/img/animation-title.png' thumbnailImg='/img/animation.png' />
                <WorkLink url="illustration" titleImg='/img/illustration-title.png' thumbnailImg='/img/illustration.png' />
            </div>
        </main>
    );
}

