import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Scale, BarChart3, Coins, Megaphone, Lightbulb, Users, Handshake, Sparkles, Calendar, MessageSquare, Network, ChevronDown, Rocket, Building2, Trophy, Globe } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StartupHeroGraphic from '@/components/StartupHeroGraphic';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const services = [
  {
    icon: Target,
    title: 'Business Planning & Strategy',
    description: 'We help you set clear goals and develop strategies. Define your startup\'s vision, mission, and values, and outline actionable steps to achieve them.',
  },
  {
    icon: Scale,
    title: 'Legal & Regulatory Compliance',
    description: 'Ensure your business adheres to the laws and regulations of the UAE, staying compliant with all standards and requirements.',
  },
  {
    icon: BarChart3,
    title: 'Market Research & Analysis',
    description: 'Get expert insights to understand your target market, customer behavior, competition, and industry trends to make informed decisions.',
  },
  {
    icon: Coins,
    title: 'Funding & Financial Management',
    description: 'HUB47 connects you with investors, helping secure the funds needed to grow. We support you in managing your resources effectively.',
  },
  {
    icon: Megaphone,
    title: 'Marketing & Branding',
    description: 'Present your product to the right audience with a clear value proposition. Build a strong, recognizable brand that resonates with your customers.',
  },
  {
    icon: Lightbulb,
    title: 'Product Development & Innovation',
    description: 'Develop, test, and refine your products to meet customer needs. We guide you through each stage of product development.',
  },
  {
    icon: Users,
    title: 'Mentoring & Coaching',
    description: 'Receive personalized guidance and feedback from seasoned experts who help you navigate challenges and grow.',
  },
  {
    icon: Handshake,
    title: 'Networking & Partnerships',
    description: 'Build valuable relationships with key players in your industry. We provide the connections and collaborations you need for long-term success.',
  },
];

const successSteps = [
  {
    number: '1',
    icon: Users,
    title: 'Mentorship',
    description: 'Get personalized guidance from industry experts through one-on-one mentorship tailored to your startup\'s unique needs and goals.',
  },
  {
    number: '2',
    icon: MessageSquare,
    title: 'Crafting Your Story',
    description: 'Showcase the innovative mind behind your startup and present your vision with a compelling pitch to investors and partners.',
  },
  {
    number: '3',
    icon: Network,
    title: 'Community',
    description: 'Join a network of founders and connect with investors, enterprises, and fellow startups, all working together to drive innovation.',
  },
  {
    number: '4',
    icon: Calendar,
    title: 'Exclusive Events',
    description: 'Participate in weekly, tailored events ranging from public speaking coaching to expert-led workshops designed to help you succeed.',
  },
];

const stats = [
  { value: '50+', label: 'Startups Launched', icon: Rocket },
  { value: '$2M+', label: 'Funding Raised', icon: Coins },
  { value: '100+', label: 'Mentors & Experts', icon: Users },
  { value: '12', label: 'Week Program', icon: Calendar },
];

