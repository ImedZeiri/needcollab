import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Analytics() {
  const data = [
    { label: 'Nouveaux utilisateurs (7j)', value: 23 },
    { label: 'Besoins créés (7j)', value: 8 },
    { label: 'Offres soumises (7j)', value: 15 },
    { label: 'Collaborations démarrées (7j)', value: 4 },
    { label: 'Taux de conversion', value: '18%' },
    { label: 'Temps moyen de réponse', value: '2.3h' },
  ];

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Analytics</h1>
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
          <p className="text-muted-foreground">Graphiques d'analyse — à connecter avec les données réelles de l'API</p>
        </CardContent>
      </Card>
    </div>
  );
}
