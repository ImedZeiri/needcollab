import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { getCollaborations } from '@/services/api';
import type { Collaboration } from '@/types';

export default function CollaborationList() {
  const [collabs, setCollabs] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getCollaborations()
      .then(data => setCollabs(Array.isArray(data) ? data : []))
      .catch(() => setCollabs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">{t('collaborations.title')}</h1>

      {loading ? (
        <div className="py-16 text-center text-muted-foreground">Chargement...</div>
      ) : collabs.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">{t('collaborations.noCollabs')}</div>
      ) : (
        <div className="space-y-4">
          {collabs.map(collab => (
            <Card key={collab.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{collab.need?.title || collab.need_id}</CardTitle>
                  {collab.need && <span className="text-sm text-muted-foreground">{t(`needs.status.${collab.need.status}`)}</span>}
                </div>
              </CardHeader>
              <CardContent>
                {collab.location_city && <p className="mb-2 text-sm text-muted-foreground">{collab.location_city}, {collab.location_country}</p>}
                <p className="text-xs text-muted-foreground">{t('collaborations.joinedOn')} {new Date(collab.joined_at).toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US')}</p>
                <Link to={`/chat/${collab.need_id}`}>
                  <Button variant="outline" className="mt-3" size="sm"><MessageSquare className="mr-2 h-4 w-4" />{t('collaborations.openChat')}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
