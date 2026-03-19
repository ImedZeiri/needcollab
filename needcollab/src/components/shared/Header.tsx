import { Link, useLocation } from 'react-router-dom';
import { Bell, LogOut, Menu, User, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const next = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
  };

  const navLinks = isAuthenticated
    ? [
        { to: '/needs', label: t('nav.marketplace') },
        ...(user?.role === 'client' ? [{ to: '/my-needs', label: t('nav.myNeeds') }, { to: '/create', label: t('nav.publish') }] : []),
        ...(user?.role === 'vendor' ? [{ to: '/vendor/dashboard', label: t('nav.dashboard') }, { to: '/vendor/offers', label: t('nav.myOffers') }] : []),
        ...(user?.role === 'admin' ? [{ to: '/admin/dashboard', label: t('nav.admin') }] : []),
      ]
    : [];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xl font-bold text-primary">NeedCollab</Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive(link.to) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={toggleLang} className="text-xs font-semibold">
            {i18n.language === 'fr' ? 'EN' : 'FR'}
          </Button>
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px]">2</Badge>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    <Badge variant="outline" className="mt-1 text-[10px]">{user?.role}</Badge>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link to="/profile">{t('nav.profile')}</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}><LogOut className="mr-2 h-4 w-4" />{t('nav.logout')}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex gap-2">
              <Button variant="ghost" asChild><Link to="/auth/login">{t('nav.login')}</Link></Button>
              <Button asChild><Link to="/auth/register">{t('nav.register')}</Link></Button>
            </div>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border p-4 md:hidden">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-md px-3 py-2 text-sm font-medium ${isActive(link.to) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
