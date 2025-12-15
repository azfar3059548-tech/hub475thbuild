import { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-background">
      <div className="container-hub">
        <div 
          className={`max-w-2xl mx-auto text-center transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-h2 text-foreground mb-4">Stay in the Loop</h2>
          <p className="text-body-lg text-muted-foreground mb-8">
            Get the latest updates on events, opportunities, and startup insights delivered to your inbox.
          </p>

          {isSubmitted ? (
            <div className="flex items-center justify-center gap-3 p-4 bg-accent/10 rounded-lg text-accent">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Thanks for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button type="submit" className="btn-primary">
                Subscribe
                <Send className="ml-2 w-4 h-4" />
              </button>
            </form>
          )}

          <p className="mt-4 text-sm text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
