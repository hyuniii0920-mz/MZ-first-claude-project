import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Avatar from './Avatar';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('로그아웃 실패', err);
    }
  };

  return (
    <nav className="glass sticky top-0 z-50 mb-6">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/posts" className="text-2xl font-bold text-primary-dark hover:text-primary transition-colors">
            Board
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/posts/new">
                  <button className="btn-primary">글쓰기</button>
                </Link>
                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar src={null} name={user.username} size="sm" />
                  <span className="text-sm font-medium text-gray-700">{user.username}</span>
                </Link>
                <button onClick={handleLogout} className="btn-secondary">
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn-primary">로그인</button>
                </Link>
                <Link to="/signup">
                  <button className="btn-secondary">회원가입</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
