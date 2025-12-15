import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Network, GraduationCap, Users, Sparkles, ChevronDown, Heart, Briefcase, Megaphone, Code, Target, Lightbulb, MessageSquare, Award, Clock, Globe, HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const volunteerBenefits = [
  {
    icon: Network,
    title: 'Expand Your Network',
    description: 'Engage with a diverse community of professionals, entrepreneurs, and innovators, fostering valuable connections and collaborations.',
  },
  {
    icon: GraduationCap,
    title: 'Learn from Experts',
    description: 'Gain insights and knowledge from industry experts, acquiring valuable experience and guidance to bolster your expertise.',
  },
  {
    icon: Users,
    title: 'Meet New People',
    description: 'Connect and collaborate with individuals passionate about fostering innovation and growth within the entrepreneurial ecosystem.',
  },
  {
    icon: Sparkles,
    title: 'Polish Your Skills',
    description: 'Develop and refine your professional abilities while contributing to meaningful projects that make a real impact.',
  },
];

const expertiseAreas = [
  {
    icon: Briefcase,
    title: 'Business Coach',
    description: 'Help entrepreneurs and executives achieve their goals and overcome challenges through strategic guidance.',
    color: 'from-primary to-primary/60',
  },
  {
    icon: Megaphone,
    title: 'Marketing & Outreach',
    description: 'Transform your knowledge of how to promote a brand, product, or service to potential customers.',
    color: 'from-accent to-accent/60',
  },
  {
    icon: Code,
    title: 'Program Development',
    description: 'Guide implementation of projects, initiatives, or programs that support a startup\'s mission and vision.',
    color: 'from-brand-teal to-brand-teal/60',
  },
  {
    icon: Target,
    title: 'Mentorship',
    description: 'Provide guidance, support, and feedback to a less experienced person in the same field or industry.',
    color: 'from-brand-coral to-brand-coral/60',
  },
];

const stats = [
  { value: '100+', label: 'Active Volunteers', icon: Users },
  { value: '500+', label: 'Hours Contributed', icon: Clock },
  { value: '50+', label: 'Startups Helped', icon: Target },
  { value: '15+', label: 'Countries', icon: Globe },
];

