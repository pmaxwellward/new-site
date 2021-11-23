import React from 'react'

interface Props {
    id: string;
    img: string;
    caption: string;
}
const ImageModal = (props: Props) => {
    return (
        <div className="l-modal">
            <img className="modal-img" alt={props.id} src={props.img} />
            <div className="modal-caption">{props.caption}</div>
        </div>
    );
}

export default ImageModal