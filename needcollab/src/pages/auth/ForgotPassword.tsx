import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t('auth.forgotPassword.title')}</CardTitle>
          <CardDescription>{t('auth.forgotPassword.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('profile.email')}</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" required />
              </div>
              <Button type="submit" className="w-full">{t('auth.forgotPassword.sendLink')}</Button>
              <p className="text-center text-sm text-muted-foreground">
                <Link to="/auth/login" className="text-primary hover:underline">{t('auth.forgotPassword.backToLogin')}</Link>
              </p>
            </form>
          ) : (
            <div className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">{t('auth.forgotPassword.emailSent')} <strong>{email}</strong>.</p>
              <Link to="/auth/login"><Button variant="outline">{t('auth.forgotPassword.backToLogin')}</Button></Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
