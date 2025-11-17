import axios from 'axios';
import type { LoginRequest, SignupRequest, User, Post, PostRequest, Comment, CommentRequest } from '../types/index.js';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

export const authApi = {
  signup: (data: SignupRequest) => api.post<User>('/auth/signup', data),
  login: (data: LoginRequest) => api.post<User>('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getCurrentUser: () => api.get<User>('/auth/me'),
};

export const postApi = {
  getAllPosts: () => api.get<Post[]>('/posts'),
  getPost: (id: number) => api.get<Post>(`/posts/${id}`),
  createPost: (data: PostRequest) => api.post<Post>('/posts', data),
  updatePost: (id: number, data: PostRequest) => api.put<Post>(`/posts/${id}`, data),
  deletePost: (id: number) => api.delete(`/posts/${id}`),
};

export const commentApi = {
  getComments: (postId: number) => api.get<Comment[]>(`/posts/${postId}/comments`),
  createComment: (postId: number, data: CommentRequest) => api.post<Comment>(`/posts/${postId}/comments`, data),
  updateComment: (postId: number, commentId: number, data: CommentRequest) => api.put<Comment>(`/posts/${postId}/comments/${commentId}`, data),
  deleteComment: (postId: number, commentId: number) => api.delete(`/posts/${postId}/comments/${commentId}`),
};
