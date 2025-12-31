import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Users, Award, Calendar, Mic, Globe, Star, ChevronLeft, ChevronRight, Building2, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addMemberShip } from '@/services/memberShipApi';

// Membership packages data
const packages = [
  {
    id: 'enterprise',
    name: 'Enterprise Package',
    price: 'AED 3,000',
    priceValue: 3000,
    members: '3 members',
    icon: Building2,
    popular: true,
    color: 'from-primary to-accent',
    benefits: [
      '12-month HUB47 membership',
      'Membership certificate',
      'Business directory listing',
      'Admission to HUB47 events & meetups',
      'Access to online workshops',
      'Annual dinner invitation',
      'Partner logo on mobile app & website',
      'Featured social media coverage',
      'Access to HUB47 premises',
      'Annual feature in podcasts',
      'Articles at HUB47.com',
      'Newsletter publication per quarter',
      'Panel participation',
      '15 min business showcase at events',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: 'AED 2,500',
    priceValue: 2500,
    members: '2 members',
    icon: Star,
    color: 'from-primary to-blue-400',
    benefits: [
      '12-month HUB47 membership',
      'Membership certificate',
      'Business directory listing',
      'Admission to HUB47 events & meetups',
      'Access to online workshops',
      'Annual dinner invitation',
      'Featured social media coverage',
      'Access to HUB47 premises',
      'Annual feature in podcasts',
    ],
  },
  {
    id: 'basic',
    name: 'Basic Package',
    price: 'AED 1,500',
    priceValue: 1500,
    members: '1 member',
    icon: Users,
    color: 'from-accent to-green-400',
    benefits: [
      '12-month HUB47 membership',
      'Membership certificate',
      'Business directory listing',
      'Admission to HUB47 events & meetups',
      'Access to online workshops',
      'Annual dinner invitation',
    ],
  },
  {
    id: 'individual',
    name: 'Individual Package',
    price: 'AED 1,500',
    priceValue: 1500,
    members: '1 member',
    icon: User,
    color: 'from-purple-500 to-pink-400',
    benefits: [
      '12-month HUB47 membership',
      'Membership certificate',
      'Business directory listing',
      'Admission to HUB47 events & meetups',
      'Access to online workshops',
      'Annual dinner invitation',
    ],
  },
];

// Benefits data for the benefits section
const keyBenefits = [
  {
    icon: Globe,
    title: 'Business Directory',
    description: 'Get listed in our exclusive member directory, connecting you with 500+ professionals and businesses.',
  },
  {
    icon: Calendar,
    title: 'Exclusive Events',
    description: 'Priority access to networking events, workshops, annual dinners, and community meetups.',
  },
  {
    icon: Mic,
    title: 'Media Coverage',
    description: 'Featured coverage on social media, podcasts, and articles on HUB47 platforms.',
  },
  {
    icon: Award,
    title: 'Recognition',
    description: 'Official membership certificate and partner logo display on our website and mobile app.',
  },
  {
    icon: Users,
    title: 'Community Access',
    description: 'Access to HUB47 premises, co-working spaces, and a vibrant community of innovators.',
  },
  {
    icon: Star,
    title: 'Speaking Opportunities',
    description: 'Panel participation and business showcase opportunities at HUB47 events.',
  },
];

// Current members data
const currentMembers = [
  { name: 'TechVenture Labs', industry: 'Technology', logo: 'TVL' },
  { name: 'Green Energy Co', industry: 'Clean Energy', logo: 'GEC' },
  { name: 'FinTech Solutions', industry: 'Finance', logo: 'FTS' },
  { name: 'HealthAI Systems', industry: 'Healthcare', logo: 'HAS' },
  { name: 'EduPro Academy', industry: 'Education', logo: 'EPA' },
  { name: 'Urban Mobility', industry: 'Transportation', logo: 'UMB' },
  { name: 'AgriTech Farms', industry: 'Agriculture', logo: 'ATF' },
  { name: 'CloudSecure', industry: 'Cybersecurity', logo: 'CSC' },
];

// Form schema
const membershipFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(9, 'Please enter a valid phone number'),
  organisation: z.string().min(2, 'Organisation name is required'),
  designation: z.string().min(2, 'Designation is required'),
  membershipType: z.enum(['enterprise', 'premium', 'basic', 'individual']),
  memberType: z.enum(['individual', 'corporate']),
  hearAboutUs: z.string().min(1, 'Please select an option'),
});

type MembershipFormData = z.infer<typeof membershipFormSchema>;

