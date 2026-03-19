import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-lg font-bold text-primary">NeedCollab</h3>
            <p className="text-sm text-muted-foreground">Plateforme de mise en relation entre clients et fournisseurs.</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Plateforme</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link to="/needs" className="hover:text-foreground">Marketplace</Link>
              <Link to="/create" className="hover:text-foreground">Publier un besoin</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Support</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>FAQ</span>
              <span>Contact</span>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold">Légal</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <span>Mentions légales</span>
              <span>CGU</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          © 2026 NeedCollab. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
