export interface User {
  id: number;
  email: string;
  username: string;
  avatarUrl?: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
}

export interface PostRequest {
  title: string;
  content: string;
}

export interface Comment {
  id: number;
  content: string;
  authorName: string;
  authorId: number;
  createdAt: string;
}

export interface CommentRequest {
  content: string;
}
