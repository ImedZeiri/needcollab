import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Package, MessageSquare, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { getNeeds, getOffers, getCollaborations } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import type { Need, Offer, Collaboration } from '@/types';

export default function VendorDashboard() {
  const { user } = useAuth();
  const [needs, setNeeds] = useState<Need[]>([]);
  const [myOffers, setMyOffers] = useState<Offer[]>([]);
  const [activeCollabs, setActiveCollabs] = useState<Collaboration[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getNeeds().then(d => setNeeds((Array.isArray(d) ? d : []).filter(n => n.status === 'open'))).catch(() => {});
    getOffers().then(d => {
      const all = Array.isArray(d) ? d : [];
      setMyOffers(all.filter(o => o.vendorId === user?.id));
    }).catch(() => {});
    getCollaborations().then(d => {
      setActiveCollabs((Array.isArray(d) ? d : []).filter(c => c.vendorId === user?.id && c.status === 'active'));
    }).catch(() => {});
  }, [user?.id]);

  const acceptedOffers = myOffers.filter(o => o.status === 'accepted');
  const acceptanceRate = myOffers.length > 0 ? Math.round((acceptedOffers.length / myOffers.length) * 100) + '%' : '0%';

  const stats = [
    { label: t('vendor.dashboard.myOffers'), value: myOffers.length, icon: Package, color: 'text-primary' },
    { label: t('vendor.dashboard.collaborations'), value: activeCollabs.length, icon: MessageSquare, color: 'text-accent' },
    { label: t('vendor.dashboard.openNeeds'), value: needs.length, icon: FileText, color: 'text-warning' },
    { label: t('vendor.dashboard.acceptanceRate'), value: acceptanceRate, icon: TrendingUp, color: 'text-success' },
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
        {needs.slice(0, 3).map(need => (
          <Card key={need.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium">{need.title}</p>
                <p className="text-sm text-muted-foreground">{need.category} · {need.location}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary">{need.budget?.toLocaleString()} {need.currency}</p>
                <Badge variant="outline" className="text-xs">{need.offersCount} {t('needs.offers')}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
