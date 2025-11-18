import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/posts');
    } catch (err) {
      setError('로그인 실패. 이메일과 비밀번호를 확인하세요.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass max-w-md w-full p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-dark mb-2">로그인</h1>
          <p className="text-gray-600">계정에 로그인하세요</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-glass"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-glass"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn-primary w-full">
            로그인
          </button>
        </form>

        <div className="text-center">
          <Link to="/signup" className="text-primary hover:text-primary-dark font-medium">
            회원가입하기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
