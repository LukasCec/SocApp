export interface Comment {
    id: string;
    authorId: string;
    authorName: string;
    content: string;
    createdAt: Date;
}

export interface Post {
    id: string;
    authorId: string;
    authorName: string;
    content: string;
    createdAt: Date;
    likes: number;
    comments: Comment[];
}