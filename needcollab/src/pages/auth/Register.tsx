import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, type UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('client');
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ email, name, role });
    navigate('/needs');
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t('auth.register.title')}</CardTitle>
          <CardDescription>{t('auth.register.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('auth.register.fullName')}</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Jean Dupont" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('profile.email')}</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" required />
            </div>
            <div className="space-y-2">
              <Label>{t('auth.register.role')}</Label>
              <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="client">{t('auth.register.roleClient')}</SelectItem>
                  <SelectItem value="vendor">{t('auth.register.roleVendor')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>{loading ? t('auth.register.creating') : t('auth.register.createAccount')}</Button>
            <p className="text-center text-sm text-muted-foreground">
              {t('auth.register.alreadyAccount')} <Link to="/auth/login" className="text-primary hover:underline">{t('nav.login')}</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
