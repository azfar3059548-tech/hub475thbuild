import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft,
  Rocket, 
  Users, 
  Globe, 
  Target, 
  Lightbulb,
  Building2,
  FileCheck,
  Sparkles,
  ChevronDown,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: string;
  question: string;
  description: string;
  icon: typeof Rocket;
  options: {
    label: string;
    value: 'yes' | 'no' | 'partial';
    weight: number;
  }[];
  criteria: string;
}

const eligibilityQuestions: Question[] = [
  {
    id: 'tech-based',
    question: 'Is your startup technology-based?',
    description: 'Your technology should create a competitive advantage with tech-driven service delivery.',
    icon: Lightbulb,
    criteria: 'Technology-based startup with competitive advantage',
    options: [
      { label: 'Yes, core tech product/service', value: 'yes', weight: 15 },
      { label: 'Partially tech-enabled', value: 'partial', weight: 8 },
      { label: 'Not technology-focused', value: 'no', weight: 0 },
    ],
  },
  {
    id: 'customer-validation',
    question: 'Have you validated with customers?',
    description: 'Customer validation shows you understand your market and have tested your assumptions.',
    icon: Users,
    criteria: 'Customer validation completed at some level',
    options: [
      { label: 'Yes, paying customers', value: 'yes', weight: 15 },
      { label: 'Some feedback/testing done', value: 'partial', weight: 8 },
      { label: 'No validation yet', value: 'no', weight: 0 },
    ],
  },
  {
    id: 'financial-projections',
    question: 'Do you have financial projections?',
    description: 'Preliminary financial projections help plan your growth trajectory.',
    icon: Target,
    criteria: 'Preliminary financial projections prepared',
    options: [
      { label: 'Yes, detailed projections', value: 'yes', weight: 10 },
      { label: 'Basic estimates ready', value: 'partial', weight: 5 },
      { label: 'Not prepared yet', value: 'no', weight: 0 },
    ],
  },
  {
    id: 'core-team',
    question: 'Do you have a strong core team?',
    description: 'Key positions filled with leadership capabilities and dedication.',
    icon: Users,
    criteria: 'Strong core team with key positions filled',
    options: [
      { label: 'Yes, complete team', value: 'yes', weight: 15 },
      { label: 'Founding team only', value: 'partial', weight: 8 },
      { label: 'Solo founder', value: 'no', weight: 3 },
    ],
  },
  {
    id: 'product-market-fit',
    question: 'Is there a clear product-market fit?',
    description: 'Your product should address a real problem or need in the market.',
    icon: Rocket,
    criteria: 'Clear product-market fit addressing real needs',
    options: [
      { label: 'Yes, proven demand', value: 'yes', weight: 15 },
      { label: 'Strong hypothesis', value: 'partial', weight: 8 },
      { label: 'Still exploring', value: 'no', weight: 2 },
    ],
  },
  {
    id: 'market-size',
    question: 'Is your target market sizable?',
    description: 'Large/growing market or high-priced niche with growth potential.',
    icon: Globe,
    criteria: 'Target market is large, growing, or high-value niche',
    options: [
      { label: 'Yes, large/growing market', value: 'yes', weight: 10 },
      { label: 'Niche but profitable', value: 'partial', weight: 7 },
      { label: 'Small/uncertain market', value: 'no', weight: 2 },
    ],
  },
  {
    id: 'uae-focus',
    question: 'Is your initial focus on the UAE market?',
    description: 'Startup should initially address needs or opportunities within the UAE.',
    icon: Building2,
    criteria: 'Initial focus on UAE market needs',
    options: [
      { label: 'Yes, UAE-first approach', value: 'yes', weight: 10 },
      { label: 'UAE is one of the markets', value: 'partial', weight: 5 },
      { label: 'Different market focus', value: 'no', weight: 0 },
    ],
  },
  {
    id: 'uae-resident',
    question: 'Is a founder UAE resident?',
    description: 'A founder must be a UAE resident ensuring local connection.',
    icon: FileCheck,
    criteria: 'Founder is UAE resident',
    options: [
      { label: 'Yes, UAE resident', value: 'yes', weight: 5 },
      { label: 'Planning to relocate', value: 'partial', weight: 2 },
      { label: 'Not a resident', value: 'no', weight: 0 },
    ],
  },
  {
    id: 'founder-origin',
    question: 'Is a founder Pakistani-origin or Emirati?',
    description: 'The startup must have a Pakistani-origin or Emirati founder.',
    icon: Users,
    criteria: 'Pakistani-origin or Emirati founder',
    options: [
      { label: 'Yes', value: 'yes', weight: 5 },
      { label: 'Co-founder is', value: 'partial', weight: 3 },
      { label: 'No', value: 'no', weight: 0 },
    ],
  },
];

