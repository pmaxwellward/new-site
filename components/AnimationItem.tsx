import ItemTitleBar from './ItemTitleBar'


interface Props {
    id: string;
    itemURL: string;
    img: string;
    title: string;
    info: string;
}

const AnimationItem = (props: Props) => {

    return (
        <div className="animation-item">
            <a href={props.itemURL}><img src={props.img} alt={props.id} /></a>
            <ItemTitleBar title={props.title} />
            <div className="item-info" dangerouslySetInnerHTML={{__html: props.info}}></div>
        </div>
    );
}

export default AnimationItem;