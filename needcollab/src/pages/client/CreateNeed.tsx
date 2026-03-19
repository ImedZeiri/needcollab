import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES } from '@/data/mockData';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { createNeed } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

export default function CreateNeed() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ title: '', description: '', category: '', budget: '', location: '' });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createNeed({
        ...form,
        budget: Number(form.budget),
        currency: 'EUR',
        authorId: user?.id,
        authorName: user?.name,
        status: 'open',
      });
      toast.success(t('createNeed.successToast'));
      navigate('/my-needs');
    } catch {
      toast.error('Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="mb-6 text-3xl font-bold">{t('createNeed.title')}</h1>
      <Card>
        <CardHeader><CardTitle>{t('createNeed.cardTitle')}</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">{t('createNeed.needTitle')}</Label>
              <Input id="title" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder={t('createNeed.titlePlaceholder')} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">{t('createNeed.description')}</Label>
              <Textarea id="desc" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder={t('createNeed.descPlaceholder')} rows={5} required />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>{t('createNeed.category')}</Label>
                <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
                  <SelectTrigger><SelectValue placeholder={t('createNeed.selectCategory')} /></SelectTrigger>
                  <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">{t('createNeed.budget')}</Label>
                <Input id="budget" type="number" value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))} placeholder="5000" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{t('createNeed.location')}</Label>
              <Input id="location" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} placeholder={t('createNeed.locationPlaceholder')} />
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1" disabled={loading}>{loading ? 'Publication...' : t('common.publish')}</Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>{t('common.cancel')}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
