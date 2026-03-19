import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-lg font-bold text-primary">NeedCollab</h3>
            <p className="text-sm text-muted-foreground">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">{t('footer.platform')}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/needs" className="hover:text-foreground">{t('nav.marketplace')}</Link>
              <Link to="/create" className="hover:text-foreground">{t('footer.publishNeed')}</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">{t('footer.support')}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>{t('footer.faq')}</span>
              <span>{t('footer.contact')}</span>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">{t('footer.legal')}</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>{t('footer.legalNotice')}</span>
              <span>{t('footer.terms')}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
