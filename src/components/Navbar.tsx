import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, CheckCircle, FileEdit, Heart, Users, Calendar, Image, BookOpen, Mic, Sparkles, CreditCard } from 'lucide-react';
import hub47Logo from '@/assets/hub47-logo.png';
import padLogo from '@/assets/pad-logo.png';
 
const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Startup',
    href: '#',
    children: [
      { label: 'Overview', href: '/startup', icon: Sparkles },
      { label: 'Eligibility', href: '/eligibility', icon: CheckCircle },
      { label: 'Apply', href: '/apply', icon: FileEdit },
    ],
  },
  {
    label: 'Community',
    href: '#',
    children: [
      { label: 'Volunteer', href: '/volunteer', icon: Heart },
      { label: 'Membership', href: '/membership', icon: CreditCard },
      { label: 'Members', href: '/members', icon: Users },
    ],
  },
  {
    label: 'Events',
    href: '#',
    children: [
      { label: 'Upcoming', href: '/events', icon: Calendar },
      { label: 'Gallery', href: '/gallery', icon: Image },
    ],
  },
  {
    label: 'Resources',
    href: '#',
    children: [
      { label: 'Blog', href: '/blog', icon: BookOpen },
      { label: 'Podcast', href: '/podcast', icon: Mic },
    ],
  },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
        isScrolled ? 'navbar-sticky' : 'bg-transparent'
      }`}
    >
      <nav className="container-hub h-full flex items-center justify-between" aria-label="Main navigation">
        {/* Left: Hub47 Logo */}
        <a href="/" className="flex-shrink-0" aria-label="Hub47 Home">
          <img src={hub47Logo} alt="Hub47" className="h-10 md:h-12 w-auto" />
        </a>

        {/* Center: Nav Items (Desktop) */}
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.label} className="relative">
              {item.children ? (
                <div
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-body font-medium text-foreground hover:text-primary transition-colors"
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 pt-2 animate-fade-in">
                      <ul className="bg-card rounded-xl shadow-xl border border-border py-2 min-w-[180px]">
                        {item.children.map((child) => {
                          const Icon = child.icon;
                          return (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                className="flex items-center gap-3 px-4 py-2.5 text-body text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                              >
                                <Icon className="w-4 h-4 text-muted-foreground" />
                                {child.label}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  href={item.href}
                  className="px-4 py-2 text-body font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Right: PAD Logo + CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <a href="https://padubai.com" target="_blank" rel="noopener noreferrer" aria-label="Pakistan Association Dubai">
            <img src={padLogo} alt="Pakistan Association Dubai" className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" />
          </a>
          <a href="/apply" className="btn-primary text-sm">
            Register Startup
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 right-0 bg-card border-b border-border shadow-lg animate-fade-in">
          <div className="container-hub py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <details className="group">
                      <summary className="flex items-center justify-between px-4 py-3 text-body font-medium text-foreground cursor-pointer">
                        {item.label}
                        <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                      </summary>
                      <ul className="pl-4 pb-2">
                        {item.children.map((child) => {
                          const Icon = child.icon;
                          return (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                className="flex items-center gap-3 px-4 py-2 text-body text-muted-foreground hover:text-primary"
                                onClick={() => setIsMobileOpen(false)}
                              >
                                <Icon className="w-4 h-4" />
                                {child.label}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </details>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-4 py-3 text-body font-medium text-foreground hover:text-primary"
                      onClick={() => setIsMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <img src={padLogo} alt="PAD" className="h-6 w-auto opacity-70" />
              <a href="/apply" className="btn-primary text-sm" onClick={() => setIsMobileOpen(false)}>
                Register Startup
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
