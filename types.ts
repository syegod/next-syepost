import { Post, User, Comment } from "@prisma/client";

export type ClientPost = Post & {
    author: User,
    likes: User[],
    comments: Comment[]
}

export type ClientComment = Comment & {
    author: User,
    likes:  User,
    post: Post
}