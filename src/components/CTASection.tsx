import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const benefits = [
  'Access to mentorship network',
  'Investor introductions',
  'Co-working space in Dubai',
  'Market access support',
];

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-brand-navy relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container-hub relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <p 
              className={`text-caption text-primary uppercase tracking-wider mb-4 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Join Our Next Cohort
            </p>
            <h2 
              className={`text-h2 text-primary-foreground mb-6 transition-all duration-500 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Ready to accelerate your startup journey?
            </h2>
            <p 
              className={`text-body-lg text-primary-foreground/80 mb-8 transition-all duration-500 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Register your startup to accelerate your entrepreneurship aspirations. Being part of the HUB47 community gives you exclusive insights and benefits.
            </p>
            
            {/* Benefits list */}
            <ul 
              className={`space-y-3 mb-8 transition-all duration-500 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-primary-foreground/90">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-body">{benefit}</span>
                </li>
              ))}
            </ul>
            
            {/* CTA Buttons */}
            <div 
              className={`flex flex-wrap gap-4 transition-all duration-500 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <a href="/apply" className="btn-primary group">
                Register Startup
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="/brochure.pdf" 
                download
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-primary-foreground/30 text-primary-foreground font-semibold rounded-lg hover:border-primary-foreground/60 transition-colors"
              >
                Download Brochure
              </a>
            </div>
          </div>
          
          {/* Right: Stats */}
          <div 
            className={`grid grid-cols-2 gap-6 transition-all duration-500 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {[
              { value: '50+', label: 'Startups Supported' },
              { value: '$2M+', label: 'Funding Raised' },
              { value: '100+', label: 'Mentors & Advisors' },
              { value: '12', label: 'Week Program' },
            ].map(({ value, label }, index) => (
              <div 
                key={label}
                className="p-6 bg-primary-foreground/5 rounded-xl border border-primary-foreground/10 text-center"
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <p className="text-4xl md:text-5xl font-bold text-primary mb-2">{value}</p>
                <p className="text-sm text-primary-foreground/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
