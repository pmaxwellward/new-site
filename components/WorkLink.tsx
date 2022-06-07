import React from "react";
import Link from 'next/link'

interface Props {
    url: string;
    titleImg: string;
    thumbnailImg: string;
}

const WorkLink = (props: Props) => {
    return (
        <Link href={"/" + props.url} passHref={true}>
        <a className="l-work-link">
            <img className="work-link-title" alt={props.url + "-title"} src={props.titleImg} />
            <img className="work-link-thumb" alt={props.url + "-thumbnail"} src={props.thumbnailImg} />
        </a>
        </Link>
    );
}

export default WorkLink;