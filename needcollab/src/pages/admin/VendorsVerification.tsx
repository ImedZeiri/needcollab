import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const vendors = [
  { id: '2', name: 'Marie Vendor', email: 'vendor@test.com', company: 'Freelance', verified: true },
  { id: '8', name: 'TechPro SARL', email: 'techpro@test.com', company: 'TechPro SARL', verified: false },
  { id: '9', name: 'Studio Créatif', email: 'studio@test.com', company: 'Studio Créatif', verified: true },
  { id: '10', name: 'Data Corp', email: 'datacorp@test.com', company: 'Data Corp', verified: false },
];

export default function VendorsVerification() {
  const { t } = useTranslation();

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">{t('admin.vendors.title')}</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.vendors.colName')}</TableHead>
                <TableHead>{t('admin.vendors.colEmail')}</TableHead>
                <TableHead>{t('admin.vendors.colCompany')}</TableHead>
                <TableHead>{t('admin.vendors.colVerified')}</TableHead>
                <TableHead>{t('admin.vendors.colActions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map(v => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell>{v.email}</TableCell>
                  <TableCell>{v.company}</TableCell>
                  <TableCell>
                    <Badge variant={v.verified ? 'default' : 'destructive'}>
                      {v.verified ? t('admin.vendors.verified') : t('admin.vendors.notVerified')}
                    </Badge>
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
