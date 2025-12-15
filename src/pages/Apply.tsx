import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Rocket,
  Building2,
  DollarSign,
  Package,
  Target,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  Sparkles,
  Users,
  Globe,
  Mail,
  Phone,
  User,
  FileText,
  Briefcase,
  TrendingUp,
  Star,
  X,
  File,
  Loader2
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  // Basic Information
  startupName: z.string().min(2, 'Startup name is required').max(100),
  contactPerson: z.string().min(2, 'Contact person name is required').max(100),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(8, 'Phone number is required').max(20),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  
  // Startup Details
  businessModel: z.string().min(20, 'Please describe your business model (min 20 characters)').max(1000),
  startupStage: z.string().min(1, 'Please select your startup stage'),
  dateEstablished: z.string().min(1, 'Please enter establishment date'),
  numberOfEmployees: z.string().min(1, 'Please select number of employees'),
  numberOfFounders: z.string().min(1, 'Please select number of founders'),
  
  // Funding Information
  fundingStage: z.string().min(1, 'Please select funding stage'),
  fundingRequired: z.string().optional(),
  annualRevenue: z.string().optional(),
  financialSummary: z.string().max(500).optional(),
  
  // Product/Service Information
  productDescription: z.string().min(20, 'Please describe your product/service (min 20 characters)').max(1000),
  valueProposition: z.string().min(10, 'Please describe your unique value proposition').max(500),
  keyCompetitors: z.string().max(300).optional(),
  customerBase: z.string().max(300).optional(),
  targetMarket: z.string().min(10, 'Please describe your target market').max(500),
  
  // Additional Information
  acceleratorExperience: z.string().max(500).optional(),
  goals: z.string().min(20, 'Please describe your goals (min 20 characters)').max(1000),
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms'),
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
  {
    id: 'basic',
    title: 'Basic Information',
    description: 'Tell us about your startup and contact details',
    icon: Building2,
  },
  {
    id: 'details',
    title: 'Startup Details',
    description: 'Share your business model and team size',
    icon: Users,
  },
  {
    id: 'funding',
    title: 'Funding & Financials',
    description: 'Your funding stage and financial overview',
    icon: DollarSign,
  },
  {
    id: 'product',
    title: 'Product & Market',
    description: 'Your product, value proposition, and target market',
    icon: Package,
  },
  {
    id: 'goals',
    title: 'Goals & Submit',
    description: 'Your goals and final submission',
    icon: Target,
  },
];

const startupStages = [
  'Idea Stage',
  'MVP/Prototype',
  'Early Traction',
  'Growth Stage',
  'Scaling',
];

const fundingStages = [
  'Pre-seed',
  'Seed',
  'Series A',
  'Series B+',
  'Bootstrapped',
  'Not Seeking Funding',
];

const employeeRanges = ['1-5', '6-10', '11-25', '26-50', '51-100', '100+'];
const founderCounts = ['1', '2', '3', '4', '5+'];

interface UploadedFile {
  file: File;
  name: string;
  size: string;
}

