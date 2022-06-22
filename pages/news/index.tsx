import React from "react";
import { InferGetStaticPropsType } from 'next'
import { marked } from 'marked'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { useRouter } from "next/dist/client/router";

import PostPreview from "../../components/PostPreview"

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

const NewsRoute = ({ posts, page, count }: {posts: IPost[], page: number, count: number}) => {
    
    const router = useRouter();
    const lastPage = Math.ceil(count / 5);
    
    return (
        <main className="news-main">
            <div className="l-posts">
                {posts && posts.map((post) => 
                    <PostPreview key={post.id} {...post} />
                )}
            </div>
            <div className="l-pagination">
                <button onClick={() => router.push(`/news?page=${ page - 1 }`)} disabled={page <= 1}>&lt; Prev</button>            
                <button onClick={() => router.push(`/news?page=${ page + 1 }`)} disabled={page >= lastPage}>Next &gt;</button>
            </div>
        </main>
    );
}

export default NewsRoute;

export async function getServerSideProps({ query: {page = 1} }) {
    
    const limit = 5
    const start = +page === 1 ? 0 : (+page - 1) * 5

    const res = await fetch(`${process.env.API_URL}/posts?_sort=published_at:DESC&_start=${start}&_limit=${limit}`);
    const posts: IPost[] = await res.json();

    const countRes = await fetch(`${process.env.API_URL}/posts/count`);
    const countData: number = await countRes.json();

    const window: any = new JSDOM('').window
    const DOMPurify = createDOMPurify(window);

    posts.map((post) => {
        post.content = post.content.replace(/\/uploads\//g, `${process.env.API_URL}/uploads/`);
        post.content = DOMPurify.sanitize(marked.parse(post.content), { ALLOWED_TAGS: ["iframe"], ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] });
    });


    return {
        props: {
            posts: posts, 
            page: +page,
            count: countData
        }
    };
}

