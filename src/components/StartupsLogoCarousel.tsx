 import { useEffect, useRef, useState } from 'react';
import logo1 from '@/assets/Canoon.png';
import logo2 from '@/assets/athlos.png';
import logo3 from '@/assets/Fougito.png';
import logo4 from '@/assets/Experimenterz.png';
import logo5 from '@/assets/PSY.png';
import logo6 from '@/assets/Sarah AI.png';

const startups = [
  { name: 'Canoon', image: logo1 },
  { name: 'Athlos', image: logo2 },
  { name: 'Fougito', image: logo3 },
  { name: 'Experimenterz', image: logo4 },
  { name: 'PSY', image: logo5 },
  { name: 'GreenGrid', image: logo6 },
];

export default function StartupsLogoCarousel() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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
    <section ref={sectionRef} className="py-12 md:py-16 bg-muted/20 overflow-hidden">
      <div className="container-hub mb-8">
        <div
          className={`text-center transition-all duration-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-kicker text-primary mb-2">Our Portfolio</p>
          <h2 className="text-h2 text-foreground">Startups We've Accelerated</h2>
        </div>
      </div>

      {/* Infinite scroll container */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/20 to-transparent z-10 pointer-events-none" />

        {/* Animation Track */}
        <div
          className={`flex gap-10 ${isPaused ? "pause-animation" : ""}`}
          style={{
            animation: "scrollLogos 30s linear infinite",
            width: "fit-content",
          }}
        >
          {[...startups, ...startups].map((startup, index) => (
            <div
              key={`${startup.name}-${index}`}
              className={`flex-shrink-0 group transition-all duration-500 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: `${(index % startups.length) * 50}ms` }}
            >
              {/* --------------- BIGGER BOX HERE --------------- */}
              <div className="w-40 h-40 rounded-2xl bg-white border border-border/50 
                flex flex-col items-center justify-center gap-3 transition-all duration-300 
                group-hover:shadow-lg group-hover:border-primary/30 group-hover:scale-105"
              >

                {/* --------------- BIGGER IMAGE HERE --------------- */}
                {startup.image ? (
                  <img
                    src={startup.image}
                    alt={startup.name}
                    className="w-24 h-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center transition-all duration-300 grayscale group-hover:grayscale-0">
                    <span className="text-2xl font-bold text-foreground/70 group-hover:text-primary transition-colors">
                      {startup.initials}
                    </span>
                  </div>
                )}

                {/* Startup Name */}
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors truncate max-w-[90%]">
                  {startup.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollLogos {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .pause-animation {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}
