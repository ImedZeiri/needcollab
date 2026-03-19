import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logoImg from '@/assets/logo.png';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border/60 bg-card py-10">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link to="/" className="mb-3 flex items-center gap-2">
              <img src={logoImg} alt="NeedCollab" className="h-7 w-7" />
              <span className="text-base font-bold tracking-tight">
                Need<span className="text-gradient-brand">Collab</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              {t('footer.platform')}
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/needs" className="text-muted-foreground transition-colors hover:text-foreground">
                {t('nav.explore')}
              </Link>
              <Link to="/create" className="text-muted-foreground transition-colors hover:text-foreground">
                {t('footer.publishNeed')}
              </Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              {t('footer.support')}
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="cursor-default">{t('footer.faq')}</span>
              <span className="cursor-default">{t('footer.contact')}</span>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              {t('footer.legal')}
            </h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="cursor-default">{t('footer.legalNotice')}</span>
              <span className="cursor-default">{t('footer.terms')}</span>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border/60 pt-4 text-center text-[11px] text-muted-foreground/60">
          {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
