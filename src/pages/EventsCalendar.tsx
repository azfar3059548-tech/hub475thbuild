import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import enevt1 from '@/assets/event1.jpg';
import enevt2 from '@/assets/event2.jpg';
import enevt4 from '@/assets/event4.jpeg';
import enevt3 from '@/assets/event3..jpeg';

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
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Tag,
  X,
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

// Mock Events Data
const events = [
  {
    id: 1,
    title: "What Is Ideal Customer Profile (ICP)?",
    category: "Workshop",
    date: "04 Jan 2026",
    endDate: "10 Jan 2026",
    time: "09:00 AM - 11:30 PM",
    location: "Pakistan Association Dubai",
    level: "Advanced Level",
    language: "English",
    mode: "Online",
    cost: "Free",
     image: enevt1, 
    description: "Learn how to identify and target your ideal customer profile for maximum business growth.",
  },
  {
    id: 2,
    title: "Startup Pitch Night - UAE Edition",
    category: "Networking",
    date: "18 Jan 2026",
    endDate: null,
    time: "06:00 PM - 09:00 PM",
    location: "HUB47 Innovation Center",
    level: "All Levels",
    language: "English",
    mode: "In-Person",
    cost: "Free",
     image: enevt2, 
    description: "Present your startup idea to investors and get valuable feedback from industry experts.",
  },
  {
    id: 3,
    title: "AI & Machine Learning Bootcamp",
    category: "Bootcamp",
    date: "25 Feb 2026",
    endDate: "27 Feb 2026",
    time: "10:00 AM - 05:00 PM",
    location: "Dubai Tech Hub",
    level: "Intermediate",
    language: "English",
    mode: "Hybrid",
    cost: "AED 500",
     image: enevt4, 
    description: "A 3-day intensive bootcamp covering AI fundamentals, ML algorithms, and practical applications.",
  },
];

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

const EventsCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

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

  const handleRegisterClick = (event: typeof events[0]) => {
    setSelectedEvent(event);
    setIsRegistrationOpen(true);
  };

  const onSubmit = (data: RegistrationFormData) => {
    console.log("Registration submitted:", data);
    setIsRegistrationOpen(false);
    setShowThankYou(true);
    form.reset();
  };

  const closeThankYou = () => {
    setShowThankYou(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <Helmet>
        <title>Events Calendar | HUB47 - Tech Events in UAE</title>
        <meta name="description" content="Explore upcoming tech events, workshops, and networking sessions organized by HUB47 for Pakistan tech entrepreneurs in the UAE." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-[hsl(var(--brand-navy))] via-[hsl(215,40%,15%)] to-[hsl(var(--brand-navy))]">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          
          {/* Floating Calendar Icons */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/20"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                y: [0, -20, 0],
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
            >
              <Calendar className="w-8 h-8 md:w-12 md:h-12" />
            </motion.div>
          ))}
        </div>

        <div className="container-hub relative z-10 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-kicker">Community Events</span>
            </motion.div>

            <h1 className="text-h1 text-black mb-6">
              Events{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Calendar
              </span>
            </h1>

            <p className="text-body-lg text-black/70 max-w-2xl mx-auto">
              We organize and host tech events focused on specialized topics covering
              the hot IT trends, supportive for Pakistan tech entrepreneurs in the UAE.
            </p>
          </motion.div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,60 C360,120 1080,0 1440,60 L1440,120 L0,120 Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-hub">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-h2 text-foreground mb-4">Upcoming Events</h2>
            <p className="text-body text-muted-foreground max-w-2xl mx-auto">
              Join us for exciting workshops, networking sessions, and bootcamps designed to accelerate your entrepreneurial journey.
            </p>
          </motion.div>

          <div className="grid gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl"
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Event Image */}
                  <div className="relative w-full lg:w-[400px] h-[200px] lg:h-auto overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                        <Tag className="w-3.5 h-3.5" />
                        {event.category}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 p-6 lg:p-8">
                    <Link to={`/events/${event.id}`}>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors cursor-pointer">
                        {event.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{event.date}{event.endDate ? ` - ${event.endDate}` : ""}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 text-accent" />
                        <span>{event.level}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="w-4 h-4 text-accent" />
                        <span>{event.mode}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                        <span className="w-4 h-4 flex items-center justify-center text-xs">💰</span>
                        <span>{event.cost}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleRegisterClick(event)}
                        className="btn-primary group/btn"
                      >
                        Register for Event
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                      <Link to={`/events/${event.id}`}>
                        <Button variant="outline" className="border-border hover:border-primary/30">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Dialog */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              Register for Event
            </DialogTitle>
            {selectedEvent && (
              <p className="text-sm text-muted-foreground mt-1">
                {selectedEvent.title}
              </p>
            )}
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
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={option.value} />
                            <Label htmlFor={option.value} className="text-sm text-foreground cursor-pointer">
                              {option.label}
                            </Label>
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

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRegistrationOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 btn-primary">
                  Submit Registration
                </Button>
              </div>
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
                className="py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </motion.div>

                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-foreground mb-3"
                >
                  Registration Successful!
                </motion.h3>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground mb-6"
                >
                  Thank you for registering for{" "}
                  <span className="text-primary font-medium">
                    {selectedEvent?.title}
                  </span>
                  . We'll send you a confirmation email with all the event details shortly.
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
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

      <Footer />
    </>
  );
};

export default EventsCalendar;
