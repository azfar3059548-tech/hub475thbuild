import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "HUB47 gave us the connections and mentorship we needed to successfully launch in the UAE market.",
    author: "Ahmed Khan",
    role: "Founder, TechVenture",
    avatar: "AK",
    metric: "Raised $200k in 90 days",
  },
  {
    id: 2,
    quote: "The investor network at HUB47 helped us secure our seed round. Their guidance was game-changing.",
    author: "Sara Ali",
    role: "CEO, FinFlow",
    avatar: "SA",
    metric: "3x revenue growth",
  },
  {
    id: 3,
    quote: "Being part of the cohort connected us with fellow entrepreneurs facing similar challenges.",
    author: "Omar Malik",
    role: "Co-founder, EduTech Plus",
    avatar: "OM",
    metric: "10k+ users acquired",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate with pause on hover/focus
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  const navigate = useCallback((direction: 'prev' | 'next') => {
    setActiveIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? testimonials.length - 1 : prev - 1;
      }
      return prev === testimonials.length - 1 ? 0 : prev + 1;
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-8 md:py-12 bg-card">
      <div className="container-hub">
        {/* Header - Compact */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <p 
            className={`text-kicker text-primary mb-2 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Testimonials
          </p>
          <h2 
            className={`text-h2 text-foreground transition-all duration-500 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            What founders say
          </h2>
        </div>

        {/* Minimal Testimonial Card */}
        <div 
          className={`max-w-xl mx-auto transition-all duration-500 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className="relative bg-background rounded-xl p-6 border border-border overflow-hidden" style={{ minHeight: '160px' }}>
            {/* Testimonial content with crossfade */}
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0 absolute inset-0 p-6'
                }`}
              >
                <p className="text-lg text-foreground leading-relaxed mb-4 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-brand-dark flex items-center justify-center text-primary-foreground text-sm font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{testimonial.author}</p>
                    <p className="text-xs text-accent font-semibold">{testimonial.metric}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex gap-1.5">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeIndex ? 'w-6 bg-primary' : 'w-1.5 bg-border hover:bg-muted-foreground'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex gap-1">
                <button
                  onClick={() => navigate('prev')}
                  className="p-1.5 rounded-full border border-border hover:bg-muted transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('next')}
                  className="p-1.5 rounded-full border border-border hover:bg-muted transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}