import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X } from 'lucide-react';

const vendors = [
  { id: '2', name: 'Marie Vendor', email: 'vendor@test.com', company: 'Freelance', verified: true },
  { id: '8', name: 'TechPro SARL', email: 'techpro@test.com', company: 'TechPro SARL', verified: false },
  { id: '9', name: 'Studio Créatif', email: 'studio@test.com', company: 'Studio Créatif', verified: true },
  { id: '10', name: 'Data Corp', email: 'datacorp@test.com', company: 'Data Corp', verified: false },
];

export default function VendorsVerification() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Vérification des vendors</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Vérifié</TableHead>
                <TableHead>Actions</TableHead>
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
                      {v.verified ? 'Vérifié' : 'Non vérifié'}
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
