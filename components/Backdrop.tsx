
interface Props {
    onClick: () => void;
}

const Backdrop = (props: Props) => {
    return (
        <div className="modal-bg" onClick={ props.onClick }></div>
    );
}

export default Backdrop