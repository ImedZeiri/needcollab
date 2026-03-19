import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, ThumbsUp, MessageSquare, Plus } from 'lucide-react';
import { mockNeeds, CATEGORIES } from '@/data/mockData';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function NeedsList() {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const { t } = useTranslation();

  const filtered = mockNeeds.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.description.toLowerCase().includes(search.toLowerCase());
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
            {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(need => (
          <Link key={need.id} to={`/needs/${need.id}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight">{need.title}</CardTitle>
                  <span className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${need.status === 'open' ? 'bg-success/10 text-success' : need.status === 'in_progress' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'}`}>
                    {t(`needs.status.${need.status}`)}
                  </span>
                </div>
                <Badge variant="outline" className="w-fit text-xs">{need.category}</Badge>
              </CardHeader>
              <CardContent>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{need.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-primary">{need.budget.toLocaleString()} {need.currency}</span>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{need.location}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{need.offersCount} {t('needs.offers')}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{need.votesCount} {t('needs.votes')}</span>
                  <span className="ml-auto">{need.authorName}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted-foreground">{t('needs.noNeedsFound')}</div>
      )}
    </div>
  );
}
