import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type LoginMethod = 'otp' | 'fast';

export default function Login() {
  const [method, setMethod] = useState<LoginMethod>('otp');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [fastSent, setFastSent] = useState(false);
  const { login, verifyOTP, sendMagicLink, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email);
    setOtpSent(true);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyOTP(email, otp);
    navigate('/needs');
  };

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMagicLink(email);
    setFastSent(true);
  };

  const emailField = (
    <div className="space-y-2">
      <Label htmlFor="email">{t('profile.email')}</Label>
      <div className="relative">
        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input id="email" type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t('auth.login.title')}</CardTitle>
          <CardDescription>{t('auth.login.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Method toggle */}
          <div className="flex rounded-lg border p-1 gap-1">
            <button
              type="button"
              onClick={() => { setMethod('otp'); setOtpSent(false); setFastSent(false); }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-colors ${
                method === 'otp' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Mail className="h-4 w-4" /> {t('auth.login.methodOtp')}
            </button>
            <button
              type="button"
              onClick={() => { setMethod('fast'); setOtpSent(false); setFastSent(false); }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-md py-2 text-sm font-medium transition-colors ${
                method === 'fast' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Zap className="h-4 w-4" /> {t('auth.login.methodFast')}
            </button>
          </div>

          {/* OTP flow */}
          {method === 'otp' && (
            !otpSent ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                {emailField}
                <Button type="submit" className="w-full" disabled={loading}>{loading ? t('auth.login.sending') : t('auth.login.sendOtp')}</Button>
                <p className="text-center text-sm text-muted-foreground">
                  {t('auth.login.noAccount')} <Link to="/auth/register" className="text-primary hover:underline">{t('nav.register')}</Link>
                </p>
                <p className="text-center text-xs text-muted-foreground">{t('auth.login.testAccounts')}</p>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <p className="text-sm text-muted-foreground">{t('auth.login.codeSentTo')} <strong>{email}</strong></p>
                <div className="space-y-2">
                  <Label htmlFor="otp">{t('auth.login.otpCode')}</Label>
                  <Input id="otp" type="text" placeholder="000000" value={otp} onChange={e => setOtp(e.target.value)} maxLength={6} className="text-center text-2xl tracking-widest" required />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>{loading ? t('auth.login.verifying') : t('auth.login.verify')}</Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => setOtpSent(false)}>{t('auth.login.changeEmail')}</Button>
              </form>
            )
          )}

          {/* Fast / Magic link flow */}
          {method === 'fast' && (
            !fastSent ? (
              <form onSubmit={handleSendMagicLink} className="space-y-4">
                {emailField}
                <Button type="submit" className="w-full" disabled={loading}>{loading ? t('auth.login.sending') : t('auth.login.sendMagicLink')}</Button>
                <p className="text-center text-sm text-muted-foreground">
                  {t('auth.login.noAccount')} <Link to="/auth/register" className="text-primary hover:underline">{t('nav.register')}</Link>
                </p>
              </form>
            ) : (
              <div className="space-y-4 text-center">
                <div className="rounded-lg bg-muted p-4">
                  <Zap className="mx-auto mb-2 h-8 w-8 text-primary" />
                  <p className="text-sm font-medium">{t('auth.login.magicLinkSent')}</p>
                  <p className="text-sm text-muted-foreground mt-1">{email}</p>
                </div>
                <p className="text-xs text-muted-foreground">{t('auth.login.magicLinkHint')}</p>
                <Button type="button" variant="ghost" className="w-full" onClick={() => setFastSent(false)}>{t('auth.login.changeEmail')}</Button>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
