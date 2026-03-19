import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export default function Analytics() {
  const { t } = useTranslation();

  const data = [
    { label: t('admin.analytics.newUsers'), value: 23 },
    { label: t('admin.analytics.needsCreated'), value: 8 },
    { label: t('admin.analytics.offersSubmitted'), value: 15 },
    { label: t('admin.analytics.collabsStarted'), value: 4 },
    { label: t('admin.analytics.conversionRate'), value: '18%' },
    { label: t('admin.analytics.avgResponseTime'), value: '2.3h' },
  ];

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">{t('admin.analytics.title')}</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {data.map(d => (
          <Card key={d.label}>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{d.label}</CardTitle></CardHeader>
            <CardContent><p className="text-3xl font-bold">{d.value}</p></CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-8">
        <CardContent className="flex h-64 items-center justify-center p-6">
          <p className="text-muted-foreground">{t('admin.analytics.chartPlaceholder')}</p>
        </CardContent>
      </Card>
    </div>
  );
}
