import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postApi } from '../services/api';

export default function PostFormPage() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit && id) {
      loadPost(parseInt(id));
    }
  }, [id, isEdit]);

  const loadPost = async (postId: number) => {
    try {
      const res = await postApi.getPost(postId);
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (err) {
      setError('게시글을 불러올 수 없습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEdit && id) {
        await postApi.updatePost(parseInt(id), { title, content });
        navigate(`/posts/${id}`);
      } else {
        const res = await postApi.createPost({ title, content });
        navigate(`/posts/${res.data.id}`);
      }
    } catch (err) {
      setError('저장 실패. 로그인이 필요합니다.');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link to="/posts" className="inline-flex items-center text-primary hover:text-primary-dark font-medium">
          ← 목록으로
        </Link>

        <div className="glass p-8">
          <h1 className="text-3xl font-bold text-primary-dark mb-6">
            {isEdit ? '게시글 수정' : '게시글 작성'}
          </h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="input-glass"
                placeholder="제목을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={12}
                className="input-glass resize-none"
                placeholder="내용을 입력하세요"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              {isEdit ? '수정 완료' : '작성 완료'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
