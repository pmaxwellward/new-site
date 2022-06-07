
interface ILoadingScreen {
    class: string;
}

const LoadingScreen = (props:ILoadingScreen) => {
    return (
        <>
            <div className={"load-GIF " + props.class} />
            <div className={"overlay " + props.class}/>   
        </>
    );
}

export default LoadingScreen;