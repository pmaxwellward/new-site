

interface Props {
    id: string;
    img: string;
    caption: string;
    openModal: (data: {id: string, img: string, caption: string}) => void;
    index: number;
    modalState: boolean;
}

const IlloItem = (props: Props) => {

    return (
        <img 
            src={props.img + ".png"} 
            alt={props.id} tabIndex={!props.modalState ? props.index : -1} 
            role="button" aria-label="expand image" 
            onClick={() => props.openModal({id: props.id, img: props.img + ".jpg", caption: props.caption})}
            onKeyDown={(e) => (e.key == "Enter" || e.key == " ") ? props.openModal({id: props.id, img: props.img + ".jpg", caption: props.caption}) : null}
            />
    );

}

export default IlloItem;