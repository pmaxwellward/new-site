import Comment from "./Comment"

interface IComment {
    id: number;
    author: string;
    content: string
}
interface IPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    comments: IComment[];
    published_at: string;
    created_at: string;
    updated_at: string;
}

const Post = (props: IPost) => {

    const date = new Date(props.published_at);
    const mmddyyyy = date.toLocaleDateString('en-US');

    return (
        <div className="post" key={props.id}>
            <div className="post-title"><a href={"/news/" + props.slug}>{props.title}</a> | {mmddyyyy} </div>
            <div className="post-content" dangerouslySetInnerHTML={{__html: props.content}}></div>
            <div className="l-comments-link">
                <a className="comments-link" href={"/news/" + props.slug}>Comments({props.comments.length})</a>
            </div>
        </div>
    );
}

export default Post