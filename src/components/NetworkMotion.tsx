import { useEffect, useRef, useState } from 'react';

interface Node {
  id: number;
  cx: number;
  cy: number;
  r: number;
  delay: number;
  connections: number[];
}

interface Streak {
  id: number;
  x: number;
  length: number;
  delay: number;
}

const nodes: Node[] = [
  { id: 1, cx: 150, cy: 100, r: 8, delay: 0, connections: [2, 3, 5] },
  { id: 2, cx: 280, cy: 80, r: 6, delay: 0.2, connections: [1, 4] },
  { id: 3, cx: 100, cy: 200, r: 10, delay: 0.4, connections: [1, 6] },
  { id: 4, cx: 350, cy: 150, r: 7, delay: 0.6, connections: [2, 5, 7] },
  { id: 5, cx: 220, cy: 180, r: 12, delay: 0.1, connections: [1, 4, 6, 8] },
  { id: 6, cx: 80, cy: 300, r: 6, delay: 0.3, connections: [3, 5, 9] },
  { id: 7, cx: 400, cy: 250, r: 9, delay: 0.5, connections: [4, 8] },
  { id: 8, cx: 300, cy: 280, r: 8, delay: 0.7, connections: [5, 7, 9, 10] },
  { id: 9, cx: 180, cy: 350, r: 7, delay: 0.2, connections: [6, 8] },
  { id: 10, cx: 380, cy: 350, r: 10, delay: 0.4, connections: [8, 11] },
  { id: 11, cx: 450, cy: 320, r: 5, delay: 0.6, connections: [10] },
  { id: 12, cx: 50, cy: 150, r: 5, delay: 0.8, connections: [3] },
];

const streaks: Streak[] = [
  { id: 1, x: 380, length: 60, delay: 0 },
  { id: 2, x: 420, length: 45, delay: 1.2 },
  { id: 3, x: 460, length: 35, delay: 2.4 },
  { id: 4, x: 340, length: 50, delay: 0.8 },
  { id: 5, x: 400, length: 40, delay: 2 },
];

