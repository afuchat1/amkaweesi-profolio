import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Mail, ArrowRight, Github, Twitter, Linkedin, Terminal, Globe, Send, MessageSquare, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/components/theme-provider";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Ecosystem", href: "#ecosystem" },
    { name: "Clients", href: "#clients" },
    { name: "Vision", href: "#vision" },
    { name: "Contact", href: "#contact" },
  ];

  const projects = [
    { domain: "afuchat.com", name: "AfuChat", desc: "Unified communication platform", icon: <MessageSquare className="w-5 h-5" /> },
    { domain: "email.afuchat.com", name: "AfuMail", desc: "Smart email for the ecosystem", icon: <Mail className="w-5 h-5" /> },
    { domain: "pay.afuchat.com", name: "AfuPay", desc: "Seamless digital payments", icon: <Globe className="w-5 h-5" /> },
    { domain: "cloud.afuchat.com", name: "AfuCloud", desc: "Personal cloud storage", icon: <Globe className="w-5 h-5" /> },
    { domain: "blog.afuchat.com", name: "AfuBlog", desc: "Publishing platform", icon: <Globe className="w-5 h-5" /> },
    { domain: "build.afuchat.com", name: "AfuBuild", desc: "Website & app builder", icon: <Terminal className="w-5 h-5" /> },
    { domain: "ads.afuchat.com", name: "AfuAds", desc: "Digital advertising tools", icon: <Globe className="w-5 h-5" /> },
    { domain: "math.afuchat.com", name: "AfuMath", desc: "Interactive math education", icon: <Globe className="w-5 h-5" /> },
  ];

  const clients = [
    { domain: "honeybeeministriesug.org", name: "Honeybee Ministries", desc: "Faith organization (Uganda)" },
    { domain: "sabulashoespot.com", name: "Sabula Shoe Spot", desc: "Footwear retail brand" },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30 selection:text-primary">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05)_0%,rgba(0,0,0,0)_50%)]" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05)_0%,rgba(0,0,0,0)_50%)] rounded-full blur-3xl opacity-50 transform translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05)_0%,rgba(0,0,0,0)_50%)] rounded-full blur-3xl opacity-50 transform -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Navigation - Desktop */}
      <nav className="fixed top-0 inset-x-0 z-50 hidden md:block border-b border-white/5 bg-background/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight text-gradient">AK.</div>
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {link.name}
              </a>
            ))}
            {mounted && (
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
              >
                {theme === 'dark' ? <span className="text-xs">L</span> : <span className="text-xs">D</span>}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-[100dvh] flex flex-col justify-center px-6 pt-20 pb-10">
          <div className="max-w-6xl mx-auto w-full relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-muted-foreground mb-8">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Builder of the AfuChat Ecosystem
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-6">
                AM Kaweesi
                <br />
                <span className="text-muted-foreground">Digital Empire.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
                Building connected digital systems across communication, payments, cloud, publishing, and tools.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" className="h-14 px-8 text-base rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)]" asChild>
                  <a href="#ecosystem">
                    Explore Ecosystem <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-white/10 hover:bg-white/5" asChild>
                  <a href="#contact">Contact Me</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">The Architect of Connectivity</h2>
                <div className="space-y-6 text-lg text-muted-foreground">
                  <p>
                    I am a builder focused on creating cohesive digital ecosystems. My work centers around the idea that digital tools shouldn't exist in isolation.
                  </p>
                  <p>
                    <strong className="text-foreground">AfuChat</strong> is the core of this expanding platform — a unified communication layer that branches out into payments, cloud storage, publishing, and beyond.
                  </p>
                  <p>
                    Every project I build is designed to be an interconnected piece of a larger, seamless online service architecture.
                  </p>
                </div>
              </div>
              <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden glass-panel flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1)_0%,rgba(0,0,0,0)_70%)]" />
                <Terminal className="w-32 h-32 text-primary/20" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Ecosystem Section */}
        <section id="ecosystem" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 md:mb-24">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">The Ecosystem</h2>
              <p className="text-xl text-muted-foreground max-w-2xl">A unified suite of interconnected digital services powered by the AfuChat core architecture.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.map((project, index) => (
                <motion.a
                  key={project.name}
                  href={`https://${project.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative h-full p-8 rounded-2xl glass-panel group-hover:border-primary/30 transition-colors duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="flex flex-col h-full relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 overflow-hidden">
                        <img 
                          src={`https://www.google.com/s2/favicons?domain=${project.domain}&sz=64`}
                          alt={`${project.name} icon`}
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{project.name}</h3>
                      <p className="text-sm text-muted-foreground mt-auto">{project.desc}</p>
                      
                      <div className="absolute bottom-8 right-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <ExternalLink className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section id="clients" className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by the Ecosystem</h2>
              <p className="text-lg text-muted-foreground">Organizations running on the infrastructure.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {clients.map((client, index) => (
                <motion.a
                  key={client.name}
                  href={`https://${client.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="group relative flex items-center gap-6 p-6 rounded-2xl glass-panel hover:bg-white/5 transition-colors"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <img 
                      src={`https://www.google.com/s2/favicons?domain=${client.domain}&sz=64`}
                      alt={`${client.name} icon`}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold truncate">{client.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{client.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                Building for the <span className="text-gradient">Long Term</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12">
                A unified digital ecosystem spanning communication, payments, cloud, publishing, education, and tools. Built with scalable infrastructure to drive real-world impact.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-12">
                {[
                  { label: "Infrastructure", value: "Scalable" },
                  { label: "Design", value: "Unified" },
                  { label: "Impact", value: "Real-world" },
                  { label: "Vision", value: "Long-term" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 border-t border-white/5 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Initialize Connection</h2>
                <p className="text-xl text-muted-foreground mb-10">
                  Interested in the ecosystem? Let's discuss infrastructure, integration, or future possibilities.
                </p>
                
                <div className="flex items-center gap-4 mb-12">
                  <a href="#" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:text-primary transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-panel p-8 rounded-3xl"
              >
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Identification</label>
                    <Input 
                      placeholder="Name" 
                      className="bg-white/5 border-white/10 h-12 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Return Vector</label>
                    <Input 
                      type="email" 
                      placeholder="Email Address" 
                      className="bg-white/5 border-white/10 h-12 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Payload</label>
                    <Textarea 
                      placeholder="Message" 
                      className="bg-white/5 border-white/10 min-h-[120px] resize-none focus-visible:ring-primary"
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 text-base bg-primary hover:bg-primary/90 text-primary-foreground">
                    Transmit Message <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-white/5 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AM Kaweesi. All rights reserved.</p>
        </footer>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 glass-panel border-t border-white/10 p-4">
        <div className="flex items-center justify-around">
          <a href="#about" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Terminal className="w-5 h-5" />
            <span className="text-[10px] font-medium">About</span>
          </a>
          <a href="#ecosystem" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Globe className="w-5 h-5" />
            <span className="text-[10px] font-medium">Ecosystem</span>
          </a>
          <a href="#contact" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px] font-medium">Contact</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
