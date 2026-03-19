import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const { login, verifyOTP, loading } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Connexion</CardTitle>
          <CardDescription>Connectez-vous avec votre email via OTP</CardDescription>
        </CardHeader>
        <CardContent>
          {!otpSent ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Envoi...' : 'Recevoir le code OTP'}</Button>
              <p className="text-center text-sm text-muted-foreground">
                Pas de compte ? <Link to="/auth/register" className="text-primary hover:underline">Inscription</Link>
              </p>
              <p className="text-center text-xs text-muted-foreground">
                Comptes de test : client@test.com, vendor@test.com, admin@test.com
              </p>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <p className="text-sm text-muted-foreground">Un code a été envoyé à <strong>{email}</strong></p>
              <div className="space-y-2">
                <Label htmlFor="otp">Code OTP</Label>
                <Input id="otp" type="text" placeholder="000000" value={otp} onChange={e => setOtp(e.target.value)} maxLength={6} className="text-center text-2xl tracking-widest" required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Vérification...' : 'Vérifier'}</Button>
              <Button type="button" variant="ghost" className="w-full" onClick={() => setOtpSent(false)}>Changer d'email</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
