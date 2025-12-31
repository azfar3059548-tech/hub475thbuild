import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import enevt1 from '@/assets/event1.jpg';
import enevt2 from '@/assets/event2.jpg';
import enevt3 from '@/assets/event3.jpeg';
import enevt4 from '@/assets/event4.jpeg';
import enevt5 from '@/assets/event5.jpeg';
import enevt6 from '@/assets/events12.jpeg';
import enevt7 from '@/assets/Application Process-1st.png';
import enevt8 from '@/assets/Invest-in-incubated-Startups.png';
import {addEvent} from '../services/eventApi'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Globe,
  Tag,
  CheckCircle2,
  ArrowLeft,
  Mic2,
  Building2,
  ListChecks,
  BookOpen,
  Languages,
  Wifi,
  DollarSign,
  Linkedin,
  Twitter,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Mock Event Data - This would come from CMS
const mockEventData = {
  id: 1,
  title: "What Is Ideal Customer Profile (ICP)?",
  category: "Workshop",
  startDate: "04 Jan 2026",
  endDate: "10 Jan 2026",
  startTime: "09:00 AM",
  endTime: "11:38 PM",
  location: "Pakistan Association Dubai",
  level: "Advanced Level",
  language: "English",
  mode: "Online",
  cost: "Free",
  image: enevt8, 
  description: "An ideal customer profile (ICP) is a detailed description of your most valuable customers, including their demographics, firmographics and psychographics. Customer demographics are population-defining statistics like age, race, gender or marital status.",
  tags: ["ICP", "Customer Profile", "Buyer Profile", "Customer Mapping"],
  speakers: [
    {
      id: 1,
      name: "Adnan Moinuddin",
      role: "Marketing Professional",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    {
      id: 2,
      name: "Khursheed Alam",
      role: "IT Consultant",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
      linkedin: "https://linkedin.com",
    },
    {
      id: 3,
      name: "M Yousaf",
      role: "Marcom Team Lead",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      twitter: "https://twitter.com",
    },
    {
      id: 4,
      name: "Dr Iqra Waqas",
      role: "Business Management Leader",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      linkedin: "https://linkedin.com",
    },
  ],
  sponsors: [
    {
      id: 1,
      name: "Pakistan Association Dubai",
      logo: "https://hub47.ae/Content/website/assets/images/home/PAD-LOGO.png",
    },
     
    {
      id: 3,
      name: "HUB47",
      logo: "https://hub47.ae/Content/website/assets/images/black-logo.png",
    },
  ],
  agenda: [
    {
      id: 1,
      title: "What Is ICP",
      startTime: "09:00 AM",
      endTime: "09:30 AM",
      description: "Understanding the fundamentals of Ideal Customer Profile",
    },
    {
      id: 2,
      title: "How to Create ICP",
      startTime: "09:30 AM",
      endTime: "10:00 AM",
      description: "Step-by-step guide to creating your ICP",
    },
    {
      id: 3,
      title: "Benefits of ICP",
      startTime: "10:00 AM",
      endTime: "10:30 AM",
      description: "Explore the business impact of a well-defined ICP",
    },
  ],
};

// Form Schema
const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(100),
  organisation: z.string().min(2, "Organisation is required").max(100),
  email: z.string().email("Invalid email address"),
  contactNumber: z.string().min(8, "Contact number is required").max(20),
  hearAboutUs: z.string().min(1, "Please select an option"),
  currentStatus: z.string().min(1, "Please select your current status"),
  comments: z.string().max(500).optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const hearAboutOptions = [
  "Social Media",
  "Friend/Colleague",
  "HUB47 Website",
  "Email Newsletter",
  "LinkedIn",
  "Google Search",
  "Previous Event",
  "Other",
];

const statusOptions = [
  { value: "student", label: "Student" },
  { value: "employed", label: "Employed" },
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "freelancer", label: "Freelancer" },
  { value: "unemployed", label: "Looking for Opportunities" },
  { value: "other", label: "Other" },
];

