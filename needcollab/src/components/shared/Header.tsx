import { Link, useLocation } from 'react-router-dom';
import { Bell, Compass, Globe, LogOut, Menu, User, X, Plus, LayoutDashboard, Package, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
              { to: '/my-needs', label: t('nav.myNeeds'), icon: User },
              { to: '/create', label: t('nav.publish'), icon: Plus },
              { to: '/collaborations', label: t('collaborations.title'), icon: Package },
            ]
          : []),
        ...(user?.role === 'vendor'
          ? [
              { to: '/vendor/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
              { to: '/vendor/offers', label: t('nav.myOffers'), icon: Package },
            ]
          : []),
        ...(user?.role === 'admin'
          ? [{ to: '/admin/dashboard', label: t('nav.admin'), icon: ShieldCheck }]
          : []),
      ]
    : [];

  const allLinks = [...publicLinks, ...authLinks];

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-card/70 backdrop-blur-xl backdrop-saturate-150">
        <div className="container flex h-14 items-center justify-between gap-2">

          {/* Logo */}
          <Link to="/" onClick={closeMobile} className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80">
            <img src={logoImg} alt="NeedCollab" className="h-8 w-8 object-contain" />
            <span className="text-lg font-bold tracking-tight">
              Need<span className="text-gradient-brand">Collab</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden flex-1 items-center gap-0.5 px-4 md:flex">
            {allLinks.map(link => {
              const Icon = link.icon;
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
                  <Icon className="h-3.5 w-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Language */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-1.5 rounded-lg px-2 text-xs font-medium text-muted-foreground hover:text-foreground">
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
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">2</span>
                </Button>

                {/* User menu — desktop only */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden h-8 gap-2 rounded-lg pl-1.5 pr-2.5 md:flex">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-brand text-[11px] font-bold text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-medium">{user?.name?.split(' ')[0]}</span>
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
                      <Link to="/profile" className="gap-2"><User className="h-4 w-4" />{t('nav.profile')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="gap-2 text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4" />{t('nav.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs" asChild>
                  <Link to="/auth/login">{t('nav.login')}</Link>
                </Button>
                <Button size="sm" className="h-8 rounded-lg bg-gradient-brand text-xs font-semibold shadow-brand hover:opacity-90" asChild>
                  <Link to="/auth/register">{t('nav.register')}</Link>
                </Button>
              </div>
            )}

            {/* Burger */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg md:hidden"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={closeMobile}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <nav
            className="absolute left-0 right-0 top-14 flex flex-col bg-card shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            {/* User info */}
            {isAuthenticated && (
              <>
                <div className="flex items-center gap-3 px-4 py-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{user?.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <Badge variant="outline" className="ml-auto shrink-0 text-[10px] capitalize">{user?.role}</Badge>
                </div>
                <Separator />
              </>
            )}

            {/* Nav links */}
            <div className="flex flex-col gap-1 p-3">
              {allLinks.map(link => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={closeMobile}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(link.to)
                        ? 'bg-primary/10 text-primary'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <Separator />

            {/* Bottom actions */}
            <div className="flex flex-col gap-1 p-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobile}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                  >
                    <User className="h-4 w-4" />{t('nav.profile')}
                  </Link>
                  <button
                    onClick={() => { logout(); closeMobile(); }}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-4 w-4" />{t('nav.logout')}
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 px-1 pb-1">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/auth/login" onClick={closeMobile}>{t('nav.login')}</Link>
                  </Button>
                  <Button className="w-full bg-gradient-brand font-semibold hover:opacity-90" asChild>
                    <Link to="/auth/register" onClick={closeMobile}>{t('nav.register')}</Link>
                  </Button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
