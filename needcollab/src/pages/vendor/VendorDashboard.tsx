import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Package, Users, TrendingUp } from 'lucide-react';
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
    getNeeds().then(d => setNeeds((Array.isArray(d) ? d : []).filter(n => n.status === 'published'))).catch(() => {});
    getOffers().then(d => {
      const all = Array.isArray(d) ? d : [];
      setMyOffers(all.filter(o => o.vendor_id === user?.id));
    }).catch(() => {});
    getCollaborations().then(d => {
      // Collaborations where the user is a participant on a need they have an offer for
      setActiveCollabs((Array.isArray(d) ? d : []).filter(c => c.user_id === user?.id));
    }).catch(() => {});
  }, [user?.id]);

  const acceptedOffers = myOffers.filter(o => o.status === 'accepted');
  const acceptanceRate = myOffers.length > 0 ? Math.round((acceptedOffers.length / myOffers.length) * 100) + '%' : '0%';

  const stats = [
    { label: t('vendor.dashboard.myOffers'), value: myOffers.length, icon: Package, color: 'text-primary' },
    { label: t('vendor.dashboard.collaborations'), value: activeCollabs.length, icon: Users, color: 'text-accent' },
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
                <p className="text-sm text-muted-foreground">{t(`categories.${need.category}`)}</p>
              </div>
              <div className="text-right">
                {(need.budget_min || need.budget_max) && (
                  <p className="font-semibold text-primary">
                    {need.budget_min?.toLocaleString()}{need.budget_max ? ` – ${need.budget_max.toLocaleString()}` : ''} €
                  </p>
                )}
                <Badge variant="outline" className="text-xs">{need.min_participants}+ {t('needs.participants')}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