const faqs = [
  {
    question: 'What is HUB47 and how can it help my startup?',
    answer: 'HUB47 is a premier startup incubator based in the UAE, specifically designed to help Pakistani entrepreneurs launch and scale their tech startups. We provide comprehensive support including mentorship, funding connections, legal guidance, marketing support, and access to a thriving community of founders and investors.',
  },
  {
    question: 'What are the eligibility criteria for joining HUB47?',
    answer: 'We look for startups with a market-validated product or concept, a committed founding team, and a clear vision for growth. Your startup should have a tech component and demonstrate potential for scalability. We accept applications from all stages, from idea to early-revenue.',
  },
  {
    question: 'How long is the incubation program?',
    answer: 'Our core program runs for 12 weeks, during which you\'ll receive intensive mentorship, participate in workshops, and prepare for investor pitches. After the program, you continue to have access to our network, events, and resources as part of the HUB47 community.',
  },
  {
    question: 'Is there a fee to join HUB47?',
    answer: 'HUB47 offers different membership tiers. Our core incubation program is selective and may involve equity participation. We also offer general membership for access to events, resources, and networking opportunities at various pricing levels.',
  },
  {
    question: 'How do I apply to HUB47?',
    answer: 'You can apply directly through our website by clicking "Register Your Startup". Fill out the application form with details about your startup, team, and vision. Our team will review your application and get back to you within 5-7 business days.',
  },
  {
    question: 'What kind of mentorship does HUB47 provide?',
    answer: 'We provide one-on-one mentorship from industry experts, successful entrepreneurs, and investors. Mentors are matched based on your startup\'s industry, stage, and specific needs. You\'ll have regular sessions covering strategy, product development, fundraising, and growth.',
  },
  {
    question: 'Can HUB47 help me raise funding?',
    answer: 'Yes! One of our core offerings is connecting startups with investors. We prepare you for investor pitches, help refine your pitch deck, and provide direct introductions to our network of angel investors, VCs, and corporate partners.',
  },
  {
    question: 'Where is HUB47 located?',
    answer: 'HUB47 is located in Dubai, UAE at Street 11b, Oud Metha Road, Bur Dubai. We offer both in-person and virtual participation options for founders who are based elsewhere.',
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

export default function Startup() {
  return (
    <>
      <Helmet>
        <title>Startup Program | HUB47 - Turn Your Idea Into a Successful Tech Startup</title>
        <meta name="description" content="Join HUB47's startup program in UAE. Get mentorship, funding connections, legal support, and access to a thriving community of entrepreneurs. Register your startup today." />
        <meta name="keywords" content="startup program UAE, tech startup Dubai, startup incubator, business mentorship, startup funding, entrepreneur community" />
        <link rel="canonical" href="https://hub47.ae/startup" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Startup Program | HUB47" />
        <meta property="og:description" content="Turn your market-validated idea into a successful tech startup with HUB47's comprehensive support program." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hub47.ae/startup" />
        
        {/* Schema.org structured data for FAQs */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          })}
        </script>
        
        {/* Organization schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "HUB47 Startup Program",
            "description": "A comprehensive startup incubator program offering mentorship, funding connections, and business support in the UAE.",
            "url": "https://hub47.ae/startup",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Street 11b, Oud Metha Road",
              "addressLocality": "Dubai",
              "addressCountry": "UAE"
            },
          })}
        </script>
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background overflow-hidden">
        {/* Hero Section - Split Layout */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:min-h-[90vh] lg:flex lg:items-center">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] opacity-50" />
          
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                >
                  <Sparkles className="w-4 h-4" />
                  For Visionary Founders
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-[1.1]"
                >
                  Have a{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">
                    Market-Validated
                  </span>{' '}
                  Idea?
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
                >
                  Most startups fail due to a lack of product-market fit. HUB47 can help you turn your idea into a{' '}
                  <strong className="text-foreground">successful tech startup</strong> in the UAE.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                >
                  <a href="/apply" className="btn-primary group text-base px-8 py-4">
                    Register Your Startup
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a href="/eligibility" className="btn-outline text-base px-8 py-4">
                    Check Eligibility
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
                    <div className="text-2xl font-bold text-foreground">50+</div>
                    <div className="text-sm text-muted-foreground">Startups</div>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-foreground">$2M+</div>
                    <div className="text-sm text-muted-foreground">Raised</div>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-foreground">100+</div>
                    <div className="text-sm text-muted-foreground">Mentors</div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Right: Motion Graphic */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <StartupHeroGraphic />
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
        <section className="py-16 md:py-20 bg-gradient-to-r from-brand-navy via-brand-navy to-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/30 rounded-full blur-[100px]" />
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

        {/* Services Section */}
        <section className="py-20 md:py-28 bg-muted/30 relative">
          <div className="container-hub">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">What We Offer</span>
              <h2 className="text-h2 text-foreground mb-4">
                Success in Business Isn't a Guessing Game
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Your experience as a founder will be unlike anyone else's - but some of the challenges to overcome are the same.
              </p>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {services.map((service, index) => (
                <motion.article
                  key={service.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                    whileHover={{ rotate: 10 }}
                  >
                    <service.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </motion.div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </motion.article>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <a href="/apply" className="btn-primary">
                Register Your Startup
              </a>
            </motion.div>
          </div>
        </section>

        {/* How We Help Section */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
          
          <div className="container-hub relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">Our Process</span>
              <h2 className="text-h2 text-foreground mb-4">
                How We Help Entrepreneurs Succeed
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-3xl mx-auto">
                The dynamics of the UAE offer Pakistan's Startups a chance to make an impact with their innovative Story.
              </p>
            </motion.div>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {successSteps.map((step, index) => (
                <motion.article
                  key={step.title}
                  variants={itemVariants}
                  className="relative text-center group"
                >
                  {/* Connection Line */}
                  {index < successSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-[60%] w-[calc(100%-20%)] h-px bg-gradient-to-r from-primary/30 to-primary/10" />
                  )}
                  
                  <motion.div
                    className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mb-6"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-lg">
                      {step.number}
                    </span>
                    <step.icon className="w-10 h-10 text-primary" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28 bg-gradient-to-br from-brand-navy via-brand-navy to-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/30 rounded-full blur-[80px]" />
          </div>
          
          <div className="container-hub relative text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-h2 text-white mb-4">
                Let's Hear Your Big Idea!
              </h2>
              <p className="text-body-lg text-white/80 max-w-2xl mx-auto mb-8">
                Ready to scale in the UAE? Join HUB47 and unlock the transformative power of our ecosystem.
              </p>
              <motion.a
                href="/apply"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-navy font-semibold rounded-full hover:bg-white/90 transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Register Your Startup
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-20 md:py-28 bg-background relative">
          <div className="container-hub">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">Got Questions?</span>
              <h2 className="text-h2 text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to know about joining HUB47 and our startup program.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30 transition-colors"
                  >
                    <AccordionTrigger className="text-left text-foreground font-medium hover:text-primary py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <a href="/contact" className="btn-outline">
                Contact Us
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}