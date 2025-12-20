import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Startup from "./pages/Startup";
import Eligibility from "./pages/Eligibility";
import Apply from "./pages/Apply";
import Volunteer from "./pages/Volunteer";
import VolunteerApply from "./pages/VolunteerApply";
import EventsCalendar from "./pages/EventsCalendar";
import EventDetails from "./pages/EventDetails";
import Membership from "./pages/Membership";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Podcast from "./pages/Podcast";
const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
             <Route path="/about" element={<About />} />
            <Route path="/startup" element={<Startup />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/volunteer/apply" element={<VolunteerApply />} />
            <Route path="/events" element={<EventsCalendar />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
             <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact/>} />
               <Route path="/Podcast" element={<Podcast/>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
