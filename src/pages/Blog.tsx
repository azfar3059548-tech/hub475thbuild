import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, User, ArrowRight, Sparkles, TrendingUp, Lightbulb, Users, Zap, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogsList } from "@/services/blogApi";

const blogPosts = [
  {
    id: "startup-success-systems",
    title: "Startup Success Starts Here: The Systems That Turn Chaos Into Growth",
    excerpt: "Discover the essential systems and frameworks that transform chaotic startup environments into well-oiled growth machines.",
    readTime: "5 Min Read",
    date: "2025-Jul-30",
    author: "Muhammad Shahbaz Khan",
    category: "Growth",
    featured: true,
    gradient: "from-primary via-accent to-secondary",
    icon: TrendingUp,
  },
  {
    id: "6-stages-startup-uae",
    title: "The 6 Stages of a Startup: A UAE Perspective",
    excerpt: "Navigate the unique challenges and opportunities of building a startup in the UAE market through these six critical stages.",
    readTime: "4 Min Read",
    date: "2025-Jul-28",
    author: "Khurshid Alam",
    category: "Strategy",
    featured: false,
    gradient: "from-accent to-primary",
    icon: Sparkles,
  },
  {
    id: "uae-invest-pakistani-startups",
    title: "Why UAE Business Leaders Should Invest in Pakistani Startups",
    excerpt: "Explore the untapped potential and strategic advantages of investing in Pakistan's burgeoning tech ecosystem.",
    readTime: "4 Min Read",
    date: "2025-Jul-28",
    author: "Heema Alam",
    category: "Investment",
    featured: false,
    gradient: "from-secondary to-accent",
    icon: Zap,
  },
  {
    id: "ai-maturity-roadmap",
    title: "AI Maturity Roadmap for Startups",
    excerpt: "Unlock AI growth for startups: discover the 4-stage AI maturity roadmap with practical steps and key milestones.",
    readTime: "4 Min Read",
    date: "2025-Jun-14",
    author: "Khurshid Alam",
    category: "AI & Tech",
    featured: true,
    gradient: "from-primary to-secondary",
    icon: Lightbulb,
  },
  {
    id: "executive-summary-power",
    title: "The Power of an Executive Summary: Your First Impression",
    excerpt: "Learn why a powerful Executive Summary can make or break your business plan. Discover the secrets to capturing investor attention.",
    readTime: "2 Min Read",
    date: "2025-May-28",
    author: "Nadeem Afzal",
    category: "Business",
    featured: false,
    gradient: "from-accent via-primary to-secondary",
    icon: Sparkles,
  },
  {
    id: "power-of-community",
    title: "The Power of Community: How Networking Drives Startup Success",
    excerpt: "Can networking truly drive startup success? Explore the immense power of community and strategic connections.",
    readTime: "3 Min Read",
    date: "2025-May-19",
    author: "Ali Akram Sheikh",
    category: "Community",
    featured: false,
    gradient: "from-secondary via-accent to-primary",
    icon: Users,
  },
];

const categories = ["All", "Growth", "Strategy", "Investment", "AI & Tech", "Business", "Community"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [blogs,setBlogs] = useState([]);
  useEffect(()=>{
    const callBlogs = async()=>{
      const res = await getBlogsList();
      if(!!res.length)
      {
        setBlogs(res)
      }
    }
callBlogs()
  },[])
  console.log("blogsss",blogs)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <>
      <Helmet>
        <title>Blog | HUB47 - Insights for Startup Success</title>
        <meta name="description" content="Explore insights, strategies, and success stories from HUB47's ecosystem of entrepreneurs and industry experts." />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
          
          {/* Floating Elements */}
          <motion.div
            className="absolute top-32 right-[20%] w-4 h-4 bg-primary rounded-full"
            animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-48 left-[15%] w-3 h-3 bg-accent rounded-full"
            animate={{ y: [0, 15, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Knowledge Hub
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Insights That
                <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  Power Innovation
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Expert perspectives, success stories, and actionable strategies from the HUB47 ecosystem.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 border-y border-border/50 bg-muted/30 sticky top-16 z-40 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap transition-all duration-300 ${
                    activeCategory === category 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" 
                      : "hover:bg-primary/10"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && activeCategory === "All" && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link to={`/blog/${featuredPost.id}`}>
                  <div className="relative group rounded-3xl overflow-hidden bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                    <div className={`absolute inset-0 bg-gradient-to-r ${featuredPost.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className="grid md:grid-cols-2 gap-6 p-6 md:p-10">
                      {/* Image placeholder */}
                      <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <featuredPost.icon className="w-24 h-24 text-primary/30" />
                        </div>
                        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col justify-center">
                        <Badge variant="outline" className="w-fit mb-4 border-accent/50 text-accent">
                          {featuredPost.category}
                        </Badge>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-muted-foreground mb-6 text-lg">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                          <span className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            {featuredPost.author}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {featuredPost.readTime}
                          </span>
                          <span>{featuredPost.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                          Read Article <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section ref={sectionRef} className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {blogs.map((post, index) => (
                  <motion.div
                    key={post.Id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/blog/${post.Id}`}>
                      <div
                        className="group relative h-full rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2"
                        onMouseEnter={() => setHoveredCard(post.Id)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        {/* Gradient Overlay */}
                        {/* <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500`} /> */}
                        
                        {/* Image Area */}
                       

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-lg md:text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.Title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post.BlogDetails}
                          </p>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {post.EntryDate}
                          </p>
                          
                        
                        </div>

                        {/* Hover Arrow */}
                        <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary">
                          <ArrowRight className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent p-8 md:p-12 lg:p-16 text-center"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <Badge className="mb-6 bg-white/20 text-white border-white/30">
                  Stay Updated
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Get Weekly Insights
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  Join 1,000+ founders receiving actionable startup advice directly in their inbox.
                </p>
                <Link to="/#newsletter">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 shadow-xl">
                    Subscribe Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Blog;
