import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X } from 'lucide-react';
import { mockNeeds } from '@/data/mockData';
import { useTranslation } from 'react-i18next';

export default function NeedsModeration() {
  const { t } = useTranslation();

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">{t('admin.moderation.title')}</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.moderation.colTitle')}</TableHead>
                <TableHead>{t('admin.moderation.colAuthor')}</TableHead>
                <TableHead>{t('admin.moderation.colCategory')}</TableHead>
                <TableHead>{t('admin.moderation.colBudget')}</TableHead>
                <TableHead>{t('admin.moderation.colStatus')}</TableHead>
                <TableHead>{t('admin.moderation.colActions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockNeeds.map(n => (
                <TableRow key={n.id}>
                  <TableCell className="font-medium">{n.title}</TableCell>
                  <TableCell>{n.creator?.full_name ?? '—'}</TableCell>
                  <TableCell><Badge variant="outline">{n.category}</Badge></TableCell>
                  <TableCell>{n.budget_min != null ? `${n.budget_min.toLocaleString()}–${n.budget_max?.toLocaleString() ?? '?'} MAD` : '—'}</TableCell>
                  <TableCell>
                    <Badge>{t(`admin.moderation.status.${n.status}`)}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon"><Check className="h-4 w-4 text-success" /></Button>
                      <Button variant="ghost" size="icon"><X className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
