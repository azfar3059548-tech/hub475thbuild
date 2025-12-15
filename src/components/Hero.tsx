import { lazy, Suspense } from 'react';
import { ArrowRight, Users, Briefcase, Building2 } from 'lucide-react';

const NetworkMotion = lazy(() => import('./NetworkMotion'));

function StaticHeroGraphic() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center">
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-primary/20 animate-pulse" />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/40" />
        </div>
      </div>
    </div>
  );
}

const benefits = [
  { icon: Users, text: '12-week cohort' },
  { icon: Briefcase, text: 'Investor introductions' },
  { icon: Building2, text: 'Workspace credits' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-[72px] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/50" />
      
      <div className="container-hub relative z-10 py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="lg:col-span-7 space-y-5">
            {/* Kicker - Editorial style */}
            <p 
              className="text-kicker text-primary opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
              Community driven tech startup accelerator in the UAE
            </p>
            
            {/* H1 - Premium tight typography */}
            <h1 
              className="text-h1 text-foreground opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              Build faster.{' '}
              <span className="text-primary">Access UAE markets.</span>
            </h1>
            
            {/* Subheading - Tighter */}
            <p 
              className="font-display text-lg md:text-xl font-medium text-muted-foreground opacity-0 animate-fade-in-up tracking-tight"
              style={{ animationDelay: '0.3s' }}
            >
              Mentorship. Market access. Cohort support.
            </p>
            
            {/* Benefits row - Compact */}
            <div 
              className="flex flex-wrap gap-3 md:gap-5 py-3 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.4s' }}
            >
              {benefits.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-foreground">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </div>
            
            {/* CTAs */}
            <div 
              className="flex flex-wrap gap-3 pt-2 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              <a href="/apply" className="btn-primary group">
                Register Startup
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="/volunteer" className="btn-secondary">
                Volunteer with us
              </a>
            </div>
            
            {/* Microcopy */}
            <p 
              className="text-xs text-muted-foreground opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.55s' }}
            >
              5 minute application • No equity taken
            </p>
            
            {/* Social proof - Compact */}
            <div 
              className="flex items-center gap-3 pt-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-brand-dark border-2 border-background flex items-center justify-center text-primary-foreground text-[10px] font-semibold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">50+</span> startups in our community
              </p>
            </div>
          </div>
          
          {/* Right Column - Motion Graphic */}
          <div className="lg:col-span-5 relative">
            <div 
              className="relative lg:absolute lg:-right-20 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[140%] opacity-0 animate-slide-in-right"
              style={{ animationDelay: '0.4s' }}
            >
              <Suspense fallback={<StaticHeroGraphic />}>
                <NetworkMotion />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent" />
    </section>
  );
}