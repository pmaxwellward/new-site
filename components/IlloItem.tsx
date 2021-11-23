

interface Props {
    id: string;
    img: string;
    caption: string;
    openModal: (data: {id: string, img: string, caption: string}) => void
}

const IlloItem = (props: Props) => {

    return (
        <img src={props.img} alt={props.id} onClick={() => props.openModal({id: props.id, img: props.img, caption: props.caption})}/>
    );

}

export default IlloItem;