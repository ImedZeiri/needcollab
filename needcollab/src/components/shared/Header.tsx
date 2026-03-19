import { Link, useLocation } from 'react-router-dom';
import { Bell, Compass, Globe, LogOut, Menu, User, X } from 'lucide-react';
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
import { useTranslation } from 'react-i18next';
import logoImg from '@/assets/logo.png';

const LANGUAGES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const currentLang = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  const handleLangChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  const publicLinks = [
    { to: '/needs', label: t('nav.explore'), icon: Compass },
  ];

  const authLinks = isAuthenticated
    ? [
        ...(user?.role === 'client'
          ? [
              { to: '/my-needs', label: t('nav.myNeeds') },
              { to: '/create', label: t('nav.publish') },
            ]
          : []),
        ...(user?.role === 'vendor'
          ? [
              { to: '/vendor/dashboard', label: t('nav.dashboard') },
              { to: '/vendor/offers', label: t('nav.myOffers') },
            ]
          : []),
        ...(user?.role === 'admin'
          ? [{ to: '/admin/dashboard', label: t('nav.admin') }]
          : []),
      ]
    : [];

  const allLinks = [...publicLinks, ...authLinks];

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-card/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex h-14 items-center justify-between gap-4">
        {/* Logo + Nav */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <img src={logoImg} alt="NeedCollab" className="h-8 w-8 object-contain" />
            <span className="text-lg font-bold tracking-tight">
              Need<span className="text-gradient-brand">Collab</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {allLinks.map(link => {
              const Icon = 'icon' in link ? (link as { icon: typeof Compass }).icon : null;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all ${
                    isActive(link.to)
                      ? 'bg-primary/10 text-primary shadow-sm'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 rounded-lg px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{currentLang.flag}</span>
                <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {LANGUAGES.map(lang => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLangChange(lang.code)}
                  className={`gap-2 ${i18n.language === lang.code ? 'bg-primary/5 font-medium text-primary' : ''}`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-lg">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
                  2
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-2 rounded-lg pl-1.5 pr-2.5"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-brand text-[11px] font-bold text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden text-xs font-medium sm:inline">{user?.name?.split(' ')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-semibold">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    <Badge variant="outline" className="mt-1.5 text-[10px] capitalize">{user?.role}</Badge>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="gap-2">
                      <User className="h-4 w-4" />
                      {t('nav.profile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="gap-2 text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4" />
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs" asChild>
                <Link to="/auth/login">{t('nav.login')}</Link>
              </Button>
              <Button size="sm" className="h-8 rounded-lg bg-gradient-brand text-xs font-semibold shadow-brand hover:opacity-90" asChild>
                <Link to="/auth/register">{t('nav.register')}</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border/60 bg-card/95 p-3 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {allLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
