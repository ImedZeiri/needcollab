import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Package, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Utilisateurs', value: 156, icon: Users, color: 'text-primary' },
    { label: 'Besoins publiés', value: 48, icon: FileText, color: 'text-accent' },
    { label: 'Offres', value: 124, icon: Package, color: 'text-warning' },
    { label: 'Collaborations', value: 32, icon: TrendingUp, color: 'text-success' },
    { label: 'En attente modération', value: 5, icon: AlertTriangle, color: 'text-destructive' },
    { label: 'Vendors vérifiés', value: 28, icon: CheckCircle, color: 'text-success' },
  ];

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Administration</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(s => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <s.icon className={`h-10 w-10 ${s.color}`} />
              <div>
                <p className="text-3xl font-bold">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
