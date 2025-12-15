import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Quote, Linkedin, Twitter } from 'lucide-react';

export default function VolunteerSection() {
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
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container-hub relative z-10">
        {/* Section header */}
        <div className={`text-center mb-12 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-kicker text-accent mb-2">Recognition</p>
          <h2 className="text-h2 text-foreground">Volunteer of the Month</h2>
        </div>
        
        {/* Volunteer card */}
        <div className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="relative bg-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-xl overflow-hidden">
            {/* Decorative quote mark */}
            <Quote className="absolute top-6 right-6 w-16 h-16 text-accent/10" />
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile image */}
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-accent to-primary p-1">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center text-4xl font-bold text-foreground">
                    SA
                  </div>
                </div>
                {/* Award badge */}
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-xl">⭐</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  Sarah Ahmed
                </h3>
                <p className="text-primary font-semibold mb-4">
                  Community Lead & Mentor
                </p>
                
                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-muted-foreground italic mb-6 leading-relaxed">
                  "Watching founders transform their ideas into reality is the most rewarding experience. Every success story fuels my passion to give back more."
                </blockquote>
                
                {/* Stats */}
                <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">50+</p>
                    <p className="text-xs text-muted-foreground">Hours Contributed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">12</p>
                    <p className="text-xs text-muted-foreground">Startups Mentored</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">6</p>
                    <p className="text-xs text-muted-foreground">Months Active</p>
                  </div>
                </div>
                
                {/* Social links */}
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className={`text-center mt-10 transition-all duration-500 delay-400 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <a 
            href="/nominate" 
            className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:text-primary/80 transition-colors group"
          >
            Nominate Next Month's Volunteer
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
