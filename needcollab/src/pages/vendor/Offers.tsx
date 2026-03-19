import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { mockOffers } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Offers() {
  const myOffers = mockOffers.filter(o => o.vendorId === '2');
  const { t } = useTranslation();

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('vendor.offers.title')}</h1>
        <Button asChild><Link to="/vendor/offers/create"><Plus className="mr-2 h-4 w-4" />{t('vendor.offers.newOffer')}</Link></Button>
      </div>

      {myOffers.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">{t('vendor.offers.noOffers')}</div>
      ) : (
        <div className="space-y-4">
          {myOffers.map(offer => (
            <Card key={offer.id}>
              <CardContent className="flex items-start justify-between p-6">
                <div>
                  <h3 className="font-semibold">{offer.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{offer.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{t('vendor.offers.delivery')} : {offer.deliveryTime}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-lg font-bold text-primary">{offer.price.toLocaleString()} {offer.currency}</p>
                  <Badge variant={offer.status === 'accepted' ? 'default' : 'outline'}>
                    {t(`vendor.offers.status.${offer.status}`)}
                  </Badge>
                  <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
