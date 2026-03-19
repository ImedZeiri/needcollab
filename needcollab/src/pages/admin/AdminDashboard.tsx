import { Card, CardContent } from '@/components/ui/card';
import { Users, FileText, Package, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AdminDashboard() {
  const { t } = useTranslation();

  const stats = [
    { label: t('admin.dashboard.users'), value: 156, icon: Users, color: 'text-primary' },
    { label: t('admin.dashboard.publishedNeeds'), value: 48, icon: FileText, color: 'text-accent' },
    { label: t('admin.dashboard.offers'), value: 124, icon: Package, color: 'text-warning' },
    { label: t('admin.dashboard.collaborations'), value: 32, icon: TrendingUp, color: 'text-success' },
    { label: t('admin.dashboard.pendingModeration'), value: 5, icon: AlertTriangle, color: 'text-destructive' },
    { label: t('admin.dashboard.verifiedVendors'), value: 28, icon: CheckCircle, color: 'text-success' },
  ];

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">{t('admin.dashboard.title')}</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(s => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <s.icon className={`h-10 w-10 ${s.color}`} />
              <div>
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
