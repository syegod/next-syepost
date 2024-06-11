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

export type ClientUser = Omit<User, 'passwordHash'> & {
    posts: Post[],
    liked: Post[],
    comments: Comment[]
}