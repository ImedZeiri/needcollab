import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { getNeeds, deleteNeed } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import type { Need } from '@/types';
import { toast } from 'sonner';

export default function MyNeeds() {
  const { user } = useAuth();
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    getNeeds()
      .then(data => setNeeds((Array.isArray(data) ? data : []).filter(n => n.creator_id === user?.id)))
      .catch(() => setNeeds([]))
      .finally(() => setLoading(false));
  }, [user?.id]);

  const handleDelete = async (id: string) => {
    try {
      await deleteNeed(id);
      setNeeds(prev => prev.filter(n => n.id !== id));
      toast.success('Besoin supprimé');
    } catch {
      toast.error('Erreur lors de la suppression');
    }
  };

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t('myNeeds.title')}</h1>
        <Button asChild><Link to="/create"><Plus className="mr-2 h-4 w-4" />{t('common.new')}</Link></Button>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted-foreground">Chargement...</div>
      ) : needs.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground">{t('myNeeds.noNeeds')}</div>
      ) : (
        <div className="space-y-4">
          {needs.map(need => (
            <Card key={need.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{need.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{t(`needs.status.${need.status}`)}</Badge>
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(need.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-muted-foreground">{need.description}</p>
                <div className="flex items-center justify-between text-sm">
                  {(need.budget_min || need.budget_max) && (
                    <span className="font-medium">
                      {need.budget_min?.toLocaleString()}{need.budget_max ? ` – ${need.budget_max.toLocaleString()}` : ''} €
                    </span>
                  )}
                  <span className="text-muted-foreground">{need.min_participants}+ {t('needs.participants')}</span>
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
