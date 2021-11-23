import React from "react";
import { InferGetStaticPropsType } from 'next'
import { marked } from 'marked'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

import Post from "../components/Post"

interface IPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    published_at: string;
    created_at: string;
    updated_at: string;
}

const NewsRoute = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <main>
            {posts && posts.reverse().map((post) => 
                <Post {...post} />
            )}
        </main>
    );
}

export default NewsRoute;

export async function getStaticProps() {
    const res = await fetch("http://localhost:1337/posts");
    const posts: IPost[] = await res.json();

    const window: any = new JSDOM('').window
    const DOMPurify = createDOMPurify(window);

    posts.map((post) => {
        post.content = post.content.replace(/\/uploads\//g, "http://localhost:1337/uploads/");
        post.content = DOMPurify.sanitize(marked.parse(post.content));
    });


    return {
        props: {posts}
    };
}