const faqs = [
  {
    question: 'What does it mean to volunteer at HUB47?',
    answer: 'Volunteering at HUB47 means contributing your skills, time, and expertise to help startups and entrepreneurs succeed. You can mentor founders, lead workshops, assist with events, or provide specialized guidance in your area of expertise.',
  },
  {
    question: 'How much time do I need to commit as a volunteer?',
    answer: 'We offer flexible volunteering opportunities. You can contribute as little as 2-4 hours per month or take on more involved roles. We work with your schedule to find opportunities that fit your availability.',
  },
  {
    question: 'What skills or experience do I need to volunteer?',
    answer: 'We welcome volunteers from all backgrounds. Whether you have expertise in business, marketing, technology, finance, legal, or any other field, your skills can make a difference. We also value soft skills like communication, leadership, and mentorship.',
  },
  {
    question: 'Are there any benefits to volunteering at HUB47?',
    answer: 'Absolutely! Volunteers gain access to exclusive networking events, professional development opportunities, recognition in our community, and the satisfaction of helping shape the next generation of successful startups. You also get to expand your own network and learn from fellow experts.',
  },
  {
    question: 'Can I volunteer remotely or do I need to be in Dubai?',
    answer: 'We offer both in-person and remote volunteering opportunities. Many of our mentorship and coaching sessions can be conducted virtually, allowing volunteers from around the world to participate.',
  },
  {
    question: 'How do I get started as a volunteer?',
    answer: 'Simply click the "Become a Volunteer" button and fill out our application form. Our team will review your application and match you with opportunities that align with your skills and interests. We typically respond within 5-7 business days.',
  },
  {
    question: 'What types of volunteer roles are available?',
    answer: 'We have various roles including Business Coach, Marketing & Outreach Specialist, Program Development Lead, Mentor, Event Coordinator, and Technical Advisor. You can choose roles that match your expertise and interests.',
  },
  {
    question: 'Is there any training provided for volunteers?',
    answer: 'Yes! We provide onboarding sessions for new volunteers to familiarize them with our programs, tools, and expectations. We also offer ongoing training and resources to help you be more effective in your volunteer role.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Volunteer() {
  return (
    <>
      <Helmet>
        <title>Become a Volunteer | HUB47 - Join Our Vibrant Community</title>
        <meta name="description" content="Join HUB47 as a volunteer and seize the opportunity to expand your network, learn from experts, meet new individuals, and refine your skill set." />
        <meta name="keywords" content="volunteer UAE, startup community, mentorship, business coaching, entrepreneurship, HUB47 volunteer" />
        <link rel="canonical" href="https://hub47.ae/volunteer" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Become a Volunteer | HUB47" />
        <meta property="og:description" content="Accelerate your entrepreneurship journey with HUB47's vibrant community." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hub47.ae/volunteer" />
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:min-h-[90vh] lg:flex lg:items-center">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] opacity-50" />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
          
          <div className="container-hub relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left"
              >
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6"
                >
                  <Heart className="w-4 h-4" />
                  Community Driven
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-[1.1]"
                >
                  Unleash Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent to-primary">
                    True Potential
                  </span>
                </motion.h1>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="text-2xl md:text-3xl font-display font-semibold text-foreground/80 mb-6"
                >
                  Join HUB47's Vibrant Community
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
                >
                  Accelerate your entrepreneurship journey with HUB47's vibrant community. Connect with like-minded innovators and share your expertise to make a lasting impact.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                >
                  <a href="/volunteer/apply" className="btn-primary group text-base px-8 py-4">
                    Become a Volunteer
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="#benefits" className="btn-outline text-base px-8 py-4">
                    Learn More
                  </a>
                </motion.div>
                
                {/* Quick stats under CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-12 flex items-center justify-center lg:justify-start gap-8"
                >
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-foreground">100+</div>
                    <div className="text-sm text-muted-foreground">Volunteers</div>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-foreground">50+</div>
                    <div className="text-sm text-muted-foreground">Startups</div>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-foreground">15+</div>
                    <div className="text-sm text-muted-foreground">Countries</div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Right: Volunteer Graphic */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <VolunteerHeroGraphic />
              </motion.div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-brand-navy via-brand-navy to-accent/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px]" />
          </div>
          
          <div className="container-hub relative">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="text-center group"
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4 group-hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-white mb-1"
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 md:py-28 bg-muted/30 relative">
          <div className="container-hub">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm font-medium text-accent uppercase tracking-wider mb-4 block">Why Volunteer</span>
              <h2 className="text-h2 text-foreground mb-4">
                Make Strong Business Connections
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                At the HUB47 Community Platform
              </p>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {volunteerBenefits.map((benefit, index) => (
                <motion.article
                  key={benefit.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-card rounded-2xl p-6 border border-border hover:border-accent/50 transition-all duration-300 shadow-sm hover:shadow-xl overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative">
                    <motion.div
                      className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors"
                      whileHover={{ rotate: 10 }}
                    >
                      <benefit.icon className="w-7 h-7 text-accent" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Expertise Areas Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
          
          <div className="container-hub relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">Your Expertise</span>
              <h2 className="text-h2 text-foreground mb-4">
                Present Your Professional Expertise
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                HUB47 is a platform for you to showcase and present yourself in a community consisting of people with diverse business backgrounds.
              </p>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl" style={{
                    background: `linear-gradient(135deg, var(--${area.color.split(' ')[0].replace('from-', '')}), transparent)`,
                  }} />
                  
                  <div className="relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-xl flex gap-6">
                    <div className="flex-shrink-0">
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <area.icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary/60 bg-primary/10 px-2 py-1 rounded-full">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="volunteer-form" className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-background" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
          
          <div className="container-hub relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.2 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent to-primary mb-8 shadow-xl"
              >
                <Award className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Become Part of the HUB47{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                  Vibrant Community
                </span>
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join HUB47 as a volunteer and seize the opportunity to expand your network, learn from experts, meet new individuals, and refine your skill set. Take the first step toward an enriching volunteering experience today.
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <a 
                  href="/apply?type=volunteer" 
                  className="btn-primary group text-lg px-10 py-5 shadow-xl hover:shadow-2xl"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Become a Volunteer
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-sm text-muted-foreground"
              >
                Join 100+ volunteers already making an impact
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-20 md:py-28 bg-muted/30 relative">
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }} />
          
          <div className="container-hub relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: 0.1 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 mb-4"
              >
                <HelpCircle className="w-7 h-7 text-accent" />
              </motion.div>
              <h2 className="text-h2 text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about volunteering at HUB47
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <AccordionItem 
                      value={`item-${index}`}
                      className="bg-card border border-border rounded-xl px-6 overflow-hidden hover:border-accent/30 transition-colors"
                    >
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent transition-colors py-5 [&[data-state=open]>svg]:rotate-180">
                        <span className="flex items-center gap-3">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent text-sm font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 pl-11 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12"
            >
              <p className="text-muted-foreground mb-4">
                Still have questions?
              </p>
              <a 
                href="mailto:volunteer@hub47.ae" 
                className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent/80 transition-colors"
              >
                Contact our volunteer team
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// Volunteer Hero Graphic Component
function VolunteerHeroGraphic() {
  const floatingElements = [
    { icon: Heart, delay: 0, x: '10%', y: '20%', size: 'w-12 h-12', color: 'text-red-400' },
    { icon: Users, delay: 0.2, x: '80%', y: '15%', size: 'w-10 h-10', color: 'text-accent' },
    { icon: Lightbulb, delay: 0.4, x: '85%', y: '60%', size: 'w-11 h-11', color: 'text-yellow-400' },
    { icon: MessageSquare, delay: 0.6, x: '15%', y: '70%', size: 'w-10 h-10', color: 'text-primary' },
    { icon: Target, delay: 0.8, x: '75%', y: '85%', size: 'w-9 h-9', color: 'text-brand-teal' },
  ];

  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      {/* Central element */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-primary/40 rounded-full blur-[60px] scale-150" />
        
        {/* Main circle */}
        <motion.div
          className="relative w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-accent via-accent/80 to-primary flex items-center justify-center shadow-2xl"
          animate={{ 
            boxShadow: [
              '0 0 40px rgba(var(--accent), 0.3)',
              '0 0 80px rgba(var(--accent), 0.5)',
              '0 0 40px rgba(var(--accent), 0.3)',
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-2 border-dashed border-white/30"
          />
          <Heart className="w-16 h-16 md:w-20 md:h-20 text-white" />
        </motion.div>
      </motion.div>

      {/* Orbiting rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full border border-accent/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[440px] md:h-[440px] rounded-full border border-primary/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating elements */}
      {floatingElements.map((el, index) => (
        <motion.div
          key={index}
          className={`absolute ${el.size} rounded-xl bg-card shadow-lg flex items-center justify-center border border-border`}
          style={{ left: el.x, top: el.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{ 
            delay: el.delay + 0.5,
            y: { duration: 3, repeat: Infinity, delay: el.delay }
          }}
          whileHover={{ scale: 1.2 }}
        >
          <el.icon className={`w-5 h-5 md:w-6 md:h-6 ${el.color}`} />
        </motion.div>
      ))}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.line
          x1="50%" y1="50%"
          x2="10%" y2="20%"
          stroke="url(#gradient1)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        <motion.line
          x1="50%" y1="50%"
          x2="80%" y2="15%"
          stroke="url(#gradient1)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1, delay: 1 }}
        />
        <motion.line
          x1="50%" y1="50%"
          x2="85%" y2="60%"
          stroke="url(#gradient1)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--accent))" />
            <stop offset="100%" stopColor="hsl(var(--primary))" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