export default function Apply() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pitchDeck, setPitchDeck] = useState<UploadedFile | null>(null);
  const [businessPlan, setBusinessPlan] = useState<UploadedFile | null>(null);
  const pitchDeckRef = useRef<HTMLInputElement>(null);
  const businessPlanRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<UploadedFile | null>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      // Validate file type
      const validTypes = ['application/pdf', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF, PowerPoint, or Word document');
        return;
      }
      setter({
        file,
        name: file.name,
        size: formatFileSize(file.size),
      });
    }
  };

  const removeFile = (setter: React.Dispatch<React.SetStateAction<UploadedFile | null>>) => {
    setter(null);
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startupName: '',
      contactPerson: '',
      email: '',
      phone: '',
      website: '',
      businessModel: '',
      startupStage: '',
      dateEstablished: '',
      numberOfEmployees: '',
      numberOfFounders: '',
      fundingStage: '',
      fundingRequired: '',
      annualRevenue: '',
      financialSummary: '',
      productDescription: '',
      valueProposition: '',
      keyCompetitors: '',
      customerBase: '',
      targetMarket: '',
      acceleratorExperience: '',
      goals: '',
      termsAccepted: false,
    },
    mode: 'onChange',
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    
    switch (currentStep) {
      case 0:
        fieldsToValidate = ['startupName', 'contactPerson', 'email', 'phone'];
        break;
      case 1:
        fieldsToValidate = ['businessModel', 'startupStage', 'dateEstablished', 'numberOfEmployees', 'numberOfFounders'];
        break;
      case 2:
        fieldsToValidate = ['fundingStage'];
        break;
      case 3:
        fieldsToValidate = ['productDescription', 'valueProposition', 'targetMarket'];
        break;
      case 4:
        fieldsToValidate = ['goals', 'termsAccepted'];
        break;
    }
    
    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const StepIndicator = () => (
    <div className="hidden md:flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        
        return (
          <div key={step.id} className="flex items-center">
            <motion.div
              className={`relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                isCompleted
                  ? 'bg-primary border-primary'
                  : isCurrent
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-muted'
              }`}
              animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0, repeatDelay: 2 }}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
              ) : (
                <Icon className={`w-5 h-5 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`} />
              )}
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  animate={{ scale: [1, 1.2], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 lg:w-24 h-0.5 mx-2 transition-colors ${
                  isCompleted ? 'bg-primary' : 'bg-border'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderStepContent = () => {
    const currentStepData = steps[currentStep];
    
    return (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Step Header */}
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <currentStepData.icon className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            {currentStepData.title}
          </h2>
          <p className="text-muted-foreground">{currentStepData.description}</p>
        </div>

        {/* Step Content */}
        {currentStep === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="startupName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    Startup Name *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your startup name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Contact Person *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email Address *
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="hello@startup.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone Number *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="+971 XX XXX XXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    Website URL (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourstartup.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="businessModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Business Model Description *
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your business model, how you generate revenue, and your value chain..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startupStage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-primary" />
                      Startup Stage *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {startupStages.map(stage => (
                          <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateEstablished"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Date of Establishment *
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfEmployees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Number of Employees *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employeeRanges.map(range => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfFounders"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary" />
                      Number of Founders *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select count" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {founderCounts.map(count => (
                          <SelectItem key={count} value={count}>{count}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fundingStage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      Funding Stage *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select funding stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fundingStages.map(stage => (
                          <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fundingRequired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      Funding Required (if applicable)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="$100,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="annualRevenue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-primary" />
                      Annual Revenue (if applicable)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="$50,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="financialSummary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Brief Financial Summary
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide a brief overview of your financial status, runway, and key metrics..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    Description of Product/Service *
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your product or service, key features, and how it works..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="valueProposition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Unique Value Proposition *
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="What makes your solution unique?"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keyCompetitors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Key Competitors
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List your main competitors..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="customerBase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      Current Customer Base
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Number of users/customers" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetMarket"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      Target Market Description *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="B2B SaaS, SMEs in UAE..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="acceleratorExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-primary" />
                    Previous Accelerator/Incubator Experience
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List any accelerator or incubator programs you've participated in..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" />
                    Goals for Joining the Accelerator *
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What do you hope to achieve by joining HUB47? What specific support are you looking for?"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Uploads Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Supporting Documents
              </h3>
              <p className="text-sm text-muted-foreground">
                Upload your pitch deck and business plan (PDF, PPT, or DOC, max 10MB each)
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pitch Deck Upload */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="w-4 h-4 text-primary" />
                    Pitch Deck
                  </Label>
                  <input
                    ref={pitchDeckRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.ppt,.pptx,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, setPitchDeck)}
                  />
                  {pitchDeck ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative flex items-center gap-3 p-4 rounded-xl border border-primary/30 bg-primary/5"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <File className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {pitchDeck.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{pitchDeck.size}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(setPitchDeck)}
                        className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={() => pitchDeckRef.current?.click()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-6 rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/30 hover:bg-muted/50 transition-all group"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          Click to upload pitch deck
                        </span>
                      </div>
                    </motion.button>
                  )}
                </div>

                {/* Business Plan Upload */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Business Plan
                  </Label>
                  <input
                    ref={businessPlanRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.ppt,.pptx,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, setBusinessPlan)}
                  />
                  {businessPlan ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative flex items-center gap-3 p-4 rounded-xl border border-primary/30 bg-primary/5"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <File className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {businessPlan.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{businessPlan.size}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(setBusinessPlan)}
                        className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={() => businessPlanRef.current?.click()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full p-6 rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/30 hover:bg-muted/50 transition-all group"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          Click to upload business plan
                        </span>
                      </div>
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Terms and Conditions */}
            <div className="bg-muted/50 rounded-xl p-6 border border-border">
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal leading-relaxed">
                        I hereby declare that I have read and understood the terms and conditions of this application. 
                        I agree to provide accurate and complete information to the best of my knowledge. 
                        I understand that any false or misleading information provided by me may result in the rejection of my application.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Apply Now | HUB47 - Startup Application Form</title>
        <meta name="description" content="Apply to join HUB47's startup accelerator program. Submit your startup details and take the first step towards scaling your business in the UAE." />
        <meta name="keywords" content="startup application, HUB47 apply, accelerator program, UAE startup, Pakistani entrepreneur" />
        <link rel="canonical" href="https://hub47.ae/apply" />
        
        <meta property="og:title" content="Apply to HUB47 Accelerator | Startup Application" />
        <meta property="og:description" content="Submit your startup application to HUB47 and access funding, mentorship, and growth opportunities in the UAE." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hub47.ae/apply" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "HUB47 Startup Application",
            "description": "Apply to HUB47 startup accelerator program",
            "url": "https://hub47.ae/apply",
            "mainEntity": {
              "@type": "Organization",
              "name": "HUB47",
              "description": "Startup accelerator for Pakistani tech startups in UAE"
            }
          })}
        </script>
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-24 pb-8 md:pt-32 md:pb-12">
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
                <Rocket className="w-4 h-4" />
                Startup Application
              </motion.span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                Launch Your Journey with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  HUB47
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Complete the application form below to join our accelerator program
              </p>
            </motion.div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-8 md:py-12">
          <div className="container-hub">
            <div className="max-w-4xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <span className="text-primary font-medium">{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Step Indicators */}
              <StepIndicator />

              {/* Form Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl"
              >
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <AnimatePresence mode="wait">
                      {renderStepContent()}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                      </Button>

                      {currentStep < steps.length - 1 ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          className="btn-primary gap-2"
                        >
                          Next Step
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="btn-primary gap-2 min-w-[180px]"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <motion.div
                              className="flex items-center gap-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Submitting...</span>
                            </motion.div>
                          ) : (
                            <>
                              Submit Application
                              <Rocket className="w-4 h-4" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </motion.div>

              {/* Mobile Step Info */}
              <div className="md:hidden mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {steps[currentStep].title}: {steps[currentStep].description}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0">
          <div className="relative bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 md:p-12">
            {/* Animated background elements */}
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full blur-[60px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-[50px]"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />

            <div className="relative text-center">
              {/* Animated Success Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="relative inline-block mb-6"
              >
                <motion.div
                  className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <CheckCircle2 className="w-12 h-12 text-primary" />
                  </motion.div>
                </motion.div>
                
                {/* Orbiting stars */}
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3"
                    style={{
                      top: '50%',
                      left: '50%',
                    }}
                    animate={{
                      x: [0, Math.cos((i * Math.PI) / 2) * 60],
                      y: [0, Math.sin((i * Math.PI) / 2) * 60],
                      opacity: [0, 1, 1, 0],
                      scale: [0.5, 1, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-accent" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Thank You Text */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4"
              >
                Application Submitted!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground mb-6"
              >
                Thank you for applying to HUB47! Our team will review your application and get back to you within 5-7 business days.
              </motion.p>

              {/* What's Next Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-background/50 rounded-xl p-4 mb-6 text-left"
              >
                <h3 className="font-semibold text-foreground mb-3 text-sm">What happens next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Application review by our selection committee
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Discovery call invitation if shortlisted
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    Pitch session with the HUB47 team
                  </li>
                </ul>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="gap-2"
                >
                  Back to Home
                </Button>
                <Button
                  onClick={() => window.location.href = '/startup'}
                  className="btn-primary gap-2"
                >
                  Explore Programs
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
