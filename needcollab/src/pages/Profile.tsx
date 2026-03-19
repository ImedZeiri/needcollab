import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="mb-6 text-3xl font-bold">{t('profile.title')}</h1>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle>{user?.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <Badge variant="outline" className="mt-1">{user?.role}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t('profile.name')}</Label>
            <Input defaultValue={user?.name} />
          </div>
          <div className="space-y-2">
            <Label>{t('profile.email')}</Label>
            <Input defaultValue={user?.email} disabled />
          </div>
          <Button>{t('common.save')}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
