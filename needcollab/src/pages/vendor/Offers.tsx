import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { getOffers, deleteOffer } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import type { Offer } from '@/types';
import { toast } from 'sonner';

export default function Offers() {
  const { user } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    getOffers()
      .then(data => setOffers((Array.isArray(data) ? data : []).filter(o => o.vendor_id === user?.id)))
      .catch(() => setOffers([]))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const handleDelete = async (id: string) => {
    try {
      await deleteOffer(id);
      setOffers(prev => prev.filter(o => o.id !== id));
      toast.success('Offre supprimée');
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('vendor.offers.title')}</h1>
        <Button asChild><Link to="/vendor/offers/create"><Plus className="mr-2 h-4 w-4" />{t('vendor.offers.newOffer')}</Link></Button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted-foreground">Chargement...</div>
      ) : offers.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">{t('vendor.offers.noOffers')}</div>
      ) : (
        <div className="space-y-4">
          {offers.map(offer => (
            <Card key={offer.id}>
              <CardContent className="flex items-start justify-between p-6">
                <div>
                  <p className="text-sm text-muted-foreground">{offer.message || offer.delivery_description}</p>
                  {offer.delivery_days && <p className="mt-2 text-xs text-muted-foreground">{t('vendor.offers.delivery')} : {offer.delivery_days} {t('needDetail.days')}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-primary">{offer.price_total?.toLocaleString()} €</p>
                  <Badge variant={offer.status === 'accepted' ? 'default' : 'outline'}>
                    {t(`vendor.offers.status.${offer.status}`)}
                  </Badge>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(offer.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
