import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Clock, User, Calendar, ArrowLeft, ArrowRight, Share2, Bookmark, ThumbsUp, MessageCircle, Linkedin, Twitter, Facebook, Copy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

// Mock blog data - in production this would come from a CMS
const blogData: Record<string, any> = {
  "startup-success-systems": {
    title: "Startup Success Starts Here: The Systems That Turn Chaos Into Growth",
    excerpt: "Discover the essential systems and frameworks that transform chaotic startup environments into well-oiled growth machines.",
    content: `
      <p class="lead">Every successful startup has one thing in common: they've mastered the art of turning chaos into systematic growth. But how do they do it?</p>
      
      <h2>The Foundation of Systematic Growth</h2>
      <p>Building a startup is inherently chaotic. You're juggling product development, customer acquisition, team building, and fundraising—often all at once. The difference between startups that scale and those that stagnate lies in their ability to create repeatable systems.</p>
      
      <blockquote>"The goal is not to eliminate chaos, but to channel it into productive energy through well-designed systems."</blockquote>
      
      <h2>Key Systems Every Startup Needs</h2>
      <h3>1. Customer Acquisition System</h3>
      <p>Your customer acquisition system should be predictable and scalable. This includes:</p>
      <ul>
        <li>Clear customer personas and target markets</li>
        <li>Defined acquisition channels with measured CAC</li>
        <li>Automated nurturing sequences</li>
        <li>Sales pipeline management</li>
      </ul>
      
      <h3>2. Product Development System</h3>
      <p>Ship fast, iterate faster. Your product development system should enable rapid experimentation while maintaining quality:</p>
      <ul>
        <li>Two-week sprint cycles</li>
        <li>Customer feedback integration</li>
        <li>Feature prioritization frameworks</li>
        <li>Quality assurance checkpoints</li>
      </ul>
      
      <h3>3. Team Operations System</h3>
      <p>As you scale from 5 to 50 to 500, your operations need to evolve. Build systems that grow with you:</p>
      <ul>
        <li>Structured onboarding programs</li>
        <li>Clear communication channels</li>
        <li>Performance management frameworks</li>
        <li>Knowledge documentation practices</li>
      </ul>
      
      <h2>The HUB47 Approach</h2>
      <p>At HUB47, we've helped dozens of startups implement these systems. Our accelerator program provides not just mentorship, but proven frameworks that our portfolio companies use to scale.</p>
      
      <h2>Taking Action</h2>
      <p>Start small. Pick one area of your business that feels most chaotic, and design a simple system to bring order. Measure the results, iterate, and expand.</p>
      
      <p>Remember: the goal isn't perfection. It's progress through systematic improvement.</p>
    `,
    readTime: "5 Min Read",
    date: "July 30, 2025",
    author: {
      name: "Muhammad Shahbaz Khan",
      role: "Startup Strategist",
      initials: "MSK",
    },
    category: "Growth",
    tags: ["Startup Strategy", "Systems Thinking", "Growth", "Operations"],
    relatedPosts: ["6-stages-startup-uae", "ai-maturity-roadmap"],
  },
  "6-stages-startup-uae": {
    title: "The 6 Stages of a Startup: A UAE Perspective",
    excerpt: "Navigate the unique challenges and opportunities of building a startup in the UAE market through these six critical stages.",
    content: `
      <p class="lead">The UAE offers a unique ecosystem for startups, blending Eastern and Western business cultures with access to global markets. Understanding the six stages of startup development in this context is crucial for success.</p>
      
      <h2>Stage 1: Ideation & Validation</h2>
      <p>In the UAE market, validation takes on special significance. With a diverse population and proximity to emerging markets, you have access to varied customer segments for testing.</p>
      
      <h2>Stage 2: MVP Development</h2>
      <p>Build lean, launch fast. The UAE's tech-savvy population provides excellent early adopter opportunities. Focus on solving real problems for real users.</p>
      
      <h2>Stage 3: Product-Market Fit</h2>
      <p>Finding product-market fit in the UAE often means understanding the nuances of different emirates and customer segments. What works in Dubai may need adaptation for Abu Dhabi or Sharjah.</p>
      
      <h2>Stage 4: Scaling</h2>
      <p>The UAE's strategic location makes it an ideal launchpad for regional expansion. As you scale, consider markets in the GCC, MENA region, and beyond.</p>
      
      <h2>Stage 5: Expansion</h2>
      <p>From the UAE, many startups expand to India, Pakistan, and Southeast Asia. The diaspora connections and trade relationships facilitate these moves.</p>
      
      <h2>Stage 6: Maturity & Exit</h2>
      <p>The UAE's growing M&A market and public listing opportunities provide multiple exit paths for successful startups.</p>
    `,
    readTime: "4 Min Read",
    date: "July 28, 2025",
    author: {
      name: "Khurshid Alam",
      role: "Venture Partner",
      initials: "KA",
    },
    category: "Strategy",
    tags: ["UAE Startups", "Growth Stages", "Market Entry", "Expansion"],
    relatedPosts: ["startup-success-systems", "power-of-community"],
  },
  "ai-maturity-roadmap": {
    title: "AI Maturity Roadmap for Startups",
    excerpt: "Unlock AI growth for startups: discover the 4-stage AI maturity roadmap with practical steps and key milestones.",
    content: `
      <p class="lead">Artificial Intelligence is no longer optional for competitive startups. But implementing AI effectively requires a strategic roadmap tailored to your maturity level.</p>
      
      <h2>The 4 Stages of AI Maturity</h2>
      
      <h3>Stage 1: AI Awareness</h3>
      <p>Most startups begin here. You understand AI's potential but haven't implemented it yet. Key actions:</p>
      <ul>
        <li>Identify AI use cases in your industry</li>
        <li>Assess your data readiness</li>
        <li>Build AI literacy in your team</li>
      </ul>
      
      <h3>Stage 2: AI Experimentation</h3>
      <p>Start small with proof-of-concept projects:</p>
      <ul>
        <li>Implement AI-powered analytics</li>
        <li>Test chatbots for customer service</li>
        <li>Explore automation opportunities</li>
      </ul>
      
      <h3>Stage 3: AI Integration</h3>
      <p>AI becomes embedded in core processes:</p>
      <ul>
        <li>Personalization at scale</li>
        <li>Predictive capabilities</li>
        <li>Automated decision-making</li>
      </ul>
      
      <h3>Stage 4: AI-Native</h3>
      <p>AI is central to your value proposition and competitive advantage.</p>
      
      <h2>Getting Started</h2>
      <p>Assess your current stage and identify one quick win. Build momentum with small successes before tackling larger AI initiatives.</p>
    `,
    readTime: "4 Min Read",
    date: "June 14, 2025",
    author: {
      name: "Khurshid Alam",
      role: "Venture Partner",
      initials: "KA",
    },
    category: "AI & Tech",
    tags: ["Artificial Intelligence", "Technology", "Innovation", "Digital Transformation"],
    relatedPosts: ["startup-success-systems", "executive-summary-power"],
  },
  "executive-summary-power": {
    title: "The Power of an Executive Summary: Your First Impression",
    excerpt: "Learn why a powerful Executive Summary can make or break your business plan. Discover the secrets to capturing investor attention.",
    content: `
      <p class="lead">Investors review hundreds of pitch decks weekly. Your executive summary has 30 seconds to capture their attention. Make it count.</p>
      
      <h2>What Makes a Winning Executive Summary</h2>
      <p>The best executive summaries are concise, compelling, and clear. They answer the essential questions investors have:</p>
      <ul>
        <li>What problem are you solving?</li>
        <li>How big is the market?</li>
        <li>What's your solution?</li>
        <li>Why is your team uniquely positioned?</li>
        <li>What traction do you have?</li>
      </ul>
      
      <h2>The Structure</h2>
      <p>Keep it to one page. Use bullet points strategically. Lead with your strongest point—usually traction or a compelling market opportunity.</p>
      
      <h2>Common Mistakes</h2>
      <p>Avoid jargon, unsubstantiated claims, and burying the lead. Get to the point quickly and back up claims with data.</p>
    `,
    readTime: "2 Min Read",
    date: "May 28, 2025",
    author: {
      name: "Nadeem Afzal",
      role: "Investment Advisor",
      initials: "NA",
    },
    category: "Business",
    tags: ["Fundraising", "Pitch Deck", "Investors", "Business Planning"],
    relatedPosts: ["6-stages-startup-uae", "power-of-community"],
  },
  "power-of-community": {
    title: "The Power of Community: How Networking Drives Startup Success",
    excerpt: "Can networking truly drive startup success? Explore the immense power of community and strategic connections.",
    content: `
      <p class="lead">Behind every successful startup is a network of mentors, advisors, peers, and supporters. Community isn't just nice to have—it's essential.</p>
      
      <h2>Why Community Matters</h2>
      <p>Startups in strong communities are more likely to survive and thrive. They have access to:</p>
      <ul>
        <li>Mentorship from experienced founders</li>
        <li>Introductions to investors and customers</li>
        <li>Peer support through challenges</li>
        <li>Talent referrals</li>
      </ul>
      
      <h2>Building Your Network</h2>
      <p>Quality over quantity. Focus on building genuine relationships rather than collecting business cards. Give before you ask.</p>
      
      <h2>The HUB47 Community</h2>
      <p>At HUB47, we've built a community of Pakistani entrepreneurs in the UAE who support each other's growth. Join us to tap into this powerful network.</p>
    `,
    readTime: "3 Min Read",
    date: "May 19, 2025",
    author: {
      name: "Ali Akram Sheikh",
      role: "Community Lead",
      initials: "AS",
    },
    category: "Community",
    tags: ["Networking", "Community Building", "Mentorship", "Ecosystem"],
    relatedPosts: ["startup-success-systems", "6-stages-startup-uae"],
  },
};

