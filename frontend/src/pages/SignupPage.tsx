import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/api';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authApi.signup({ email, password, username });
      navigate('/login');
    } catch (err) {
      setError('회원가입 실패. 이미 존재하는 이메일일 수 있습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass max-w-md w-full p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-dark mb-2">회원가입</h1>
          <p className="text-gray-600">새 계정을 만드세요</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">사용자명</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-glass"
              placeholder="홍길동"
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
            회원가입
          </button>
        </form>

        <div className="text-center">
          <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
            이미 계정이 있으신가요? 로그인 →
          </Link>
        </div>
      </div>
    </div>
  );
}
