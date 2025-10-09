import React from 'react'
import ItemTitleBar from './ItemTitleBar'

interface Props {
    id: string;
    itemURL: string;
    class: string;
    img: string[];
    title: string;
    srcURL?: string;
    info: string;
}

const WebItem = (props: Props) => {

    const imgURLs = props.img;
    let icon;
    
    const portfolioImgs = imgURLs.map((img, index) => 
        <img key={props.id + index} alt="portfolio-img" src={img} />
    );

   
    if (props.srcURL) {
        const regex = /github/i;
        icon = (regex.test(props.srcURL)) ? "../img/GitHub.png" : "../img/Figma-Icon.svg";
    }


    return (
        <div className="portfolio-item">
            <a href={props.itemURL} target="_blank" rel="noreferrer" className={props.class + " portfolio-img"}>
                {portfolioImgs}
            </a>
            <ItemTitleBar title={props.title} srcURL={props.srcURL} icon={icon} />
            <div className="item-info" dangerouslySetInnerHTML={{__html: props.info}}></div>
        </div>
    );
}

export default WebItem;