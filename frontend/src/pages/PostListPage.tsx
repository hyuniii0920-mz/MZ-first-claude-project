import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postApi } from '../services/api';
import type { Post } from '../types/index.js';
import Navbar from '../components/Navbar';

export default function PostListPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await postApi.getAllPosts();
      setPosts(res.data);
    } catch (err) {
      console.error('게시글 로드 실패', err);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6">
        <div className="glass p-6 mb-6">
          <h1 className="text-3xl font-bold text-primary-dark">게시판</h1>
        </div>

        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="glass p-8 text-center text-gray-500">
              게시글이 없습니다
            </div>
          ) : (
            posts.map((post) => (
              <Link key={post.id} to={`/posts/${post.id}`}>
                <div className="card-glass">
                  <h3 className="text-xl font-semibold text-primary-dark mb-2">{post.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="font-medium">{post.authorName}</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
