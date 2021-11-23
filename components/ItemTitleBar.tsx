import React from 'react'

interface Props {
    title: string;
    srcURL?: string | undefined;
    icon?: string | undefined;
}

const ItemTitleBar = (props: Props) => {
    
    if (props.srcURL && props.icon) {
        return (
            <div className="title-bar">
                <div className="item-title">{props.title}</div>
                <div className="item-src">
                    <a href={props.srcURL} target="_blank" rel="noreferrer"><img alt="srcImg" src={props.icon} /></a>
                </div>
            </div>
        );
    } else {
        return (
            <div className="title-bar">
                <div className="item-title">{props.title}</div>
            </div>
        );
    }

}

export default ItemTitleBar;