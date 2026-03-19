import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Package, MessageSquare, TrendingUp } from 'lucide-react';
import { mockNeeds, mockOffers, mockCollaborations } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export default function VendorDashboard() {
  const myOffers = mockOffers.filter(o => o.vendorId === '2');
  const activeCollabs = mockCollaborations.filter(c => c.vendorId === '2' && c.status === 'active');
  const openNeeds = mockNeeds.filter(n => n.status === 'open');
  const { t } = useTranslation();

  const stats = [
    { label: t('vendor.dashboard.myOffers'), value: myOffers.length, icon: Package, color: 'text-primary' },
    { label: t('vendor.dashboard.collaborations'), value: activeCollabs.length, icon: MessageSquare, color: 'text-accent' },
    { label: t('vendor.dashboard.openNeeds'), value: openNeeds.length, icon: FileText, color: 'text-warning' },
    { label: t('vendor.dashboard.acceptanceRate'), value: '50%', icon: TrendingUp, color: 'text-success' },
  ];

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">{t('vendor.dashboard.title')}</h1>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        {stats.map(s => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <s.icon className={`h-8 w-8 ${s.color}`} />
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mb-4 text-xl font-semibold">{t('vendor.dashboard.latestNeeds')}</h2>
      <div className="space-y-3">
        {openNeeds.slice(0, 3).map(need => (
          <Card key={need.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{need.title}</p>
                <p className="text-sm text-muted-foreground">{need.category} · {need.location}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">{need.budget.toLocaleString()} {need.currency}</p>
                <Badge variant="outline" className="text-xs">{need.offersCount} {t('needs.offers')}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
