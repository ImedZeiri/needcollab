import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const mockUsers = [
  { id: '1', name: 'Jean Client', email: 'client@test.com', role: 'client', status: 'active' },
  { id: '2', name: 'Marie Vendor', email: 'vendor@test.com', role: 'vendor', status: 'active' },
  { id: '3', name: 'Admin User', email: 'admin@test.com', role: 'admin', status: 'active' },
  { id: '4', name: 'Sophie Martin', email: 'sophie@test.com', role: 'client', status: 'active' },
  { id: '5', name: 'Pierre Dupont', email: 'pierre@test.com', role: 'client', status: 'suspended' },
  { id: '8', name: 'TechPro SARL', email: 'techpro@test.com', role: 'vendor', status: 'pending' },
];

export default function UsersManagement() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Gestion des utilisateurs</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
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
                      {u.status === 'active' ? 'Actif' : u.status === 'suspended' ? 'Suspendu' : 'En attente'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Modifier</Button>
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
