import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Offerings from '@/components/Offerings';
import StartupsLogoCarousel from '@/components/StartupsLogoCarousel';
import JoinHubCTA from '@/components/JoinHubCTA';
import EcosystemSection from '@/components/EcosystemSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import NewsletterSection from '@/components/NewsletterSection';
import VolunteerSection from '@/components/VolunteerSection';
import Footer from '@/components/Footer';
import EventsSidebar from '@/components/EventsSidebar';

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Hub47 | Tech Startup Accelerator in UAE | Pakistani Founders</title>
        <meta 
          name="description" 
          content="HUB47 is the community-driven tech startup accelerator in the UAE. Join our 12-week cohort for mentorship, investor introductions, and market access for Pakistani entrepreneurs." 
        />
        <meta name="keywords" content="startup accelerator UAE, Pakistani entrepreneurs Dubai, tech incubator, startup mentorship, investor network UAE" />
        <link rel="canonical" href="https://hub47.ae" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Hub47 | Tech Startup Accelerator in UAE" />
        <meta property="og:description" content="Community-driven accelerator helping Pakistani tech founders access UAE markets." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hub47.ae" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hub47 | Tech Startup Accelerator in UAE" />
        <meta name="twitter:description" content="Community-driven accelerator helping Pakistani tech founders access UAE markets." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Hub47",
            "description": "Community-driven tech startup accelerator in the UAE for Pakistani entrepreneurs",
            "url": "https://hub47.ae",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Street 1lb, Oud Metha Road",
              "addressLocality": "Dubai",
              "addressCountry": "UAE"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Offerings />
          <StartupsLogoCarousel />
          <JoinHubCTA />
          <EcosystemSection />
          <TestimonialsSection />
          <CTASection />
          <NewsletterSection />
          <VolunteerSection />
        </main>
        <Footer />
        <EventsSidebar />
      </div>
    </>
  );
}
