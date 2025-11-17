import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Avatar from '../components/Avatar';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [username, setUsername] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setUsername(user.username);
    }
  }, [user, navigate]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('파일 크기는 5MB 이하여야 합니다.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('이미지 파일만 업로드할 수 있습니다.');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) {
      setError('업로드할 파일을 선택하세요.');
      return;
    }

    setError('');
    setSuccess('');

    try {
      // TODO: Implement photo upload API
      // const formData = new FormData();
      // formData.append('avatar', selectedFile);
      // await userApi.uploadAvatar(formData);

      setSuccess('프로필 사진이 업로드되었습니다.');
      setSelectedFile(null);
      setAvatarPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      await refreshUser();
    } catch (err) {
      setError('프로필 사진 업로드에 실패했습니다.');
    }
  };

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim()) {
      setError('사용자명을 입력하세요.');
      return;
    }

    if (username.length < 2) {
      setError('사용자명은 최소 2자 이상이어야 합니다.');
      return;
    }

    try {
      // TODO: Implement username update API
      // await userApi.updateUsername({ username });

      setSuccess('이름이 업데이트되었습니다.');
      await refreshUser();
    } catch (err) {
      setError('이름 업데이트에 실패했습니다.');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6">
        <div className="glass p-6 mb-6">
          <h1 className="text-3xl font-bold text-primary-dark">프로필 설정</h1>
          <p className="text-sm text-gray-600 mt-2">프로필 사진과 이름을 관리하세요</p>
        </div>

        {error && (
          <div className="glass p-4 mb-6 border-l-4 border-red-500">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="glass p-4 mb-6 border-l-4 border-green-500">
            <p className="text-green-700">{success}</p>
          </div>
        )}

        {/* 프로필 사진 섹션 */}
        <section className="card-glass mb-6">
          <h2 className="text-xl font-semibold text-primary-dark mb-6">프로필 사진</h2>
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <Avatar
                src={avatarPreview || null}
                name={user.username}
                size="lg"
              />
            </div>

            <div className="w-full max-w-md space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="btn-secondary w-full cursor-pointer text-center block"
              >
                사진 선택
              </label>

              {selectedFile && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 text-center">
                    선택된 파일: {selectedFile.name}
                  </p>
                  <button
                    onClick={handleUploadPhoto}
                    className="btn-primary w-full"
                  >
                    업로드
                  </button>
                </div>
              )}

              <p className="text-xs text-gray-500 text-center">
                JPG, PNG 파일만 가능 (최대 5MB)
              </p>
            </div>
          </div>
        </section>

        {/* 이름 변경 섹션 */}
        <section className="card-glass">
          <h2 className="text-xl font-semibold text-primary-dark mb-6">이름 변경</h2>
          <form onSubmit={handleUpdateUsername} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사용자명
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-glass"
                placeholder="사용자명을 입력하세요"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              이름 저장
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
