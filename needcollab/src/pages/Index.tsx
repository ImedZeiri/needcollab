import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Search, Handshake, MessageSquare, Shield } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  const features = [
    { icon: Search, title: t('index.features.publishNeeds.title'), desc: t('index.features.publishNeeds.desc') },
    { icon: Handshake, title: t('index.features.proposeOffers.title'), desc: t('index.features.proposeOffers.desc') },
    { icon: MessageSquare, title: t('index.features.collaborate.title'), desc: t('index.features.collaborate.desc') },
    { icon: Shield, title: t('index.features.secure.title'), desc: t('index.features.secure.desc') },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-24 md:py-32">
        <div className="container text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
            {t('index.headline', {
              needs: (chunks: string) => <span className="text-primary">{chunks}</span>,
              offers: (chunks: string) => <span className="text-accent">{chunks}</span>,
            })}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">{t('index.subheadline')}</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {isAuthenticated ? (
              <Button asChild size="lg"><Link to="/needs">{t('index.exploreMarketplace')} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            ) : (
              <>
                <Button asChild size="lg"><Link to="/auth/register">{t('index.startFree')} <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild variant="outline" size="lg"><Link to="/needs">{t('index.exploreNeeds')}</Link></Button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="container py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">{t('index.howItWorks')}</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(f => (
            <Card key={f.title} className="text-center">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-primary/5 py-16">
        <div className="container text-center">
          <h2 className="text-2xl font-bold">{t('index.readyToCollaborate')}</h2>
          <p className="mt-2 text-muted-foreground">{t('index.joinProfessionals')}</p>
          <Button asChild size="lg" className="mt-6"><Link to="/auth/register">{t('index.createAccount')}</Link></Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
