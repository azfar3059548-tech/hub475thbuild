import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Calendar, Clock, Play } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'How UAE Startups Are Reshaping Fintech',
    excerpt: 'A deep dive into the fintech revolution happening in the Gulf region.',
    date: 'Dec 10, 2024',
    readTime: '5 min',
    category: 'Insights',
    gradient: 'from-primary/80 to-accent/60',
  },
  {
    id: 2,
    title: 'From Pitch to Product: Cohort 2 Success Stories',
    excerpt: 'Meet the founders who transformed their ideas into thriving businesses.',
    date: 'Dec 5, 2024',
    readTime: '8 min',
    category: 'Stories',
    gradient: 'from-accent/80 to-primary/60',
  },
  {
    id: 3,
    title: 'Investor Spotlight: What VCs Look For in 2025',
    excerpt: 'Key insights from our partner investors on the next big opportunities.',
    date: 'Nov 28, 2024',
    readTime: '6 min',
    category: 'Advice',
    gradient: 'from-amber-500/80 to-orange-500/60',
  },
];

const galleryImages = [
  { id: 1, event: 'Demo Day 2024', date: 'Nov 2024', size: 'large' },
  { id: 2, event: 'Founder Mixer', date: 'Oct 2024', size: 'small' },
  { id: 3, event: 'Tech Talk Series', date: 'Oct 2024', size: 'small' },
  { id: 4, event: 'Investor Summit', date: 'Sep 2024', size: 'medium' },
  { id: 5, event: 'Workshop Week', date: 'Sep 2024', size: 'medium' },
];

export default function EcosystemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
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
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + rect.height)
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
    <section 
      ref={sectionRef} 
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Premium background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-muted/30" />
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(ellipse at ${20 + scrollProgress * 30}% 30%, hsl(var(--primary) / 0.08) 0%, transparent 50%),
                       radial-gradient(ellipse at ${80 - scrollProgress * 30}% 70%, hsl(var(--accent) / 0.08) 0%, transparent 50%)`,
        }}
      />
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                          linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      
      <div className="container-hub relative z-10">
        {/* Premium header with animated underline */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-kicker text-primary mb-3">Community</p>
          <h2 className="text-h2 text-foreground mb-4 relative inline-block">
            Hub47 Ecosystem
            <span 
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
              style={{ width: isVisible ? '100%' : '0%' }}
            />
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-xl mx-auto mt-6">
            Where ideas meet opportunity — insights and moments from our thriving community
          </p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Blog Section - Premium Cards */}
          <div 
            className={`lg:col-span-3 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Latest Insights
              </h3>
              <a href="/blog" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 group">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            <div className="space-y-5">
              {blogPosts.map((post, index) => (
                <a
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="block group"
                  style={{ 
                    transitionDelay: `${200 + index * 100}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.5s ease-out',
                  }}
                >
                  <article className="relative p-5 md:p-6 bg-card rounded-2xl border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden">
                    {/* Gradient accent bar */}
                    <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${post.gradient} rounded-l-2xl`} />
                    
                    <div className="flex items-start gap-5 pl-3">
                      {/* Image placeholder with gradient */}
                      <div className={`w-24 h-24 md:w-28 md:h-28 rounded-xl bg-gradient-to-br ${post.gradient} flex-shrink-0 flex items-center justify-center overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                        <Play className="w-8 h-8 text-white/80" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <span className="inline-block px-2.5 py-1 text-xs font-bold text-primary bg-primary/10 rounded-full mb-2">
                          {post.category}
                        </span>
                        <h4 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 hidden md:block">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                      
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                    </div>
                  </article>
                </a>
              ))}
            </div>
          </div>
          
          {/* Gallery Section - Bento Grid */}
          <div 
            className={`lg:col-span-2 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                Past Moments
              </h3>
              <a href="/gallery" className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 group">
                Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            {/* Bento-style asymmetric grid */}
            <div className="grid grid-cols-2 gap-3 auto-rows-[100px]">
              {galleryImages.map((img, index) => (
                <div
                  key={img.id}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                    img.size === 'large' ? 'col-span-2 row-span-2' : 
                    img.size === 'medium' ? 'col-span-1 row-span-2' : 
                    'col-span-1 row-span-1'
                  }`}
                  style={{ 
                    transitionDelay: `${300 + index * 80}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                  }}
                  onMouseEnter={() => setHoveredImage(img.id)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  {/* Gradient placeholder with animated shine */}
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    index % 3 === 0 ? 'bg-gradient-to-br from-primary/40 to-accent/40' :
                    index % 3 === 1 ? 'bg-gradient-to-br from-accent/40 to-amber-500/40' :
                    'bg-gradient-to-br from-primary/30 to-primary/50'
                  } ${hoveredImage === img.id ? 'scale-110' : 'scale-100'}`} />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  {/* Overlay on hover */}
                  <div className={`absolute inset-0 bg-foreground/80 flex flex-col items-center justify-center p-4 text-center transition-all duration-300 ${
                    hoveredImage === img.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <p className="text-white font-bold text-sm md:text-base mb-1">
                      {img.event}
                    </p>
                    <p className="text-white/70 text-xs">
                      {img.date}
                    </p>
                  </div>
                  
                  {/* Default state */}
                  <div className={`absolute inset-0 flex items-end p-3 transition-opacity duration-300 ${
                    hoveredImage === img.id ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <div className="bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                      <p className="text-xs font-medium text-foreground">{img.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
