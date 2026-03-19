import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { createOffer } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';

export default function CreateOffer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [form, setForm] = useState({ message: '', delivery_description: '', price_total: '', delivery_days: '' });
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createOffer({
        price_total: Number(form.price_total),
        delivery_days: form.delivery_days ? Number(form.delivery_days) : null,
        delivery_description: form.delivery_description || null,
        message: form.message || null,
        vendor_id: user?.id,
        need_id: searchParams.get('needId') || undefined,
        status: 'pending',
      });
      toast.success(t('vendor.createOffer.successToast'));
      navigate('/vendor/offers');
    } catch {
      toast.error('Erreur lors de la création');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="mb-6 text-3xl font-bold">{t('vendor.createOffer.title')}</h1>
      <Card>
        <CardHeader><CardTitle>{t('vendor.createOffer.cardTitle')}</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">{t('vendor.createOffer.message')}</Label>
              <Textarea id="message" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery_desc">{t('vendor.createOffer.deliveryDescription')}</Label>
              <Textarea id="delivery_desc" value={form.delivery_description} onChange={e => setForm(p => ({ ...p, delivery_description: e.target.value }))} rows={2} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price_total">{t('vendor.createOffer.priceTotal')}</Label>
                <Input id="price_total" type="number" value={form.price_total} onChange={e => setForm(p => ({ ...p, price_total: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery_days">{t('vendor.createOffer.deliveryDays')}</Label>
                <Input id="delivery_days" type="number" value={form.delivery_days} onChange={e => setForm(p => ({ ...p, delivery_days: e.target.value }))} placeholder="14" />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1" disabled={loading}>{loading ? 'Envoi...' : t('vendor.createOffer.submit')}</Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>{t('common.cancel')}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
