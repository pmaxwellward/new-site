import React from 'react'

interface Props {
    id: string;
    img: string;
    caption: string;
    onClick: () => void;
}
const ImageModal = (props: Props) => {
    return (
        <div className="l-modal" onClick={props.onClick} onKeyDown={(e) => (e.key == "Enter" || e.key == " ") ? props.onClick : null} >
            <img className="modal-img" alt={props.id} src={props.img} />
            <div className="modal-caption">{props.caption}</div>
        </div>
    );
}

export default ImageModal