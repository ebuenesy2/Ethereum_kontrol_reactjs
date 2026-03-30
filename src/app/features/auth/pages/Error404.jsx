// apps/web/src/app/features/auth/pages/Error404.jsx
import { useNavigate } from 'react-router-dom';

function Error404() {
  const navigate = useNavigate();

  return (
    <div className="error404-bg">
      <div className="error404-card">
        <div className="error404-svg-wrap">
          <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
            <rect x="20" y="20" width="200" height="200" rx="40" fill="#F3F4F6" />
            <path
              d="M75 100C75 79.118 92.118 62 113 62H127C147.882 62 165 79.118 165 100V140C165 160.882 147.882 178 127 178H113C92.118 178 75 160.882 75 140V100Z"
              fill="white"
              stroke="#E5E7EB"
              strokeWidth="4"
            />
            <path d="M95 110H145" stroke="#9CA3AF" strokeWidth="6" strokeLinecap="round" />
            <path d="M95 130H145" stroke="#9CA3AF" strokeWidth="6" strokeLinecap="round" />
            <circle cx="100" cy="100" r="8" fill="#EF4444" />
            <circle cx="140" cy="100" r="8" fill="#EF4444" />
            <text x="120" y="170" textAnchor="middle" fontSize="18" fill="#6B7280">
              404
            </text>
          </svg>
        </div>

        <div className="error404-content">
          <h1 className="error404-title">Üzgünüm, bu sayfa bulunamadı.</h1>
          <p className="error404-desc">
            Aradığınız sayfa taşınmış olabilir veya yanlış bir link kullanılmış olabilir. Ama merak
            etmeyin, doğru yere birlikte gidebiliriz.
          </p>

          <div className="error404-buttons">
            <button className="error404-btn error404-btn-primary" onClick={() => navigate('/')}>
              Ana Sayfaya Dön
            </button>
            <button className="error404-btn error404-btn-outline" onClick={() => navigate(-1)}>
              Geri Git
            </button>
          </div>

          <div className="error404-support">
            Eğer bu sayfa sürekli geliyorsa,{' '}
            <span onClick={() => navigate('/support')}>destek talebi oluştur</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error404;
