// apps/web/src/app/features/auth/pages/OTP.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';

function OTP() {
  const navigate = useNavigate();
  const { verifyOtp, loading, error_verify } = useAuth();
  const user_email = localStorage.getItem('email') || null;

  const [code, setCode] = useState('');
  const [localError, setLocalError] = useState('');

  // Form submit handler
  const onSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    try {
      const verifyOtp_data = await verifyOtp({
        type: 'send',
        email: user_email,
        confirm_email_code: code,
      });
      //console.log('verifyOtp_data:',verifyOtp_data);

      if (verifyOtp_data.success) {
        setLocalError(null);
        navigate('/');
      }
    } catch (err) {
      setLocalError(err.message);
    }
  }; //! Form submit handler -- Son

  // Tekrar Gönder
  const onResend = async (e) => {
    e.preventDefault();
    setLocalError(null);

    try {
      const resend_data = await verifyOtp({
        type: 'resend',
        email: user_email,
      });
      console.log('resend_data:', resend_data);

      if (resend_data.success) {
        setLocalError('Yeni kod gönderildi. Lütfen emailinizi kontrol edin.');
      }
    } catch (err) {
      setLocalError(err.message);
    }

    console.log('Resend OTP code to:', user_email);
  }; //! Tekrar Gönder -- Son

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Email Doğrulama (OTP)</h1>
        <p className="auth-subtitle">
          {user_email
            ? `${user_email} adresine gönderilen kodu gir.`
            : 'Email bilgisi bulunamadı.'}
        </p>

        <form onSubmit={onSubmit} className="auth-form">
          <Input
            type="text"
            placeholder="5 Haneli Kod"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            maxLength={5}
          />

          <Button type="submit" disabled={loading} className="btn-send w-full">
            {loading ? 'Doğrulanıyor...' : 'Doğrula'}
          </Button>

          {/* Tekrar Gönder */}
          {user_email && (
            <button
              type="button"
              onClick={onResend}
              disabled={loading}
              className="resend-link"
            >
              Kodu tekrar gönder
            </button>
          )}

          {/* Bilgi / Hata */}
          {(localError || error_verify) && (
            <div className="error">{localError || error_verify}</div>
          )}

          <div className="auth-footer">
            <span onClick={() => navigate('/login')}>Giriş Yap</span>
            {' | '}
            <span onClick={() => navigate('/register')}>Kayıt Ol</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OTP;
