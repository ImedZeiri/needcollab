import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useTranslation } from 'react-i18next';

const mockUsers = [
  { id: '1', name: 'Jean Client', email: 'client@test.com', role: 'client', status: 'active' },
  { id: '2', name: 'Marie Vendor', email: 'vendor@test.com', role: 'vendor', status: 'active' },
  { id: '3', name: 'Admin User', email: 'admin@test.com', role: 'admin', status: 'active' },
  { id: '4', name: 'Sophie Martin', email: 'sophie@test.com', role: 'client', status: 'active' },
  { id: '5', name: 'Pierre Dupont', email: 'pierre@test.com', role: 'client', status: 'suspended' },
  { id: '8', name: 'TechPro SARL', email: 'techpro@test.com', role: 'vendor', status: 'pending' },
];

export default function UsersManagement() {
  const { t } = useTranslation();

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">{t('admin.users.title')}</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.users.colName')}</TableHead>
                <TableHead>{t('admin.users.colEmail')}</TableHead>
                <TableHead>{t('admin.users.colRole')}</TableHead>
                <TableHead>{t('admin.users.colStatus')}</TableHead>
                <TableHead>{t('admin.users.colActions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map(u => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <Select defaultValue={u.role}>
                      <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="vendor">Vendor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.status === 'active' ? 'default' : u.status === 'suspended' ? 'destructive' : 'outline'}>
                      {t(`admin.users.status.${u.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">{t('admin.users.editBtn')}</Button>
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