const allPosts = [
  { id: "startup-success-systems", title: "Startup Success Starts Here" },
  { id: "6-stages-startup-uae", title: "The 6 Stages of a Startup" },
  { id: "ai-maturity-roadmap", title: "AI Maturity Roadmap" },
  { id: "executive-summary-power", title: "The Power of an Executive Summary" },
  { id: "power-of-community", title: "The Power of Community" },
];

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  
  const post = slug ? blogData[slug] : null;

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const currentIndex = allPosts.findIndex(p => p.id === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    const shareUrls: Record<string, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Article link has been copied to clipboard.",
      });
      return;
    }

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | HUB47 Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-foreground">{post.category}</span>
              </div>

              {/* Category Badge */}
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                {post.category}
              </Badge>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {post.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-foreground font-medium">{post.author.name}</p>
                    <p className="text-sm">{post.author.role}</p>
                  </div>
                </div>
                <Separator orientation="vertical" className="h-8 hidden sm:block" />
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Featured Image Placeholder */}
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/15 to-secondary/20 mb-8">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Bookmark className="w-12 h-12 text-primary/50" />
                    </div>
                    <p className="text-muted-foreground">Featured Image</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-[1fr_280px] gap-12">
                {/* Main Content */}
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="prose prose-lg max-w-none dark:prose-invert
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-li:text-muted-foreground
                    prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-foreground
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground
                    [&_.lead]:text-xl [&_.lead]:text-foreground [&_.lead]:leading-relaxed [&_.lead]:mb-8"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Sidebar */}
                <aside className="space-y-8">
                  {/* Share Section */}
                  <div className="sticky top-24">
                    <div className="rounded-2xl border border-border/50 bg-card p-6">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Share Article
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleShare("linkedin")}
                        >
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleShare("twitter")}
                        >
                          <Twitter className="w-4 h-4 mr-2" />
                          Twitter
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleShare("facebook")}
                        >
                          <Facebook className="w-4 h-4 mr-2" />
                          Facebook
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleShare("copy")}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Link
                        </Button>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="rounded-2xl border border-border/50 bg-card p-6 mt-6">
                      <h3 className="font-semibold text-foreground mb-4">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* Author Card */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl border border-border/50 bg-gradient-to-br from-card to-muted/30 p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <Avatar className="w-20 h-20 border-4 border-primary/20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                      {post.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground mb-1">Written by</p>
                    <h3 className="text-xl font-bold text-foreground mb-1">{post.author.name}</h3>
                    <p className="text-primary font-medium mb-3">{post.author.role}</p>
                    <p className="text-muted-foreground text-sm">
                      Passionate about helping startups grow and succeed in the UAE ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 md:py-12 border-t border-border/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-6">
                {prevPost ? (
                  <Link to={`/blog/${prevPost.id}`}>
                    <div className="group rounded-xl border border-border/50 bg-card p-6 hover:border-primary/30 transition-all hover:shadow-lg">
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Previous Article
                      </p>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {prevPost.title}
                      </h4>
                    </div>
                  </Link>
                ) : <div />}

                {nextPost && (
                  <Link to={`/blog/${nextPost.id}`}>
                    <div className="group rounded-xl border border-border/50 bg-card p-6 hover:border-primary/30 transition-all hover:shadow-lg text-right">
                      <p className="text-sm text-muted-foreground mb-2 flex items-center justify-end gap-2">
                        Next Article
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </p>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {nextPost.title}
                      </h4>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Want More Insights?
              </h2>
              <p className="text-muted-foreground mb-8">
                Explore our full library of articles on startup strategy, growth, and innovation.
              </p>
              <Link to="/blog">
                <Button size="lg" className="shadow-lg shadow-primary/25">
                  Browse All Articles
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default BlogDetails;
