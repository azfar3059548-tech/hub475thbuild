import { useEffect, useRef, useState } from 'react';
import { Users, Lightbulb, Rocket, Building, ArrowRight } from 'lucide-react';

const offerings = [
  {
    icon: Users,
    title: 'Vibrant Community',
    description: 'Connect with founders, mentors, and investors in the UAE startup ecosystem.',
    action: 'Join',
  },
  {
    icon: Lightbulb,
    title: 'Expert Mentorship',
    description: 'Weekly mentor clinics with experienced professionals who accelerate your growth.',
    action: 'Learn',
  },
  {
    icon: Rocket,
    title: 'Funding Access',
    description: 'Investor showcase and introductions tailored to your growth stage.',
    action: 'Apply',
  },
  {
    icon: Building,
    title: 'Workspace Credits',
    description: 'Co-working hours and technology facilities to build your product.',
    action: 'Book',
  },
];

export default function Offerings() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-card">
      <div className="container-hub">
        {/* Section Header - Compact */}
        <div className="max-w-2xl mb-8 md:mb-10">
          <p 
            className={`text-kicker text-primary mb-3 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            What We Offer
          </p>
          <h2 
            className={`text-h2 text-foreground transition-all duration-500 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Startups on the fast track
          </h2>
        </div>

        {/* Offerings Grid - Glass Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {offerings.map(({ icon: Icon, title, description, action }, index) => (
            <article
              key={title}
              className={`glass-card p-5 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white/40 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-h3 text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{description}</p>
                
                {/* Action chip */}
                <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                  {action}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}