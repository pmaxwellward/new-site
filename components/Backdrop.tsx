
interface Props {
    onClick: () => void;
}

const Backdrop = (props: Props) => {
    return (
        <div className="modal-bg" onClick={ props.onClick } onKeyDown={(e) => (e.key == "Enter" || e.key == " ") ? props.onClick : null}>
            <button onClick={ props.onClick } onKeyDown={(e) => (e.key == "Enter" || e.key == " ") ? props.onClick : null} tabIndex={1}>&#10006;</button>
        </div>  
    );
}

export default Backdrop