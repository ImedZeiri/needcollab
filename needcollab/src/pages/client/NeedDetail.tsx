import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, ThumbsUp, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { getNeed, getOffers } from '@/services/api';
import type { Need, Offer } from '@/types';

export default function NeedDetail() {
  const { id } = useParams();
  const [need, setNeed] = useState<Need | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (!id) return;
    Promise.all([
      getNeed(id).then(d => setNeed(Array.isArray(d) ? d[0] : d as Need)),
      getOffers(id).then(d => setOffers(Array.isArray(d) ? d : [])),
    ]).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="container py-16 text-center text-muted-foreground">Chargement...</div>;

  if (!need) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">{t('needDetail.notFound')}</p>
        <Link to="/needs"><Button variant="outline" className="mt-4">{t('common.back')}</Button></Link>
      </div>
    );
  }

  const budgetDisplay = need.budget_min && need.budget_max
    ? `${need.budget_min.toLocaleString()} – ${need.budget_max.toLocaleString()} €`
    : need.budget_min ? `${need.budget_min.toLocaleString()} €` : null;

  return (
    <div className="container max-w-4xl py-8">
      <Link to="/needs" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />{t('needDetail.backToMarketplace')}
      </Link>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{need.title}</CardTitle>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="outline">{t(`categories.${need.category}`)}</Badge>
                <Badge>{t(`needs.status.${need.status}`)}</Badge>
              </div>
            </div>
            {budgetDisplay && (
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{budgetDisplay}</p>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">{need.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(need.created_at).toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US')}</span>
            {need.creator && <span className="flex items-center gap-1"><User className="h-4 w-4" />{need.creator.full_name}</span>}
            <span className="flex items-center gap-1"><ThumbsUp className="h-4 w-4" />{need.min_participants} {t('needs.minParticipants')}</span>
          </div>
          <div className="mt-6 flex gap-3">
            <Button>{t('needDetail.proposeOffer')}</Button>
            <Button variant="outline"><ThumbsUp className="mr-2 h-4 w-4" />{t('needDetail.join')}</Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="mb-4 text-xl font-semibold">{t('needDetail.offersCount')} ({offers.length})</h2>
      {offers.length === 0 ? (
        <p className="text-muted-foreground">{t('needDetail.noOffers')}</p>
      ) : (
        <div className="space-y-4">
          {offers.map(offer => (
            <Card key={offer.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mt-1 text-sm text-muted-foreground">{offer.message || offer.delivery_description}</p>
                    <div className="mt-3 flex gap-3 text-sm text-muted-foreground">
                      {offer.vendor && <span>{offer.vendor.vendor_company_name || offer.vendor.full_name}</span>}
                      {offer.delivery_days && <><span>•</span><span>{t('needDetail.delivery')} : {offer.delivery_days} {t('needDetail.days')}</span></>}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">{offer.price_total?.toLocaleString()} €</p>
                    {offer.price_per_unit && <p className="text-sm text-muted-foreground">{offer.price_per_unit.toLocaleString()} € / {t('needDetail.unit')}</p>}
                    <Badge variant={offer.status === 'accepted' ? 'default' : 'outline'} className="mt-1">
                      {t(`needDetail.offerStatus.${offer.status}`)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
