'use client'
import React, { useState } from "react";
import PostList from "@/app/components/PostList";
import { Post } from "@/types";
import Link from "next/link";

const InitialPosts: Post[] = [
    {
        id: "1",
        authorId: "a1",
        authorName: "Lukáš",
        content: "Ahoj!",
        createdAt: new Date(),
        likes: 0,
        comments: []
    },
    {
        id: "2",
        authorId: "a2",
        authorName: "Juraj",
        content: "Toto je test.",
        createdAt: new Date(),
        likes: 2,
        comments: []
    }
];

export default function Home() {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [posts, setPosts] = useState<Post[]>(InitialPosts);
    const [newPostText, setNewPostText] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!newPostText.trim()) return;
        const newPost: Post = {
            id: Date.now().toString(),
            authorId: "test",
            authorName: "Test User",
            content: newPostText,
            createdAt: new Date(),
            likes: 0,
            comments: [],
        };
        setPosts([newPost, ...posts]);
        setNewPostText("");
        setIsFormOpen(false);
    }

    function handleLike(id: string) {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === id ? { ...post, likes: post.likes + 1 } : post
            )
        );
    }

    function handleDeletePost(postId: string) {
        setPosts(posts => posts.filter(post => post.id !== postId));
    }

    function handleAddComment(postId: string, commentText: string) {
        setPosts(posts =>
            posts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        comments: [
                            ...post.comments,
                            {
                                id: Date.now().toString(),
                                authorId: "test",
                                authorName: "Test User",
                                content: commentText,
                                createdAt: new Date()
                            }
                        ]
                    }
                    : post
            )
        );
    }

    return (
        <>
            <div className="flex m-4">
                <button onClick={() => setIsFormOpen((prev) => !prev)} className="rounded-full mr-4 bg-white text-black flex items-center justify-center w-12 h-12 aspect-square text-2xl  shadow hover:bg-gray-200">+</button>
                {isFormOpen && (
                    <div className="mb-4">
                        <form onSubmit={handleSubmit}>
                            <textarea className="w-full rounded border-2 text-white border-white p-2 mb-2"
                                      value={newPostText}
                                      onChange={e => setNewPostText(e.target.value)}
                                      placeholder="Napíš svoj príspevok... "
                            />
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Pridať</button>
                        </form>
                    </div>
                )}
            </div>
            <PostList
                posts={posts}
                onLike={handleLike}
                onAddComment={handleAddComment}
                onDeletePost={handleDeletePost}
            />
        </>
    );
}
