import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, ThumbsUp, User } from 'lucide-react';
import { mockNeeds, mockOffers } from '@/data/mockData';

export default function NeedDetail() {
  const { id } = useParams();
  const need = mockNeeds.find(n => n.id === id);
  const offers = mockOffers.filter(o => o.needId === id);

  if (!need) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">Besoin introuvable.</p>
        <Link to="/needs"><Button variant="outline" className="mt-4">Retour</Button></Link>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8">
      <Link to="/needs" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />Retour à la marketplace
      </Link>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{need.title}</CardTitle>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <Badge variant="outline">{need.category}</Badge>
                <Badge>{need.status === 'open' ? 'Ouvert' : need.status === 'in_progress' ? 'En cours' : 'Fermé'}</Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{need.budget.toLocaleString()} {need.currency}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">{need.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{need.location}</span>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{new Date(need.createdAt).toLocaleDateString('fr-FR')}</span>
            <span className="flex items-center gap-1"><User className="h-4 w-4" />{need.authorName}</span>
            <span className="flex items-center gap-1"><ThumbsUp className="h-4 w-4" />{need.votesCount} votes</span>
          </div>
          <div className="mt-6 flex gap-3">
            <Button>Proposer une offre</Button>
            <Button variant="outline"><ThumbsUp className="mr-2 h-4 w-4" />Voter</Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="mb-4 text-xl font-semibold">Offres ({offers.length})</h2>
      {offers.length === 0 ? (
        <p className="text-muted-foreground">Aucune offre pour l'instant.</p>
      ) : (
        <div className="space-y-4">
          {offers.map(offer => (
            <Card key={offer.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{offer.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{offer.description}</p>
                    <div className="mt-3 flex gap-3 text-sm text-muted-foreground">
                      <span>{offer.vendorName}</span>
                      <span>•</span>
                      <span>Livraison : {offer.deliveryTime}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">{offer.price.toLocaleString()} {offer.currency}</p>
                    <Badge variant={offer.status === 'accepted' ? 'default' : 'outline'} className="mt-1">
                      {offer.status === 'pending' ? 'En attente' : offer.status === 'accepted' ? 'Acceptée' : 'Refusée'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
