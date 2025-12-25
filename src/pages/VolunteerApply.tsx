import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addVolunteer, uploadVolunteerFile } from "@/services/volunteerApi";




import {
  Heart,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Linkedin,
  Clock,
  Target,
  MessageSquare,
  Languages,
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  FileText,
  Users,
  X,
  File,
  Loader2,
  Image,
  CreditCard
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
  // Personal Information
  fullName: z.string().min(2, 'Full name is required').max(100),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(8, 'Phone number is required').max(20),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  currentLocation: z.string().min(2, 'Current location is required').max(100),
  emiratesIdNumber: z.string().optional(),
  
  // Background Information
  occupation: z.string().min(1, 'Please select your occupation'),
  education: z.string().min(1, 'Please select your educational background'),
  linkedinUrl: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  
  // Volunteering Preferences
  areaOfInterest: z.string().min(1, 'Please select your area of interest'),
  previousExperience: z.string().max(500).optional(),
  
  // Availability and Commitment
  availability: z.string().min(1, 'Please select your availability'),
  timePeriod: z.string().min(1, 'Please select time period'),
  startDate: z.string().min(1, 'Please select start date availability'),
  
  // Skills and Expertise
  skills: z.string().min(5, 'Please list your relevant skills').max(500),
  languages: z.string().min(2, 'Please list languages you speak').max(200),
  
  // Motivation and Expectations
  reasonForVolunteering: z.string().min(20, 'Please explain your motivation (min 20 characters)').max(1000),
  expectations: z.string().min(20, 'Please share what you hope to gain (min 20 characters)').max(1000),
  
  // Additional Information
  specialRequirements: z.string().max(500).optional(),
  reference1: z.string().min(5, 'Please provide reference 1 details').max(300),
  reference2: z.string().max(300).optional(),
  
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms'),
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Tell us about yourself',
    icon: User,
  },
  {
    id: 'background',
    title: 'Background & Preferences',
    description: 'Your experience and interests',
    icon: Briefcase,
  },
  {
    id: 'availability',
    title: 'Availability & Skills',
    description: 'Your time and expertise',
    icon: Clock,
  },
  {
    id: 'motivation',
    title: 'Motivation & References',
    description: 'Why you want to volunteer',
    icon: Heart,
  },
  {
    id: 'documents',
    title: 'Documents & Submit',
    description: 'Upload files and submit',
    icon: FileText,
  },
];

const occupations = [
  'Student',
  'Fresh Graduate',
  'Professional (1-3 years)',
  'Mid-Level Professional (4-7 years)',
  'Senior Professional (8+ years)',
  'Entrepreneur',
  'Retired Professional',
  'Other',
];

const educationLevels = [
  'High School',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD/Doctorate',
  'Professional Certification',
  'Other',
];

const areasOfInterest = [
  'Business Coaching',
  'Marketing & Outreach',
  'Program Development',
  'Mentorship',
  'Event Coordination',
  'Technical Advising',
  'Legal/Finance Advisory',
  'Content Creation',
  'Community Management',
];

const availabilityOptions = [
  'Weekdays Only',
  'Weekends Only',
  'Both Weekdays & Weekends',
  'Flexible',
];

const timePeriodOptions = [
  '3 Months',
  '6 Months',
  '1 Year',
  'Long-term (1+ Year)',
  'Project-based',
];

interface UploadedFile {
  file: File;
  name: string;
  size: string;
}

