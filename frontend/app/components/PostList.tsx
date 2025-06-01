import React, { useState } from "react";
import type { Post } from "@/types";

interface PostListProps {
    posts: Post[];
    onLike: (postId: string) => void;
    onAddComment: (postId: string, commentText: string) => void;
}

export default function PostList({ posts, onLike, onAddComment }: PostListProps) {
    const [commentTexts, setCommentTexts] = useState<{ [postId: string]: string }>({});

    if (posts.length === 0) {
        return <div>Žiadne príspevky...</div>;
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="bg-black text-white rounded-xl shadow p-4 border border-gray-200"
                >
                    <div className="text-xs text-gray-500 mb-1">
                        {post.authorName} • {post.createdAt.toLocaleString()}
                    </div>
                    <div className="mb-2">{post.content}</div>
                    <button
                        onClick={() => onLike(post.id)}
                        className="ml-2 bg-gray-700 text-white px-2 rounded hover:bg-blue-700"
                    >
                        👍 {post.likes}
                    </button>


                    <div className="mt-4">
                        <div className="font-bold mb-1">Komentáre:</div>
                        {post.comments.length === 0 && (
                            <div className="text-gray-400 text-sm">Zatiaľ žiadne komentáre.</div>
                        )}
                        <ul className="mb-2">
                            {post.comments.map((c) => (
                                <li key={c.id} className="text-sm mb-1">
                                    <b>{c.authorName}:</b> {c.content}
                                </li>
                            ))}
                        </ul>
                        {/* Form - add commentz*/}
                        <form
                            className="flex gap-2"
                            onSubmit={e => {
                                e.preventDefault();
                                const text = commentTexts[post.id]?.trim();
                                if (!text) return;
                                onAddComment(post.id, text);
                                setCommentTexts({ ...commentTexts, [post.id]: "" });
                            }}
                        >
                            <input
                                value={commentTexts[post.id] || ""}
                                onChange={e =>
                                    setCommentTexts({ ...commentTexts, [post.id]: e.target.value })
                                }
                                placeholder="Napíš komentár"
                                className="rounded px-2 py-1 flex-1 border-2 border-gray text-white"
                            />
                            <button
                                type="submit"
                                className="bg-white text-black rounded px-4"
                                disabled={!commentTexts[post.id]?.trim()}
                            >
                                Pridať
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
}
