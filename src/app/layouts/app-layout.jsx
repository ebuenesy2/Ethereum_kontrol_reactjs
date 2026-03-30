//! apps/web/src/app/layouts/app-layout.jsx
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../providers/use-theme';

function AppLayout() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">🗂 Ethereum Manager</div>
          <div className="sidebar-subtitle">Realtime Ethereum System</div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/transactions" className="sidebar-link">
            📊 Transaction
          </NavLink>
          <NavLink to="/sabit" className="sidebar-link">
            ⚙️ Sabit
          </NavLink>
        </nav>

        {/* 🔥 THEME SWITCH */}
        <div className="sidebar-theme">
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            🚪 Çıkış Yap
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