export default function VolunteerApply() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePicture, setProfilePicture] = useState<UploadedFile | null>(null);
  const [emiratesIdFront, setEmiratesIdFront] = useState<UploadedFile | null>(null);
  const [emiratesIdBack, setEmiratesIdBack] = useState<UploadedFile | null>(null);
  const [resume, setResume] = useState<UploadedFile | null>(null);
  const [coverLetter, setCoverLetter] = useState<UploadedFile | null>(null);
  
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const emiratesIdFrontRef = useRef<HTMLInputElement>(null);
  const emiratesIdBackRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);
  const coverLetterRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<UploadedFile | null>>,
    maxSizeMB: number = 5,
    acceptedTypes?: string[]
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File size must be less than ${maxSizeMB}MB`);
        return;
      }
      if (acceptedTypes && !acceptedTypes.some(type => file.type.includes(type))) {
        alert('Invalid file type');
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
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      currentLocation: '',
      emiratesIdNumber: '',
      occupation: '',
      education: '',
      linkedinUrl: '',
      areaOfInterest: '',
      previousExperience: '',
      availability: '',
      timePeriod: '',
      startDate: '',
      skills: '',
      languages: '',
      reasonForVolunteering: '',
      expectations: '',
      specialRequirements: '',
      reference1: '',
      reference2: '',
      termsAccepted: false,
    },
    mode: 'onChange',
  });

  const progress = ((currentStep + 1) / steps.length) * 100;

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    
    switch (currentStep) {
      case 0:
        fieldsToValidate = ['fullName', 'email', 'phone', 'dateOfBirth', 'currentLocation'];
        break;
      case 1:
        fieldsToValidate = ['occupation', 'education', 'areaOfInterest'];
        break;
      case 2:
        fieldsToValidate = ['availability', 'timePeriod', 'startDate', 'skills', 'languages'];
        break;
      case 3:
        fieldsToValidate = ['reasonForVolunteering', 'expectations', 'reference1'];
        break;
      case 4:
        fieldsToValidate = ['termsAccepted'];
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

  // const onSubmit = async (data: FormValues) => {
  //   setIsSubmitting(true);
  //   await new Promise(resolve => setTimeout(resolve, 2000));
  //   console.log('Volunteer Form submitted:', data);
  //   setIsSubmitting(false);
  //   setShowSuccess(true);
  // };
   
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
  
      // 🔹 STEP 1: Create Volunteer (JSON only)
      const payload = {
        ID: 0,
        Status: "Pending",
  
        Name: data.fullName,
        Email: data.email,
        PhoneNo: data.phone,
        Dateofbirth: data.dateOfBirth,
        Currentcity: data.currentLocation,
        CurrentRole: data.occupation,
        Education: data.education,
        Linkinprofilelink: data.linkedinUrl || "",
        AreaofInterest: data.areaOfInterest,
        Volunteeringexperience: data.previousExperience || "",
        Availability: data.availability,
        TimePeriodVolunteering: data.timePeriod,
        StartDateAvailability: data.startDate,
        Skills: data.skills,
        LanguageSpoken: data.languages,
        ReasonforWantingtoVolunteer: data.reasonForVolunteering,
        HopetoGain: data.expectations,
        Considerations: data.specialRequirements || "",
        Reference1: data.reference1,
        Reference2: data.reference2 || "",
        EID: data.emiratesIdNumber || "",
      };
  
      console.log("SUBMIT PAYLOAD:", payload);
  
      const response = await addVolunteer(payload);
      console.log("response",response)
  
      // ⚠️ CONFIRM THIS KEY FROM BACKEND
      const volunteerId = response?.Id
      if (!volunteerId) {
        throw new Error("Volunteer ID not returned from API");
      }
  
      console.log("Volunteeer ID",volunteerId,profilePicture)
      // 🔹 STEP 2: Upload Files (multipart)
      const uploadPromises = [];
  
      if (profilePicture?.file) {
        uploadPromises.push(
          uploadVolunteerFile({
            volunteerId,
            file: profilePicture.file,
            // profile image → NO fileSubtype
            fileSubtype: "profileimage",
          })
        );
      }
  
      if (emiratesIdFront?.file) {
        uploadPromises.push(
          uploadVolunteerFile({
            volunteerId,
            file: emiratesIdFront.file,
            fileSubtype: "eidfrontimage",
          })
        );
      }
  
      if (emiratesIdBack?.file) {
        uploadPromises.push(
          uploadVolunteerFile({
            volunteerId,
            file: emiratesIdBack.file,
            fileSubtype: "eidbackimage",
          })
        );
      }
  
     
  
      // Upload all files in parallel
      if (uploadPromises.length > 0) {
        await Promise.all(uploadPromises);
      }
  
      console.log("SUCCESS: Volunteer + files uploaded");
      setShowSuccess(true);
      form.reset();
  
    } catch (error) {
      console.error("API ERROR FULL:", error?.response?.data || error);
      alert("Backend error — console check کریں");
    } finally {
      setIsSubmitting(false);
    }
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
                  ? 'bg-accent border-accent'
                  : isCurrent
                  ? 'border-accent bg-accent/10'
                  : 'border-border bg-muted'
              }`}
              animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5, repeat: isCurrent ? Infinity : 0, repeatDelay: 2 }}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-6 h-6 text-accent-foreground" />
              ) : (
                <Icon className={`w-5 h-5 ${isCurrent ? 'text-accent' : 'text-muted-foreground'}`} />
              )}
              {isCurrent && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-accent"
                  animate={{ scale: [1, 1.2], opacity: [1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 lg:w-24 h-0.5 mx-2 transition-colors ${
                  isCompleted ? 'bg-accent' : 'bg-border'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  const FileUploadBox = ({
    label,
    icon: Icon,
    file,
    inputRef,
    onUpload,
    onRemove,
    accept,
    maxSize = 5,
  }: {
    label: string;
    icon: React.ElementType;
    file: UploadedFile | null;
    inputRef: React.RefObject<HTMLInputElement>;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
    accept: string;
    maxSize?: number;
  }) => (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-sm font-medium">
        <Icon className="w-4 h-4 text-accent" />
        {label}
      </Label>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        onChange={onUpload}
      />
      {file ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative flex items-center gap-3 p-4 rounded-xl border border-accent/30 bg-accent/5"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <File className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{file.size}</p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      ) : (
        <motion.button
          type="button"
          onClick={() => inputRef.current?.click()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full p-6 rounded-xl border-2 border-dashed border-border hover:border-accent/50 bg-muted/30 hover:bg-muted/50 transition-all group"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5 text-accent" />
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              Click to upload
            </span>
            <span className="text-xs text-muted-foreground">Max {maxSize}MB</span>
          </div>
        </motion.button>
      )}
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
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <currentStepData.icon className="w-8 h-8 text-accent" />
          </motion.div>
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            {currentStepData.title}
          </h2>
          <p className="text-muted-foreground">{currentStepData.description}</p>
        </div>

        {/* Step 1: Personal Information */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="w-4 h-4 text-accent" />
                      Full Name *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
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
                      <Mail className="w-4 h-4 text-accent" />
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
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
                      <Phone className="w-4 h-4 text-accent" />
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
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      Date of Birth *
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
                name="currentLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      Current Location (City, Country) *
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Dubai, UAE" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emiratesIdNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-accent" />
                      Emirates ID Number
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="784-XXXX-XXXXXXX-X" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Profile Picture & Emirates ID Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <FileUploadBox
                label="Profile Picture *"
                icon={Image}
                file={profilePicture}
                inputRef={profilePictureRef}
                onUpload={(e) => handleFileUpload(e, setProfilePicture, 5, ['image'])}
                onRemove={() => removeFile(setProfilePicture)}
                accept="image/*"
              />
              <FileUploadBox
                label="Emirates ID Front *"
                icon={CreditCard}
                file={emiratesIdFront}
                inputRef={emiratesIdFrontRef}
                onUpload={(e) => handleFileUpload(e, setEmiratesIdFront, 5, ['image', 'pdf'])}
                onRemove={() => removeFile(setEmiratesIdFront)}
                accept="image/*,.pdf"
              />
              <FileUploadBox
                label="Emirates ID Back *"
                icon={CreditCard}
                file={emiratesIdBack}
                inputRef={emiratesIdBackRef}
                onUpload={(e) => handleFileUpload(e, setEmiratesIdBack, 5, ['image', 'pdf'])}
                onRemove={() => removeFile(setEmiratesIdBack)}
                accept="image/*,.pdf"
              />
            </div>
          </div>
        )}

        {/* Step 2: Background & Preferences */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-accent" />
                      Current Occupation/Role *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select occupation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {occupations.map(occ => (
                          <SelectItem key={occ} value={occ}>{occ}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-accent" />
                      Educational Background *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select education" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {educationLevels.map(edu => (
                          <SelectItem key={edu} value={edu}>{edu}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-accent" />
                    LinkedIn Profile URL
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="areaOfInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-accent" />
                    Area of Interest *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select area of interest" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areasOfInterest.map(area => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previousExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-accent" />
                    Previous Volunteering Experience
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Briefly describe any previous volunteering experience..."
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

        {/* Step 3: Availability & Skills */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      Availability *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select availability" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availabilityOptions.map(opt => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timePeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      Time Period *
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timePeriodOptions.map(opt => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      Start Date Availability *
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    Relevant Skills and Expertise *
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g., Graphic Design, Data Analysis, Public Speaking, Project Management..."
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
              name="languages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-accent" />
                    Languages Spoken *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="English, Arabic, Urdu..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Step 4: Motivation & References */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="reasonForVolunteering"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-accent" />
                    Reason for Wanting to Volunteer at HUB47 *
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us why you want to volunteer at HUB47..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expectations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-accent" />
                    What Do You Hope to Gain from Your Volunteering Experience? *
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your expectations and what you hope to learn or achieve..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialRequirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-accent" />
                    Any Special Requirements or Considerations
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="e.g., accessibility needs, schedule constraints..."
                      className="min-h-[80px]"
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
                name="reference1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      Reference 1 *
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Name, Relationship, Contact Information"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reference2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      Reference 2 (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Name, Relationship, Contact Information"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* Step 5: Documents & Submit */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Upload className="w-5 h-5 text-accent" />
                Optional Uploads
              </h3>
              <p className="text-sm text-muted-foreground">
                Upload your resume/CV and cover letter (PDF or DOC, max 5MB each)
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUploadBox
                  label="Resume/CV"
                  icon={FileText}
                  file={resume}
                  inputRef={resumeRef}
                  onUpload={(e) => handleFileUpload(e, setResume, 5, ['pdf', 'word', 'document'])}
                  onRemove={() => removeFile(setResume)}
                  accept=".pdf,.doc,.docx"
                />
                <FileUploadBox
                  label="Cover Letter (Optional)"
                  icon={FileText}
                  file={coverLetter}
                  inputRef={coverLetterRef}
                  onUpload={(e) => handleFileUpload(e, setCoverLetter, 5, ['pdf', 'word', 'document'])}
                  onRemove={() => removeFile(setCoverLetter)}
                  accept=".pdf,.doc,.docx"
                />
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
                        I hereby declare that I have read and understood the terms and conditions of this online form. 
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
        <title>Volunteer Application | HUB47 - Join Our Community</title>
        <meta name="description" content="Apply to become a volunteer at HUB47. Share your expertise, mentor startups, and be part of our vibrant entrepreneurial community in the UAE." />
        <meta name="keywords" content="volunteer application, HUB47 volunteer, mentorship, startup community, UAE volunteer" />
        <link rel="canonical" href="https://hub47.ae/volunteer/apply" />
        
        <meta property="og:title" content="Volunteer Application | HUB47" />
        <meta property="og:description" content="Apply to become a volunteer at HUB47 and make an impact in the startup ecosystem." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hub47.ae/volunteer/apply" />
      </Helmet>

      <Navbar />
      
      <main className="min-h-screen bg-background overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-24 pb-8 md:pt-32 md:pb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px] opacity-50" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] opacity-40" />
          
          <div className="container-hub relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6"
              >
                <Heart className="w-4 h-4" />
                Volunteer Application
              </motion.span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                Join the{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                  HUB47 Community
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Complete the application form below to become a volunteer
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
                  <span className="text-accent font-medium">{Math.round(progress)}% Complete</span>
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
                              <Heart className="w-4 h-4" />
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
          <div className="relative bg-gradient-to-br from-accent/10 via-card to-primary/10 p-8 md:p-12">
            {/* Animated background elements */}
            <motion.div
              className="absolute top-0 right-0 w-40 h-40 bg-accent/20 rounded-full blur-[60px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px]"
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
                  className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    <CheckCircle2 className="w-12 h-12 text-accent" />
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
                    <Sparkles className="w-3 h-3 text-primary" />
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
                Thank you for applying to volunteer at HUB47! Our team will review your application and get back to you within 5-7 business days.
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
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    Application review by our volunteer coordination team
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    Brief interview or orientation call
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    Onboarding and role assignment
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
                  onClick={() => window.location.href = '/volunteer'}
                  className="btn-primary gap-2"
                >
                  Explore Volunteer Programs
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
