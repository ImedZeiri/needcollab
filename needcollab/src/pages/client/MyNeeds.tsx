import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { mockNeeds } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export default function MyNeeds() {
  const myNeeds = mockNeeds.filter(n => n.authorId === '1');
  const { t } = useTranslation();

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('myNeeds.title')}</h1>
        <Button asChild><Link to="/create"><Plus className="mr-2 h-4 w-4" />{t('common.new')}</Link></Button>
      </div>

      {myNeeds.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">{t('myNeeds.noNeeds')}</div>
      ) : (
        <div className="space-y-4">
          {myNeeds.map(need => (
            <Card key={need.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{need.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{t(`needs.status.${need.status}`)}</Badge>
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">{need.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{need.budget.toLocaleString()} {need.currency}</span>
                  <span className="text-muted-foreground">{need.offersCount} {t('needs.offers')} · {need.votesCount} {t('needs.votes')}</span>
                </div>
                <Link to={`/needs/${need.id}`}>
                  <Button variant="link" className="mt-2 p-0">{t('myNeeds.viewDetails')}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
