// apps/web/src/app/features/auth/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    localStorage.clear();
  }, []);

  //! Form submit handler
  const onSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    try {
      const login_data = await login({ email, password });
      console.log('Login response:', login_data);

      if (login_data && login_data.success) {
        console.log('Login successful, navigating to dashboard...');
        navigate('/transactions', { replace: true });
      } else {
        setLocalError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setLocalError(err.message);
    }
  }; //! Form submit handler -- Son

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Giriş Yap</h1>
        <p className="auth-subtitle">Hesabına erişmek için bilgilerini gir</p>

        <form onSubmit={onSubmit} className="auth-form">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading} className="btn-send w-full">
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Button>

          {(localError || error) && <div className="error">{localError || error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
