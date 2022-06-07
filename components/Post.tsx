

interface IComment {
    id: number;
    author: string;
    content: string
}
interface IPost {
    id: number;
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
            <div className="post-title">{props.title} | {mmddyyyy} </div>
            <div className="post-content" dangerouslySetInnerHTML={{__html: props.content}}></div>
        </div>
    );
}

export default Post