const EventDetails = () => {
  const { eventId } = useParams();
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  // In production, fetch event data based on eventId
  const event = mockEventData;

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      organisation: "",
      email: "",
      contactNumber: "",
      hearAboutUs: "",
      currentStatus: "",
      comments: "",
    },
  });

  const mapRegistrationFormToPayload = (
    values: RegistrationFormData,
    eventId: number
  ) => ({
    Name: values.fullName,
    eventid: eventId,
    Organization: values.organisation,
    Email: values.email,
    Phone: values.contactNumber,
    Workshop: values.hearAboutUs,
    Additionalcomments: values.comments,
    CurrentOccupation: values.currentStatus,
  });
  
  const onSubmit = async(data: RegistrationFormData) => {
    console.log("Registration submitted:", data);
    const payload = mapRegistrationFormToPayload(data, 1); // example eventId

    try {
      const response = await addEvent(payload)
  console.log(response)
      if (response =='Added') {
        setShowThankYou(true);
      }
  
     
    } catch (error) {
      console.error('Registration API Error:', error);
    }
   finally{
    setIsRegistrationOpen(false);
   
    form.reset();
   }
  };

  const closeThankYou = () => {
    setShowThankYou(false);
  };

  // Check which sections have content
  const hasSpeakers = event.speakers && event.speakers.length > 0;
  const hasSponsors = event.sponsors && event.sponsors.length > 0;
  const hasAgenda = event.agenda && event.agenda.length > 0;
  const hasTags = event.tags && event.tags.length > 0;

  return (
    <>
      <Helmet>
        <title>{event.title} | HUB47 Events</title>
        <meta name="description" content={event.description} />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-0 bg-gradient-to-br from-[hsl(var(--brand-navy))] via-[hsl(215,40%,15%)] to-[hsl(var(--brand-navy))]">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container-hub relative z-10 py-8 md:py-16">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Events</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
                <Tag className="w-4 h-4" />
                <span className="text-sm font-medium">{event.category}</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background-cus mb-6 leading-tight">
                {event.title}
              </h1>

              <p className="text-background-custom text-lg mb-8 leading-relaxed">
                {event.description}
              </p>

              {/* Event Meta */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-background-cus">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-background-cus uppercase tracking-wide">Date</p>
                    <p className="text-sm font-medium">{event.startDate}{event.endDate ? ` - ${event.endDate}` : ""}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-background-cus">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-background-cus uppercase tracking-wide">Time</p>
                    <p className="text-sm font-medium">{event.startTime} - {event.endTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-background-cus">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-background-cus uppercase tracking-wide">Location</p>
                    <p className="text-sm font-medium">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-background-cus">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-background-cus uppercase tracking-wide">Cost</p>
                    <p className="text-sm font-medium">{event.cost}</p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setIsRegistrationOpen(true)}
                size="lg"
                className="btn-primary text-base px-8"
              >
                Register for Event
              </Button>
            </motion.div>

            {/* Event Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/30 rounded-2xl blur-xl" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-accent/30 rounded-2xl blur-xl" />
            </motion.div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="relative mt-8">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Tags Section */}
      {hasTags && (
        <section className="py-8 bg-background">
          <div className="container-hub">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 justify-center"
            >
              {event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium border border-border hover:border-primary/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Event Details Grid */}
      <section className="py-8 bg-background">
        <div className="container-hub">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <BookOpen className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Level</p>
              <p className="font-semibold text-foreground">{event.level}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <Languages className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Language</p>
              <p className="font-semibold text-foreground">{event.language}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <Wifi className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Mode</p>
              <p className="font-semibold text-foreground">{event.mode}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border text-center">
              <Users className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Category</p>
              <p className="font-semibold text-foreground">{event.category}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Speakers Section */}
      {hasSpeakers && (
        <section className="py-16 bg-muted/30">
          <div className="container-hub">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
                <Mic2 className="w-4 h-4" />
                <span className="text-sm font-medium">Featured Speakers</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Meet Our Speakers
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {event.speakers.map((speaker, index) => (
                <motion.div
                  key={speaker.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative bg-card rounded-2xl p-4 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                    <div className="aspect-square rounded-xl overflow-hidden mb-4">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="font-bold text-foreground text-center mb-1">
                      {speaker.name}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center mb-3">
                      {speaker.role}
                    </p>
                    <div className="flex justify-center gap-2">
                      {speaker.linkedin && (
                        <a
                          href={speaker.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {speaker.twitter && (
                        <a
                          href={speaker.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Agenda Section */}
      {hasAgenda && (
        <section className="py-16 bg-background">
          <div className="container-hub">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent mb-4">
                <ListChecks className="w-4 h-4" />
                <span className="text-sm font-medium">Event Schedule</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Event Agenda
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />

                {event.agenda.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-16 pb-8 md:pl-0 md:pb-12"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 w-4 h-4 rounded-full bg-primary border-4 border-background md:left-1/2 md:-translate-x-1/2" />

                    <div className={`md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                      <div className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                        <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
                          <Clock className="w-4 h-4" />
                          <span>{item.startTime} - {item.endTime}</span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {item.title}
                        </h3>
                        {item.description && (
                          <p className="text-muted-foreground text-sm">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sponsors Section */}
      {hasSponsors && (
        <section className="py-16 bg-muted/30">
          <div className="container-hub">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">Our Partners</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Event Sponsors
              </h2>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8">
              {event.sponsors.map((sponsor, index) => (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-35 h-32 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  <p className="text-center mt-3 font-medium text-foreground text-sm">
                    {sponsor.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[hsl(var(--brand-navy))] to-[hsl(215,40%,20%)]">
        <div className="container-hub">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join This Event?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Don't miss out on this incredible opportunity to learn and network with industry experts.
            </p>
            <Button
              onClick={() => setIsRegistrationOpen(true)}
              size="lg"
              className="btn-primary text-base px-8"
            >
              Register Now
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Registration Dialog */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              Register for Event
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {event.title}
            </p>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Full Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="bg-background border-border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="organisation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Organisation *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your organisation"
                        className="bg-background border-border"
                        {...field}
                      />
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
                    <FormLabel className="text-foreground">Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-background border-border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Contact Number *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your contact number"
                        className="bg-background border-border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hearAboutUs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">How did you hear about this event? *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-card border-border z-50">
                        {hearAboutOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Your Current Status *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-2 mt-2"
                      >
                        {statusOptions.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2 p-2 rounded-lg border border-border hover:border-primary/30 transition-colors"
                          >
                            <RadioGroupItem value={option.value} id={option.value} />
                            <label
                              htmlFor={option.value}
                              className="text-sm text-foreground cursor-pointer flex-1"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Any Comments (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share any questions or comments..."
                        className="bg-background border-border resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full btn-primary mt-6">
                Submit Registration
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Thank You Dialog */}
      <AnimatePresence>
        {showThankYou && (
          <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
            <DialogContent className="max-w-md bg-card border-border text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-foreground mb-3"
                >
                  Registration Successful!
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground mb-6"
                >
                  Thank you for registering for <strong>{event.title}</strong>. We'll send you a confirmation email with all the event details.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button onClick={closeThankYou} className="btn-primary">
                    Close
                  </Button>
                </motion.div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventDetails;
