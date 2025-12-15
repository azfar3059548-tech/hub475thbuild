import { Mail, MapPin, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';
import hub47Logo from '@/assets/hub47-logo.png';
import padLogo from '@/assets/pad-logo.png';

const footerLinks = {
  programs: [
    { label: 'Startup Cohort', href: '/cohort' },
    { label: 'Eligibility', href: '/eligibility' },
    { label: 'Apply Now', href: '/apply' },
    { label: 'Mentorship', href: '/mentorship' },
  ],
  community: [
    { label: 'Volunteer', href: '/volunteer' },
    { label: 'Members', href: '/members' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
  ],
  resources: [
    { label: 'Blog', href: '/blog' },
    { label: 'Podcast', href: '/podcast' },
    { label: 'Brochure', href: '/brochure.pdf' },
    { label: 'FAQ', href: '/faq' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/hub47', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/hub47uae', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/hub47uae', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/@hub47', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-100">
      <div className="container-hub py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <img src={hub47Logo} alt="Hub47" className="h-10 w-auto mb-6 brightness-0 invert" />
            <p className="text-neutral-400 text-body mb-6 max-w-sm">
              HUB47 is the pioneering incubator for Pakistani startups in the UAE, helping founders scale in the dynamic Gulf market.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3 text-sm text-neutral-400">
              <a href="mailto:info@hub47.ae" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                info@hub47.ae
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Pakistan Association Dubai,<br />Street 1lb, Oud Metha Road,<br />Bur Dubai, UAE</span>
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-neutral-800 hover:bg-primary/20 hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Links columns */}
          <div>
            <h4 className="font-semibold mb-4 text-neutral-100">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-neutral-400 hover:text-primary transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-neutral-100">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-neutral-400 hover:text-primary transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-neutral-100">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-neutral-400 hover:text-primary transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-500">Powered by</span>
            <a href="https://padubai.com" target="_blank" rel="noopener noreferrer">
              <img src={padLogo} alt="Pakistan Association Dubai" className="h-8 w-auto brightness-0 invert opacity-60 hover:opacity-100 transition-opacity" />
            </a>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a>
            <span>© {new Date().getFullYear()} HUB47. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
