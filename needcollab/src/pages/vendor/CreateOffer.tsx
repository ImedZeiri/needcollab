import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export default function CreateOffer() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', price: '', deliveryTime: '' });
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('vendor.createOffer.successToast'));
    navigate('/vendor/offers');
  };

  return (
    <div className="container max-w-2xl py-8">
      <h1 className="mb-6 text-3xl font-bold">{t('vendor.createOffer.title')}</h1>
      <Card>
        <CardHeader><CardTitle>{t('vendor.createOffer.cardTitle')}</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">{t('vendor.createOffer.offerTitle')}</Label>
              <Input id="title" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">{t('vendor.createOffer.description')}</Label>
              <Textarea id="desc" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={4} required />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">{t('vendor.createOffer.price')}</Label>
                <Input id="price" type="number" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery">{t('vendor.createOffer.deliveryTime')}</Label>
                <Input id="delivery" value={form.deliveryTime} onChange={e => setForm(p => ({ ...p, deliveryTime: e.target.value }))} placeholder={t('vendor.createOffer.deliveryPlaceholder')} required />
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1">{t('vendor.createOffer.submit')}</Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>{t('common.cancel')}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
