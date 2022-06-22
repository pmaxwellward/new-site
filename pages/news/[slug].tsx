import React from "react";
import { InferGetStaticPropsType } from 'next'
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from 'querystring'
import { marked } from 'marked'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

import Post from "../../components/Post"
import Comment from "../../components/Comment"
import NewCommentForm from "../../components/NewCommentForm"


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

interface IParams extends ParsedUrlQuery {
    slug: string;
}

interface ICommentForm {
    author: string;
    content: string;
}

interface IComment {
    id: number;
    author: string;
    content: string;
    published_at: string;
    created_at: string;
    updated_at: string; 
    admin_user: number | null;
}

const NewsRoute = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {

    async function addCommentHandler(data: ICommentForm) {

        const comment = {
            author: data.author,
            content: data.content,
            post: {
                id: post.id
            },
            published_at: null
        }

        let res = await fetch("https://news-pmw.herokuapp.com/comments", {
                method: 'POST',
                body: JSON.stringify(comment),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

        return res.status;
    }

    return (
        <main>
            <div className="l-slug">
                <Post {...post} />
                <NewCommentForm onAddComment={addCommentHandler} />
                <div className="comment-section">
                {post.comments.map((comment: IComment) => 
                    <Comment key={comment.id} {...comment} /> 
                )}
                </div>
            </div>
        </main>
    );
}

export default NewsRoute;


export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`${process.env.API_URL}/posts`);
    const posts: IPost[] = await res.json();

    const paths = posts.map((post) => ({
        params: {slug: post.slug}
    }));

    return {
        paths,
        fallback: false
    };
}

export const getStaticProps: GetStaticProps = async (context) => {

    const { slug } = context.params!;

    const res = await fetch(`${process.env.API_URL}/posts?slug=${slug}`);

    const data = await res.json();

    const post = data[0]

    const window: any = new JSDOM('').window
    const DOMPurify = createDOMPurify(window);

    post.content = post.content.replace(/\/uploads\//g, `${process.env.API_URL}/uploads/`);
    post.content = DOMPurify.sanitize(marked.parse(post.content), { ADD_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] });

    return {
        props: { post }
    }
}