const applicationSteps = [
  {
    number: '01',
    title: 'Submit Application',
    description: 'Kickstart your journey by submitting the application form through the "Start Your Application" button.',
    icon: FileCheck,
  },
  {
    number: '02',
    title: 'Discovery Call',
    description: 'Expect an invitation for a conversation with the HUB47 team to delve deeper into your startup story.',
    icon: Users,
  },
  {
    number: '03',
    title: 'Pitch Session',
    description: 'Present your vision to our Selection Committee. This is where your startup gets the spotlight it deserves.',
    icon: Rocket,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Eligibility() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, { value: string; weight: number }>>({});

  const totalQuestions = eligibilityQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const calculateScore = () => {
    const maxScore = eligibilityQuestions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.weight)), 0);
    const actualScore = Object.values(answers).reduce((sum, a) => sum + a.weight, 0);
    return Math.round((actualScore / maxScore) * 100);
  };

  const getEligibilityStatus = (score: number) => {
    if (score >= 75) return { status: 'highly-eligible', label: 'Highly Eligible', color: 'text-green-500', bg: 'bg-green-500/10' };
    if (score >= 50) return { status: 'eligible', label: 'Eligible with Conditions', color: 'text-amber-500', bg: 'bg-amber-500/10' };
    return { status: 'needs-work', label: 'Needs Preparation', color: 'text-red-500', bg: 'bg-red-500/10' };
  };

  const getRecommendations = () => {
    const recommendations: { text: string; priority: 'high' | 'medium' | 'low' }[] = [];
    
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = eligibilityQuestions.find(q => q.id === questionId);
      if (!question) return;
      
      if (answer.value === 'no') {
        recommendations.push({
          text: `Focus on: ${question.criteria}`,
          priority: 'high',
        });
      } else if (answer.value === 'partial') {
        recommendations.push({
          text: `Strengthen: ${question.criteria}`,
          priority: 'medium',
        });
      }
    });

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const handleAnswer = (value: string, weight: number) => {
    const question = eligibilityQuestions[currentQuestion];
    setAnswers(prev => ({
      ...prev,
      [question.id]: { value, weight },
    }));

    if (currentQuestion < totalQuestions - 1) {
      setTimeout(() => setCurrentQuestion(prev => prev + 1), 300);
    } else {
      setTimeout(() => setCurrentStep('result'), 300);
    }
  };

  const resetQuiz = () => {
    setCurrentStep('intro');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const score = currentStep === 'result' ? calculateScore() : 0;
  const eligibility = getEligibilityStatus(score);
  const recommendations = currentStep === 'result' ? getRecommendations() : [];

  return (
    <>
      <Helmet>
        <title>Eligibility Criteria | HUB47 - Check If Your Startup Qualifies</title>
        <meta name="description" content="Check if your startup qualifies for HUB47's accelerator program. Take our interactive eligibility assessment and get personalized recommendations." />
        <meta name="keywords" content="startup eligibility, HUB47 accelerator, startup criteria, UAE startup program, Pakistani startup" />
        <link rel="canonical" href="https://hub47.ae/eligibility" />
        
        <meta property="og:title" content="Check Your Startup Eligibility | HUB47" />
        <meta property="og:description" content="Find out if your startup qualifies for HUB47's accelerator program with our interactive assessment tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hub47.ae/eligibility" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "HUB47 Eligibility Checker",
            "description": "Interactive tool to check startup eligibility for HUB47 accelerator program",
            "url": "https://hub47.ae/eligibility",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] opacity-50" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] opacity-40" />
          
          <div className="container-hub relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              >
                <Sparkles className="w-4 h-4" />
                Interactive Assessment
              </motion.span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                Are You{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Eligible
                </span>{' '}
                for HUB47?
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Take our quick eligibility assessment to see if your startup qualifies for our accelerator program and get personalized recommendations.
              </p>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </motion.div>
        </section>

        {/* Interactive Eligibility Checker */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container-hub">
            <AnimatePresence mode="wait">
              {currentStep === 'intro' && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-2xl mx-auto text-center"
                >
                  <div className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-xl">
                    <motion.div
                      className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Rocket className="w-10 h-10 text-primary" />
                    </motion.div>
                    
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                      Ready to Check Your Eligibility?
                    </h2>
                    
                    <p className="text-muted-foreground mb-8">
                      Answer {totalQuestions} quick questions about your startup. It takes less than 2 minutes and you'll get instant results with personalized action items.
                    </p>
                    
                    <Button
                      size="lg"
                      className="btn-primary text-base px-8 py-6"
                      onClick={() => setCurrentStep('quiz')}
                    >
                      Start Assessment
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    
                    <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Free & Instant
                      </span>
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Personalized Results
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 'quiz' && (
                <motion.div
                  key="quiz"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl">
                    {/* Progress */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Question {currentQuestion + 1} of {totalQuestions}</span>
                        <span className="text-primary font-medium">{Math.round(progress)}% Complete</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    {/* Question */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {(() => {
                          const q = eligibilityQuestions[currentQuestion];
                          const Icon = q.icon;
                          return (
                            <>
                              <div className="flex items-start gap-4 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
                                    {q.question}
                                  </h3>
                                  <p className="text-muted-foreground text-sm">{q.description}</p>
                                </div>
                              </div>

                              <div className="space-y-3">
                                {q.options.map((option) => {
                                  const isSelected = answers[q.id]?.value === option.value;
                                  return (
                                    <motion.button
                                      key={option.value}
                                      onClick={() => handleAnswer(option.value, option.weight)}
                                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                                        isSelected
                                          ? 'border-primary bg-primary/5'
                                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                                      }`}
                                      whileHover={{ scale: 1.01 }}
                                      whileTap={{ scale: 0.99 }}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                          isSelected ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                                        }`}>
                                          {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className={`font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                                          {option.label}
                                        </span>
                                      </div>
                                    </motion.button>
                                  );
                                })}
                              </div>
                            </>
                          );
                        })()}
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="mt-8 flex items-center justify-between">
                      <Button
                        variant="ghost"
                        onClick={() => currentQuestion > 0 && setCurrentQuestion(prev => prev - 1)}
                        disabled={currentQuestion === 0}
                        className="text-muted-foreground"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      
                      <div className="flex gap-1.5">
                        {eligibilityQuestions.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              i === currentQuestion 
                                ? 'bg-primary' 
                                : answers[eligibilityQuestions[i].id] 
                                  ? 'bg-primary/40' 
                                  : 'bg-muted'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <div className="w-24" />
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 'result' && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="max-w-4xl mx-auto"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Score Card */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-card rounded-3xl border border-border p-8 shadow-xl"
                    >
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.2 }}
                          className={`w-32 h-32 rounded-full ${eligibility.bg} flex items-center justify-center mx-auto mb-6`}
                        >
                          <span className={`text-5xl font-bold ${eligibility.color}`}>{score}%</span>
                        </motion.div>
                        
                        <h2 className={`text-2xl font-display font-bold ${eligibility.color} mb-2`}>
                          {eligibility.label}
                        </h2>
                        
                        <p className="text-muted-foreground">
                          {score >= 75 
                            ? "Great news! Your startup meets most of our criteria."
                            : score >= 50 
                              ? "You're on the right track but need to address some areas."
                              : "Focus on the recommendations below before applying."}
                        </p>
                        
                        <div className="mt-6 flex flex-col gap-3">
                          {score >= 50 && (
                            <a href="/apply" className="btn-primary w-full justify-center">
                              Start Your Application
                              <ArrowRight className="w-5 h-5 ml-2" />
                            </a>
                          )}
                          <Button variant="outline" onClick={resetQuiz} className="w-full">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Retake Assessment
                          </Button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Recommendations */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-card rounded-3xl border border-border p-8 shadow-xl"
                    >
                      <h3 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-primary" />
                        Recommended Actions
                      </h3>
                      
                      {recommendations.length > 0 ? (
                        <ul className="space-y-3">
                          {recommendations.slice(0, 5).map((rec, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + index * 0.1 }}
                              className={`flex items-start gap-3 p-3 rounded-xl ${
                                rec.priority === 'high' 
                                  ? 'bg-red-500/5 border border-red-500/20'
                                  : 'bg-amber-500/5 border border-amber-500/20'
                              }`}
                            >
                              {rec.priority === 'high' ? (
                                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                              )}
                              <span className="text-sm text-foreground">{rec.text}</span>
                            </motion.li>
                          ))}
                        </ul>
                      ) : (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-foreground">Excellent! You meet all the key criteria.</span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 md:py-24">
          <div className="container-hub">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">
                Application Process
              </span>
              <h2 className="text-h2 text-foreground mb-4">
                Your Journey to HUB47
              </h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to join our accelerator program
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {applicationSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  variants={itemVariants}
                  className="relative"
                >
                  {index < applicationSteps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/20 to-transparent" />
                  )}
                  
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-card rounded-2xl border border-border p-8 text-center relative"
                  >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                      {step.number}
                    </div>
                    
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mt-4 mb-4">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    
                    <h3 className="text-lg font-display font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Eligibility Criteria Grid */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container-hub">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sm font-medium text-primary uppercase tracking-wider mb-4 block">
                Full Criteria
              </span>
              <h2 className="text-h2 text-foreground mb-4">
                What We Look For
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {eligibilityQuestions.map((q) => (
                <motion.div
                  key={q.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <q.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{q.criteria}</h3>
                      <p className="text-sm text-muted-foreground">{q.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <a href="/apply" className="btn-primary inline-flex text-base px-8 py-4">
                Start Your Application
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
