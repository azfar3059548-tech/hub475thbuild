import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Rocket, Heart, Crown, Sparkles, Check } from 'lucide-react';

const ctaCards = [
  {
    id: 'startups',
    icon: Rocket,
    title: 'For Startups',
    subtitle: '12-week cohort program',
    description: 'Join our accelerator with mentorship, investor access, and workspace credits.',
    benefits: ['Weekly mentor clinics', 'Investor showcase', '$50k+ partner credits'],
    cta: 'Register Startup',
    ctaHref: '/apply',
    note: '5 min application',
    gradient: 'from-primary to-primary/70',
    accentColor: 'primary',
  },
  {
    id: 'volunteers',
    icon: Heart,
    title: 'For Volunteers',
    subtitle: 'Share your expertise',
    description: 'Mentor founders and grow alongside our vibrant community.',
    benefits: ['Flexible hours', 'Exclusive events', 'Recognition & networking'],
    cta: 'Join as Volunteer',
    ctaHref: '/volunteer',
    note: 'Make real impact',
    gradient: 'from-accent to-accent/70',
    accentColor: 'accent',
  },
  {
    id: 'membership',
    icon: Crown,
    title: 'Membership',
    subtitle: 'Exclusive access',
    description: 'Unlock premium perks, priority event access, and VIP networking.',
    benefits: ['Priority event seats', 'Member-only resources', 'VIP introductions'],
    cta: 'Become a Member',
    ctaHref: '/membership',
    note: 'Limited spots',
    gradient: 'from-amber-500 to-orange-500',
    accentColor: 'amber',
  },
];

export default function JoinHubCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    const handleScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Calculate progress from 0 to 1 as section moves through viewport
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - sectionTop) / (windowHeight + sectionHeight)
      ));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at ${30 + scrollProgress * 40}% ${20 + scrollProgress * 30}%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
                       radial-gradient(ellipse at ${70 - scrollProgress * 40}% ${80 - scrollProgress * 30}%, hsl(var(--accent) / 0.15) 0%, transparent 50%)`,
        }}
      />
      
      {/* Large decorative text with morph effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span 
          className="text-display text-foreground/[0.03] select-none transition-all duration-700"
          style={{
            transform: `scale(${0.9 + scrollProgress * 0.15}) translateY(${(1 - scrollProgress) * 30}px)`,
            opacity: 0.02 + scrollProgress * 0.02,
          }}
        >
          JOIN
        </span>
      </div>
      
      {/* Floating decorative shapes */}
      <div className="absolute top-20 left-[10%] w-4 h-4 rounded-full bg-primary/30 animate-float-bob" />
      <div className="absolute top-40 right-[15%] w-6 h-6 rounded-full bg-accent/30 animate-float-bob" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-[20%] w-3 h-3 rounded-full bg-amber-500/30 animate-float-bob" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-[25%] w-5 h-5 rounded-full bg-primary/20 animate-float-bob" style={{ animationDelay: '0.5s' }} />
      
      <div className="container-hub relative z-10">
        {/* Header with morph */}
        <div 
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transform: isVisible ? `translateY(${(1 - Math.min(scrollProgress * 2, 1)) * 20}px)` : 'translateY(32px)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-5">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">Be Part of Something Big</span>
          </div>
          <h2 className="text-h2 text-foreground mb-4">Join Hub47</h2>
          <p className="text-body-lg text-muted-foreground max-w-md mx-auto">
            Choose your path to impact in our thriving ecosystem
          </p>
        </div>
        
        {/* 3 Horizontal CTA Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {ctaCards.map((card, index) => {
            const Icon = card.icon;
            const cardProgress = Math.max(0, Math.min(1, (scrollProgress - 0.1 * index) * 1.5));
            
            return (
              <div 
                key={card.id}
                className={`group relative transition-all duration-700`}
                style={{ 
                  transitionDelay: `${index * 150}ms`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible 
                    ? `translateY(${(1 - cardProgress) * 40}px) scale(${0.95 + cardProgress * 0.05}) rotate(${(1 - cardProgress) * (index === 1 ? 0 : index === 0 ? -2 : 2)}deg)`
                    : 'translateY(60px) scale(0.9)',
                }}
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Card */}
                <div className="relative h-full p-6 md:p-8 bg-card rounded-3xl border border-border/50 shadow-xl overflow-hidden group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                  {/* Animated gradient border on hover */}
                  <div 
                    className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--${card.accentColor === 'amber' ? 'primary' : card.accentColor}) / 0.2), transparent 60%)`,
                    }}
                  />
                  
                  {/* Icon with bob animation */}
                  <div 
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    style={{
                      transform: `translateY(${Math.sin(scrollProgress * Math.PI * 2 + index) * 4}px)`,
                    }}
                  >
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
                    card.accentColor === 'primary' ? 'text-primary' :
                    card.accentColor === 'accent' ? 'text-accent' :
                    'text-amber-500'
                  }`}>
                    {card.subtitle}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{card.title}</h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    {card.description}
                  </p>
                  
                  {/* Benefits */}
                  <ul className="space-y-2 mb-6">
                    {card.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className={`w-4 h-4 flex-shrink-0 ${
                          card.accentColor === 'primary' ? 'text-primary' :
                          card.accentColor === 'accent' ? 'text-accent' :
                          'text-amber-500'
                        }`} />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href={card.ctaHref} 
                    className={`w-full inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold text-white transition-all duration-300 group/btn bg-gradient-to-r ${card.gradient} hover:shadow-lg hover:-translate-y-0.5`}
                  >
                    {card.cta}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    {card.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
