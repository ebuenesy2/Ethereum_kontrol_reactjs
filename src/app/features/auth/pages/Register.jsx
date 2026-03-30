// apps/web/src/app/features/auth/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

function Register() {
  const navigate = useNavigate();
  const { register, create, error } = useAuth();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [role, setRole] = useState('member');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    try {
      await register({
        name,
        surname,
        role,
        email,
        password,
      });
      //console.log('register_data:',register_data.data);

      navigate('/otp');
    } catch (err) {
      setLocalError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Kayıt Ol</h1>
        <p className="auth-subtitle">Yeni bir hesap oluştur</p>

        <form onSubmit={onSubmit} className="auth-form">
          <Input
            type="text"
            placeholder="Ad"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            type="text"
            placeholder="Soyad"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />

          <select
            className="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="member">Üye</option>
            <option value="admin">Admin</option>
          </select>

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

          <Button type="submit" disabled={create} className="btn-send w-full">
            {create ? 'Kaydediliyor...' : 'Kayıt Ol'}
          </Button>

          {(localError || error) && (
            <div className="error">{localError || error}</div>
          )}
        </form>

        <div className="auth-footer">
          Zaten hesabın var mı?{' '}
          <span onClick={() => navigate('/login')}>Giriş Yap</span>
        </div>
      </div>
    </div>
  );
}

export default Register;
