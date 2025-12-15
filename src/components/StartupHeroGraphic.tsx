import { motion } from 'framer-motion';
import { Rocket, Zap, TrendingUp, Target, DollarSign, Users, Lightbulb, BarChart3 } from 'lucide-react';

const floatingIcons = [
  { Icon: Rocket, x: 70, y: 20, delay: 0, size: 28, color: 'text-primary' },
  { Icon: Zap, x: 85, y: 45, delay: 0.2, size: 22, color: 'text-yellow-500' },
  { Icon: TrendingUp, x: 75, y: 70, delay: 0.4, size: 24, color: 'text-green-500' },
  { Icon: Target, x: 55, y: 85, delay: 0.6, size: 20, color: 'text-red-500' },
  { Icon: DollarSign, x: 30, y: 75, delay: 0.8, size: 22, color: 'text-emerald-500' },
  { Icon: Users, x: 20, y: 50, delay: 1, size: 24, color: 'text-blue-500' },
  { Icon: Lightbulb, x: 35, y: 25, delay: 1.2, size: 22, color: 'text-amber-500' },
  { Icon: BarChart3, x: 50, y: 10, delay: 1.4, size: 20, color: 'text-purple-500' },
];

const orbitingDots = Array.from({ length: 12 }, (_, i) => ({
  angle: (i * 30) * (Math.PI / 180),
  radius: 140,
  delay: i * 0.1,
  size: i % 3 === 0 ? 8 : 4,
}));

export default function StartupHeroGraphic() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
      {/* Background glow effects */}
      <motion.div
        className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary glow */}
      <motion.div
        className="absolute w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full bg-gradient-to-tr from-accent/40 via-accent/10 to-transparent blur-2xl"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Central rocket with pulse */}
      <motion.div
        className="absolute z-20"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="relative"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Rocket glow ring */}
          <motion.div
            className="absolute inset-0 -m-8 rounded-full bg-primary/20"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          
          {/* Main rocket container */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-2xl shadow-primary/30">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-white/20"
            />
            <Rocket className="w-12 h-12 md:w-16 md:h-16 text-white" />
          </div>
          
          {/* Rocket trail */}
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-8 h-16"
            animate={{ opacity: [0.8, 0.4, 0.8], scaleY: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-full h-full bg-gradient-to-b from-orange-500/60 via-yellow-500/40 to-transparent rounded-full blur-sm" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Orbiting dots */}
      <div className="absolute w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
        {orbitingDots.map((dot, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-primary"
            style={{
              width: dot.size,
              height: dot.size,
              left: '50%',
              top: '50%',
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              x: Math.cos(dot.angle) * dot.radius - dot.size / 2,
              y: Math.sin(dot.angle) * dot.radius - dot.size / 2,
            }}
            transition={{
              opacity: { duration: 2, repeat: Infinity, delay: dot.delay },
              x: { duration: 0 },
              y: { duration: 0 },
            }}
          />
        ))}
        
        {/* Rotating orbit ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-full border border-dashed border-primary/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating icons */}
      {floatingIcons.map(({ Icon, x, y, delay, size, color }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: `${x}%`, top: `${y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.8, type: "spring" }}
        >
          <motion.div
            className={`p-2 md:p-3 rounded-xl bg-card/80 backdrop-blur-sm border border-border shadow-lg ${color}`}
            animate={{
              y: [-8, 8, -8],
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
            }}
            whileHover={{ scale: 1.2 }}
          >
            <Icon size={size} />
          </motion.div>
        </motion.div>
      ))}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path
          d="M50 50 L70 20 M50 50 L85 45 M50 50 L75 70 M50 50 L55 85 M50 50 L30 75 M50 50 L20 50 M50 50 L35 25 M50 50 L50 10"
          stroke="url(#lineGradient)"
          strokeWidth="0.3"
          fill="none"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1 }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Particle effects */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [-20, 20],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}