import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postApi, commentApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import type { Post, Comment } from '../types/index.js';
import Navbar from '../components/Navbar';

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentContent, setCommentContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadPost(parseInt(id));
      loadComments(parseInt(id));
    }
  }, [id]);

  const loadPost = async (postId: number) => {
    try {
      const res = await postApi.getPost(postId);
      setPost(res.data);
    } catch (err) {
      console.error('게시글 로드 실패', err);
    }
  };

  const loadComments = async (postId: number) => {
    try {
      const res = await commentApi.getComments(postId);
      setComments(res.data);
    } catch (err) {
      console.error('댓글 로드 실패', err);
    }
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await postApi.deletePost(parseInt(id));
      navigate('/posts');
    } catch (err) {
      alert('삭제 실패');
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !commentContent.trim()) return;
    try {
      await commentApi.createComment(parseInt(id), { content: commentContent });
      setCommentContent('');
      loadComments(parseInt(id));
    } catch (err) {
      alert('댓글 작성 실패. 로그인이 필요합니다.');
    }
  };

  const handleCommentEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleCommentUpdate = async (commentId: number) => {
    if (!id || !editingContent.trim()) return;
    try {
      await commentApi.updateComment(parseInt(id), commentId, { content: editingContent });
      setEditingCommentId(null);
      setEditingContent('');
      loadComments(parseInt(id));
    } catch (err) {
      alert('댓글 수정 실패');
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleCommentDelete = async (commentId: number) => {
    if (!id || !window.confirm('댓글을 삭제하시겠습니까?')) return;
    try {
      await commentApi.deleteComment(parseInt(id), commentId);
      loadComments(parseInt(id));
    } catch (err) {
      alert('댓글 삭제 실패');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center">
          <div className="glass p-8">로딩 중...</div>
        </div>
      </div>
    );
  }

  const isAuthor = user?.id === post.authorId;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        {/* 게시글 내용 */}
        <div className="glass p-8">
          <h1 className="text-3xl font-bold text-primary-dark mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200">
            <span className="font-medium">{post.authorName}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
          </div>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.content}</div>
        </div>

        {/* 게시글 수정/삭제 버튼 */}
        {isAuthor && (
          <div className="flex gap-3">
            <button onClick={() => navigate(`/posts/${id}/edit`)} className="btn-secondary">
              수정
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-[12px] font-medium transition-all"
            >
              삭제
            </button>
          </div>
        )}

        {/* 댓글 섹션 */}
        <div className="glass p-6">
          <h3 className="text-xl font-bold text-primary-dark mb-4">
            댓글 {comments.length}
          </h3>

          {/* 댓글 작성 폼 */}
          {user && (
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <textarea
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="댓글을 입력하세요"
                className="input-glass resize-none mb-3"
                rows={3}
              />
              <button type="submit" className="btn-primary">
                댓글 작성
              </button>
            </form>
          )}

          {/* 댓글 목록 */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white/40 backdrop-blur-sm p-4 rounded-xl">
                {/* 댓글 헤더 */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">{comment.authorName}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {/* 수정/삭제 버튼 */}
                  {user?.id === comment.authorId && editingCommentId !== comment.id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCommentEdit(comment)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleCommentDelete(comment.id)}
                        className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>

                {/* 댓글 내용 또는 수정 폼 */}
                {editingCommentId === comment.id ? (
                  <div className="space-y-3">
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCommentUpdate(comment.id)}
                        className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors text-sm"
                      >
                        저장
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium transition-colors text-sm"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
