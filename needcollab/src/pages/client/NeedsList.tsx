import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Users, Plus, X } from 'lucide-react';
import { CATEGORIES } from '@/data/mockData';
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getNeeds } from '@/services/api';
import type { Need } from '@/types';

export default function NeedsList() {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const { t } = useTranslation();

  const closeLightbox = useCallback(() => setLightboxUrl(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeLightbox]);

  useEffect(() => {
    getNeeds()
      .then(data => setNeeds(Array.isArray(data) ? data : []))
      .catch(() => setNeeds([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = needs.filter(n => {
    const matchesSearch = n.title?.toLowerCase().includes(search.toLowerCase()) || n.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'all' || n.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('needs.marketplace')}</h1>
          <p className="text-muted-foreground">{t('needs.marketplaceDesc')}</p>
        </div>
        {isAuthenticated && (
          <Button asChild><Link to="/create"><Plus className="mr-2 h-4 w-4" />{t('needs.publishNeed')}</Link></Button>
        )}
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t('common.search')} value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-48"><SelectValue placeholder={t('needs.category')} /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('needs.allCategories')}</SelectItem>
            {CATEGORIES.map(c => <SelectItem key={c} value={c}>{t(`categories.${c}`)}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="py-16 text-center text-muted-foreground">Chargement...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(need => (
            <Link key={need.id} to={`/needs/${need.id}`}>
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                {need.image_url && (
                  <div
                    className="relative h-40 w-full cursor-zoom-in overflow-hidden"
                    onClick={e => { e.preventDefault(); setLightboxUrl(need.image_url!); }}
                  >
                    <img src={need.image_url} alt={need.title} className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 hover:scale-105" />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg leading-tight">{need.title}</CardTitle>
                    <span className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${need.status === 'published' ? 'bg-success/10 text-success' : need.status === 'in_progress' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>
                      {t(`needs.status.${need.status}`)}
                    </span>
                  </div>
                  <Badge variant="outline" className="w-fit text-xs">{t(`categories.${need.category}`)}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{need.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    {(need.budget_min || need.budget_max) && (
                      <span className="font-semibold text-primary">
                        {need.budget_min?.toLocaleString()}{need.budget_max ? ` – ${need.budget_max.toLocaleString()}` : ''} €
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-muted-foreground"><Users className="h-3 w-3" />{need.min_participants}+</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">{t('needs.noNeedsFound')}</div>
      )}

      {lightboxUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={lightboxUrl}
            alt=""
            className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
