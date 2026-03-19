import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Search, Handshake, MessageSquare, Shield, Sparkles, Users, Zap } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useTranslation();

  const features = [
    { icon: Search, title: t('index.features.publishNeeds.title'), desc: t('index.features.publishNeeds.desc'), color: 'text-primary', bg: 'bg-primary/10' },
    { icon: Handshake, title: t('index.features.proposeOffers.title'), desc: t('index.features.proposeOffers.desc'), color: 'text-accent', bg: 'bg-accent/10' },
    { icon: MessageSquare, title: t('index.features.collaborate.title'), desc: t('index.features.collaborate.desc'), color: 'text-primary', bg: 'bg-primary/10' },
    { icon: Shield, title: t('index.features.secure.title'), desc: t('index.features.secure.desc'), color: 'text-accent', bg: 'bg-accent/10' },
  ];

  const stats = [
    { value: '500+', label: t('index.stats.professionals'), icon: Users },
    { value: '1,200+', label: t('index.stats.needs'), icon: Zap },
    { value: '98%', label: t('index.stats.satisfaction'), icon: Sparkles },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-hero-pattern px-4 pb-20 pt-16 md:pb-28 md:pt-24">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-32 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />

        <div className="container relative text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {t('index.badge')}
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            <Trans
              i18nKey="index.headline"
              components={{
                needs: <span className="text-gradient-brand" />,
                offers: <span className="text-gradient-brand" />,
              }}
            />
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            {t('index.subheadline')}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {isAuthenticated ? (
              <Button asChild size="lg" className="rounded-xl bg-gradient-brand px-6 shadow-brand hover:opacity-90">
                <Link to="/needs">
                  {t('index.exploreMarketplace')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="rounded-xl bg-gradient-brand px-6 shadow-brand hover:opacity-90">
                  <Link to="/auth/register">
                    {t('index.startFree')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl px-6">
                  <Link to="/needs">{t('index.exploreNeeds')}</Link>
                </Button>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4">
            {stats.map(s => (
              <div key={s.label} className="text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <s.icon className="h-4 w-4 text-primary" />
                  <span className="text-2xl font-bold tracking-tight md:text-3xl">{s.value}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t('index.howItWorks')}</h2>
          <p className="mt-3 text-muted-foreground">{t('index.howItWorksDesc')}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Card
              key={f.title}
              className="group relative overflow-hidden border-border/50 bg-card transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${f.bg}`}>
                    <f.icon className={`h-5 w-5 ${f.color}`} />
                  </div>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-muted-foreground">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mb-2 text-sm font-semibold">{f.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-brand px-4 py-16 md:py-20">
          <div className="container relative text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">{t('index.readyToCollaborate')}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/80">{t('index.joinProfessionals')}</p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-8 rounded-xl bg-white px-8 font-semibold text-primary shadow-lg hover:bg-white/90"
            >
              <Link to="/auth/register">{t('index.createAccount')}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
