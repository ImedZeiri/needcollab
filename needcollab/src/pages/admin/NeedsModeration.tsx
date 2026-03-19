import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X } from 'lucide-react';
import { mockNeeds } from '@/data/mockData';

export default function NeedsModeration() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Modération des besoins</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockNeeds.map(n => (
                <TableRow key={n.id}>
                  <TableCell className="font-medium">{n.title}</TableCell>
                  <TableCell>{n.authorName}</TableCell>
                  <TableCell><Badge variant="outline">{n.category}</Badge></TableCell>
                  <TableCell>{n.budget.toLocaleString()} {n.currency}</TableCell>
                  <TableCell>
                    <Badge>{n.status === 'open' ? 'Ouvert' : n.status === 'in_progress' ? 'En cours' : 'Fermé'}</Badge>
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
