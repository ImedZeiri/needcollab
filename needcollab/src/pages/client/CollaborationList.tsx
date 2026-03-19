import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { mockCollaborations } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CollaborationList() {
  const { t, i18n } = useTranslation();

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">{t('collaborations.title')}</h1>

      {mockCollaborations.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">{t('collaborations.noCollabs')}</div>
      ) : (
        <div className="space-y-4">
          {mockCollaborations.map(collab => (
            <Card key={collab.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{collab.needTitle}</CardTitle>
                  <Badge>{t(`collaborations.status.${collab.status}`)}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">{t('collaborations.vendor')} : {collab.vendorName}</p>
                <p className="text-xs text-muted-foreground">{t('collaborations.startedOn')} {new Date(collab.createdAt).toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-US')}</p>
                <Link to={`/chat/${collab.id}`}>
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