export default function Membership() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const form = useForm<MembershipFormData>({
    resolver: zodResolver(membershipFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      organisation: '',
      designation: '',
      membershipType: 'enterprise',
      memberType: 'corporate',
      hearAboutUs: '',
    },
  });

  const mapMembershipFormToPayload = (values: MembershipFormData) => ({
    ID: 0, // backend usually auto-handles this
    Name: values.fullName,
    Email: values.email,
    ContactNo: values.phone,
    Membership: values.membershipType, // or combine with memberType if needed
    Notes: values.hearAboutUs || values.designation,
    EntryDate: new Date().toISOString(),
    Status: true,
    OrganizationName: values.organisation,
  });
  
  useEffect(() => {
    if (selectedPackage) {
      form.setValue('membershipType', selectedPackage.id as any);
    }
  }, [selectedPackage, form]);

  const openModal = (pkg: typeof packages[0]) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const onSubmit = async(data: MembershipFormData) => {
   

    const payload = mapMembershipFormToPayload(data);
    console.log("MEMBER SHIP PAYLOAD",payload)
    try {
      const response = await addMemberShip(payload);
      console.log('Membership response:', response);
      if(response=='Added')
      {
        setShowThankYou(true);
        form.reset();
      }
    } catch (error) {
      console.error('Membership API Error:', error);
    }

    setIsModalOpen(false);
  

  };

  const slideNext = () => {
    setSliderIndex((prev) => (prev + 1) % currentMembers.length);
  };

  const slidePrev = () => {
    setSliderIndex((prev) => (prev - 1 + currentMembers.length) % currentMembers.length);
  };

  // Auto-slide members
  useEffect(() => {
    const interval = setInterval(slideNext, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Membership Packages | HUB47 - Join Our Community</title>
        <meta name="description" content="Join HUB47's exclusive membership community. Access networking events, media coverage, business directory, and more. Choose from Enterprise, Premium, Basic, or Individual packages." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-primary/20" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="container-hub relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                Join Our Growing Community
              </span>
              <h1 className="text-h1 text-background-cus mb-6">
                Become a Member of{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  HUB47
                </span>
              </h1>
              <p className="text-lg md:text-xl text-background-custom leading-relaxed max-w-2xl mx-auto mb-8">
                Get access to exclusive benefits comprising media coverage, event participation, 
                networking opportunities, and a prestigious membership certificate.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#packages" className="btn-primary">
                  View Packages <ArrowRight className="w-4 h-4 ml-2" />
                </a>
                <a href="/members" className="btn-secondary bg-background/10 border-background/30 text-background-cus hover:bg-background/20">
                  Explore Member Directory
                </a>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {[
                { value: '200+', label: 'Active Members' },
                { value: '50+', label: 'Events/Year' },
                { value: '15+', label: 'Partner Companies' },
                { value: '5+', label: 'Years Community' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-background-cus">{stat.value}</p>
                  <p className="text-sm text-background-custom">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Wave decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
              <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" fill="hsl(var(--background))" />
            </svg>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-24">
          <div className="container-hub">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-kicker text-primary mb-4 block">Why Join HUB47</span>
              <h2 className="text-h2 text-foreground mb-4">Exclusive Member Benefits</h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Unlock a world of opportunities designed to accelerate your business growth and expand your network.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {keyBenefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-h3 text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-body text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="py-16 md:py-24 bg-muted/30">
          <div className="container-hub">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-kicker text-primary mb-4 block">Membership Packages</span>
              <h2 className="text-h2 text-foreground mb-4">Choose Your Package</h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Select the membership tier that best fits your needs and start enjoying exclusive benefits today.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative bg-card rounded-2xl border-2 overflow-hidden transition-all duration-300 hover:shadow-xl ${
                    pkg.popular ? 'border-primary' : 'border-border hover:border-primary/30'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-accent text-primary-foreground text-center py-2 text-sm font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className={`p-6 ${pkg.popular ? 'pt-12' : ''}`}>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center mb-4`}>
                      <pkg.icon className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-1">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{pkg.members}</p>

                    <div className="mb-6">
                      <span className="text-3xl font-bold text-foreground">{pkg.price}</span>
                      <span className="text-muted-foreground">/year</span>
                    </div>

                    <Button
                      onClick={() => openModal(pkg)}
                      className={`w-full mb-6 ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-primary to-accent hover:opacity-90'
                          : 'bg-primary hover:bg-primary/90'
                      }`}
                    >
                      Select Package
                    </Button>

                    <div className="space-y-3">
                      {pkg.benefits.slice(0, 6).map((benefit) => (
                        <div key={benefit} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                      {pkg.benefits.length > 6 && (
                        <p className="text-sm text-primary font-medium">
                          +{pkg.benefits.length - 6} more benefits
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              *Subject to terms and conditions. A payment link will be shared post registration.
            </p>
          </div>
        </section>

        {/* Current Members Slider */}
        <section className="py-16 md:py-24">
          <div className="container-hub">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-kicker text-primary mb-4 block">Our Community</span>
              <h2 className="text-h2 text-foreground mb-4">Current Members</h2>
              <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
                Join these innovative companies and professionals who are already part of the HUB47 community.
              </p>
            </motion.div>

            <div className="relative">
              <div className="overflow-hidden" ref={sliderRef}>
                <motion.div
                  className="flex gap-6"
                  animate={{ x: -sliderIndex * 280 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {[...currentMembers, ...currentMembers].map((member, i) => (
                    <div
                      key={`${member.name}-${i}`}
                      className="flex-shrink-0 w-64 bg-card rounded-xl border border-border p-6 text-center"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl font-bold text-primary">{member.logo}</span>
                      </div>
                      <h4 className="font-semibold text-foreground mb-1">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.industry}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Slider Controls */}
              <button
                onClick={slidePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-card rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={slideNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-card rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>

            <div className="text-center mt-10">
              <a href="/members" className="btn-secondary">
                Explore Full Member Directory <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-foreground to-foreground/90">
          <div className="container-hub text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-h2 text-background mb-4">Ready to Join?</h2>
              <p className="text-lg text-background/80 mb-8">
                Become part of a thriving community of innovators, entrepreneurs, and industry leaders.
              </p>
              <a href="#packages" className="btn-primary">
                Get Started Today <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Membership Form Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              Membership Application
            </DialogTitle>
          </DialogHeader>

          {selectedPackage && (
            <div className="mb-6 p-4 bg-muted/50 rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedPackage.color} flex items-center justify-center`}>
                  <selectedPackage.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{selectedPackage.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedPackage.price}/year</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Package Selection */}
            <div className="space-y-2">
              <Label>Change Package</Label>
              <Select
                value={form.watch('membershipType')}
                onValueChange={(value) => {
                  form.setValue('membershipType', value as any);
                  const pkg = packages.find((p) => p.id === value);
                  if (pkg) setSelectedPackage(pkg);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select package" />
                </SelectTrigger>
                <SelectContent>
                  {packages.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id}>
                      {pkg.name} - {pkg.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Member Type */}
            <div className="space-y-2">
              <Label>Member Type *</Label>
              <RadioGroup
                value={form.watch('memberType')}
                onValueChange={(value) => form.setValue('memberType', value as any)}
                className="flex gap-4"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="corporate" id="corporate" />
                  <Label htmlFor="corporate" className="cursor-pointer">Corporate</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual" className="cursor-pointer">Individual</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                {...form.register('fullName')}
                className={form.formState.errors.fullName ? 'border-destructive' : ''}
              />
              {form.formState.errors.fullName && (
                <p className="text-sm text-destructive">{form.formState.errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...form.register('email')}
                className={form.formState.errors.email ? 'border-destructive' : ''}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Contact Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                {...form.register('phone')}
                className={form.formState.errors.phone ? 'border-destructive' : ''}
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
              )}
            </div>

            {/* Organisation */}
            <div className="space-y-2">
              <Label htmlFor="organisation">Organisation *</Label>
              <Input
                id="organisation"
                placeholder="Enter your organisation name"
                {...form.register('organisation')}
                className={form.formState.errors.organisation ? 'border-destructive' : ''}
              />
              {form.formState.errors.organisation && (
                <p className="text-sm text-destructive">{form.formState.errors.organisation.message}</p>
              )}
            </div>

            {/* Designation */}
            <div className="space-y-2">
              <Label htmlFor="designation">Designation *</Label>
              <Input
                id="designation"
                placeholder="Enter your designation"
                {...form.register('designation')}
                className={form.formState.errors.designation ? 'border-destructive' : ''}
              />
              {form.formState.errors.designation && (
                <p className="text-sm text-destructive">{form.formState.errors.designation.message}</p>
              )}
            </div>

            {/* How did you hear about us */}
            <div className="space-y-2">
              <Label>How did you hear about HUB47? *</Label>
              <Select
                value={form.watch('hearAboutUs')}
                onValueChange={(value) => form.setValue('hearAboutUs', value)}
              >
                <SelectTrigger className={form.formState.errors.hearAboutUs ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social_media">Social Media</SelectItem>
                  <SelectItem value="friend">Friend / Colleague</SelectItem>
                  <SelectItem value="event">HUB47 Event</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.hearAboutUs && (
                <p className="text-sm text-destructive">{form.formState.errors.hearAboutUs.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent">
              Submit Application
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Thank You Modal */}
      <AnimatePresence>
        {showThankYou && (
          <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
            <DialogContent className="max-w-md text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <Check className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-3">Thank You!</h3>
                <p className="text-muted-foreground mb-6">
                  Your membership application has been received. We'll review your application and send you a payment link shortly.
                </p>
                <Button onClick={() => setShowThankYou(false)} className="btn-primary">
                  Close
                </Button>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