export default function NetworkMotion() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || prefersReducedMotion.current) return;

    let rafId: number;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = window.innerHeight * 0.6;
        const progress = Math.min(scrollY / maxScroll, 1);
        setScrollProgress(progress);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  const getNodeById = (id: number) => nodes.find((n) => n.id === id);

  // Counter-parallax transforms
  const blobTransform = `translateY(${scrollProgress * 20}px)`;
  const nodeTransform = -scrollProgress * 18;
  const streakTransform = -scrollProgress * 35;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full min-h-[400px] overflow-visible"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 500 420"
        className="w-full h-full"
        aria-label="Abstract network visualization representing startup ecosystem"
        role="img"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(195, 78%, 53%)" />
            <stop offset="100%" stopColor="hsl(205, 85%, 35%)" />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(90, 52%, 50%)" />
            <stop offset="100%" stopColor="hsl(90, 52%, 65%)" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(195, 78%, 53%)" stopOpacity="0.2" />
            <stop offset="50%" stopColor="hsl(195, 78%, 53%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(195, 78%, 53%)" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(195, 78%, 53%)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="hsl(90, 52%, 50%)" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="streakGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(195, 78%, 53%)" stopOpacity="0" />
            <stop offset="30%" stopColor="hsl(195, 78%, 53%)" stopOpacity="0.4" />
            <stop offset="70%" stopColor="hsl(195, 78%, 53%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(195, 78%, 53%)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(195, 78%, 53%)" stopOpacity={isHovering ? "0.25" : "0.12"} />
            <stop offset="100%" stopColor="hsl(195, 78%, 53%)" stopOpacity="0" />
          </radialGradient>
          
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="softGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Layer 1: Background Morph Blob - moves WITH scroll */}
        <g 
          style={{ 
            transform: blobTransform,
            transition: 'transform 0.15s ease-out'
          }}
        >
          <ellipse
            cx="320"
            cy="200"
            rx="180"
            ry="150"
            fill="url(#blobGradient)"
            className={prefersReducedMotion.current ? '' : 'morph-blob'}
            style={{ transformOrigin: '320px 200px' }}
          />
        </g>

        {/* Radial glow behind nodes - pulses on hover */}
        <circle
          cx="220"
          cy="180"
          r="120"
          fill="url(#glowGradient)"
          className={prefersReducedMotion.current ? '' : 'glow-pulse'}
          style={{ 
            transition: 'opacity 0.3s ease',
            opacity: isVisible ? 1 : 0 
          }}
        />

        {/* Layer 2: Connection Lines */}
        <g 
          className="connections" 
          opacity={isVisible ? 1 : 0} 
          style={{ 
            transition: 'opacity 0.5s',
            transform: `translateY(${nodeTransform}px)`,
          }}
        >
          {nodes.map((node) =>
            node.connections.map((targetId) => {
              const target = getNodeById(targetId);
              if (!target || targetId < node.id) return null;
              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={node.cx}
                  y1={node.cy}
                  x2={target.cx}
                  y2={target.cy}
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                  className={prefersReducedMotion.current ? '' : 'line-draw'}
                  style={{
                    strokeDasharray: 1000,
                    animationDelay: `${node.delay}s`,
                  }}
                />
              );
            })
          )}
        </g>

        {/* Layer 2: Nodes - move OPPOSITE to scroll */}
        <g 
          className="nodes"
          style={{ 
            transform: `translateY(${nodeTransform}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {nodes.map((node, index) => {
            const isAccent = index % 4 === 0;
            
            return (
              <g key={node.id}>
                {/* Outer glow ring */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r + 6}
                  fill={isAccent ? 'hsl(90, 52%, 50%)' : 'hsl(195, 78%, 53%)'}
                  opacity={isVisible ? 0.15 : 0}
                  className={prefersReducedMotion.current ? '' : 'animate-pulse-soft'}
                  style={{ animationDelay: `${node.delay}s` }}
                />
                
                {/* Main node */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r}
                  fill={isAccent ? 'url(#accentGradient)' : 'url(#nodeGradient)'}
                  filter="url(#glow)"
                  opacity={isVisible ? 1 : 0}
                  className={prefersReducedMotion.current ? '' : 'animate-float'}
                  style={{
                    animationDelay: `${node.delay * 2}s`,
                    transition: 'opacity 0.5s',
                    transitionDelay: `${node.delay}s`,
                  }}
                />
                
                {/* Inner highlight */}
                <circle
                  cx={node.cx - node.r * 0.3}
                  cy={node.cy - node.r * 0.3}
                  r={node.r * 0.3}
                  fill="white"
                  opacity={isVisible ? 0.4 : 0}
                  style={{ transition: 'opacity 0.5s', transitionDelay: `${node.delay}s` }}
                />
              </g>
            );
          })}
        </g>

        {/* Layer 3: Momentum Streaks - move FAST opposite to scroll */}
        <g 
          style={{ 
            transform: `translateY(${streakTransform}px)`,
            transition: 'transform 0.08s ease-out'
          }}
        >
          {!prefersReducedMotion.current && streaks.map((streak) => (
            <line
              key={streak.id}
              x1={streak.x}
              y1={420}
              x2={streak.x - 10}
              y2={420 - streak.length}
              stroke="url(#streakGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              className="streak-up"
              style={{ 
                animationDelay: `${streak.delay}s`,
                opacity: isVisible ? 0.6 : 0
              }}
            />
          ))}
        </g>

        {/* Central hub highlight */}
        <circle
          cx={220}
          cy={180}
          r={40}
          fill="hsl(195, 78%, 53%)"
          opacity={isVisible ? 0.05 : 0}
          className={prefersReducedMotion.current ? '' : 'animate-pulse-soft'}
        />
      </svg>
      
      {/* Decorative blur elements - counter parallax */}
      <div 
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        style={{ transform: `translateY(${scrollProgress * 40}px)` }}
      />
      <div 
        className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl pointer-events-none"
        style={{ transform: `translateY(${-scrollProgress * 30}px)` }}
      />
    </div>
  );
}