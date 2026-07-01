import type { User } from "./auth";

export interface Tag {
    id: number;
    name: string;
}

export interface Comment {
    id: number;
    content: string;
    User: User;
}
export interface PostImage {
  id: number;
  url: string;
}

export interface Post {
    id: number;
    description: string;
    image?: string;
    PostImages? : PostImage[];
    createdAt: string;
    User: User;
    Tags: Tag[];
    Comments?: Comment[];
}