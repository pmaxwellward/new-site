import react from 'react'

interface IComment {
    id: number;
    author: string;
    content: string;
    published_at: string;
    created_at: string;
    updated_at: string; 
    admin_user: number | null;
}

const Comment = (props: IComment) => {

    const date = new Date(props.created_at);

    return (
        <div className="comment" key={"comment_" + props.id}>
            <div className='comment-author'><span className={props.admin_user ? "admin" : ""}>{props.author}</span><span className="comment-date"> &middot; {date.toLocaleDateString('en-US') + " " + date.toLocaleTimeString('en-US')}</span></div>
            <div className='comment-content'>{props.content}</div>
        </div>
    );
}

export default Comment