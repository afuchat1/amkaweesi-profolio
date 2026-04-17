import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Mail,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Terminal,
  Globe,
  Send,
  MessageSquare,
  ChevronRight,
  Cloud,
  BookOpen,
  Cpu,
  Megaphone,
  Calculator,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Ecosystem", href: "#ecosystem" },
  { name: "Clients", href: "#clients" },
  { name: "Vision", href: "#vision" },
  { name: "Contact", href: "#contact" },
];

const projects = [
  {
    domain: "afuchat.com",
    name: "AfuChat",
    desc: "Unified communication platform for the modern web",
    icon: MessageSquare,
    color: "bg-blue-50 text-blue-600",
    border: "border-blue-100",
  },
  {
    domain: "email.afuchat.com",
    name: "AfuMail",
    desc: "Smart, privacy-first email for the ecosystem",
    icon: Mail,
    color: "bg-violet-50 text-violet-600",
    border: "border-violet-100",
  },
  {
    domain: "pay.afuchat.com",
    name: "AfuPay",
    desc: "Seamless digital payments and transfers",
    icon: Globe,
    color: "bg-emerald-50 text-emerald-600",
    border: "border-emerald-100",
  },
  {
    domain: "cloud.afuchat.com",
    name: "AfuCloud",
    desc: "Personal cloud storage and file management",
    icon: Cloud,
    color: "bg-sky-50 text-sky-600",
    border: "border-sky-100",
  },
  {
    domain: "blog.afuchat.com",
    name: "AfuBlog",
    desc: "Publish ideas, stories, and long-form content",
    icon: BookOpen,
    color: "bg-amber-50 text-amber-600",
    border: "border-amber-100",
  },
  {
    domain: "build.afuchat.com",
    name: "AfuBuild",
    desc: "Website and application builder for everyone",
    icon: Cpu,
    color: "bg-rose-50 text-rose-600",
    border: "border-rose-100",
  },
  {
    domain: "ads.afuchat.com",
    name: "AfuAds",
    desc: "Digital advertising and audience reach tools",
    icon: Megaphone,
    color: "bg-orange-50 text-orange-600",
    border: "border-orange-100",
  },
  {
    domain: "math.afuchat.com",
    name: "AfuMath",
    desc: "Interactive math education and problem solving",
    icon: Calculator,
    color: "bg-indigo-50 text-indigo-600",
    border: "border-indigo-100",
  },
];

const clients = [
  {
    domain: "honeybeeministriesug.org",
    name: "Honeybee Ministries",
    desc: "Faith-based organization serving communities across Uganda",
  },
  {
    domain: "sabulashoespot.com",
    name: "Sabula Shoe Spot",
    desc: "Quality footwear retail brand for everyday style",
  },
];

const socialLinks = [
  {
    href: "https://afuchat.com/@amkaweesi",
    label: "AfuChat",
    icon: MessageSquare,
  },
  { href: "https://x.com/amkaweesii", label: "X (Twitter)", icon: Twitter },
  { href: "https://github.com/amkaweesi", label: "GitHub", icon: Github },
  {
    href: "https://linkedin.com/in/amkaweesi",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── DESKTOP NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 hidden md:block bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight text-primary">
            AK.
          </a>
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Button size="sm" asChild className="rounded-full px-5">
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="px-5 h-14 flex items-center justify-between">
          <a href="#" className="text-lg font-bold text-primary">AK.</a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="bg-white border-t border-slate-100 px-5 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-700 hover:text-primary py-1 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-at-night-12493-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white/60 to-indigo-50/80" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-sm font-medium text-blue-700 mb-7">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Builder of the AfuChat Ecosystem
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.08] text-slate-900 mb-5">
              AM Kaweesi
              <br />
              <span className="text-primary">Digital Builder.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-9 max-w-2xl">
              Building connected digital systems across communication, payments,
              cloud, publishing, and tools.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="h-13 px-8 text-base rounded-full shadow-md shadow-blue-100"
                asChild
              >
                <a href="#ecosystem">
                  Explore Ecosystem <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-13 px-8 text-base rounded-full border-slate-300 bg-white hover:bg-slate-50"
                asChild
              >
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-6 section-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <motion.div
            {...fadeUp}
            className="grid md:grid-cols-2 gap-14 lg:gap-24 items-center"
          >
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                About
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-snug">
                The Architect of Connectivity
              </h2>
              <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
                <p>
                  I am a builder focused on creating cohesive digital
                  ecosystems. My work centers around the idea that digital tools
                  shouldn't exist in isolation — they should connect, communicate,
                  and compound.
                </p>
                <p>
                  <strong className="text-slate-900 font-semibold">AfuChat</strong>{" "}
                  is the core of this expanding platform — a unified
                  communication layer that branches into payments, cloud
                  storage, publishing, education, and beyond.
                </p>
                <p>
                  Every project I build is designed to be an interconnected
                  piece of a larger, seamless online service architecture.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Services Built", value: "8+" },
                { label: "Ecosystem Products", value: "AfuChat" },
                { label: "Clients Served", value: "Growing" },
                { label: "Vision", value: "Long-term" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-6"
                >
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section id="ecosystem" className="py-28 px-6 section-alt border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Ecosystem
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              The AfuChat Suite
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl">
              A unified collection of interconnected digital services — each
              purpose-built, all connected.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <motion.a
                  key={project.name}
                  href={`https://${project.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  whileHover={{ y: -3 }}
                  className="group flex flex-col p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-250 cursor-pointer"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${project.color} ${project.border} border`}
                  >
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${project.domain}&sz=64`}
                      alt={project.name}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = "flex";
                      }}
                    />
                    <Icon className="w-5 h-5 hidden" />
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 mb-1.5 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-500 flex-1 leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit <ExternalLink className="w-3 h-3" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CLIENTS ── */}
      <section id="clients" className="py-24 px-6 section-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Clients
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Built for Real People
            </h2>
            <p className="text-lg text-slate-500">
              Organizations powered by this ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {clients.map((client, index) => (
              <motion.a
                key={client.name}
                href={`https://${client.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
                whileHover={{ y: -2 }}
                className="group flex items-center gap-5 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-250"
              >
                <div className="w-14 h-14 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${client.domain}&sz=64`}
                    alt={client.name}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      const parent = e.currentTarget.parentElement!;
                      e.currentTarget.style.display = "none";
                      parent.innerHTML = `<span class="text-xl font-bold text-slate-400">${client.name[0]}</span>`;
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-primary transition-colors truncate">
                    {client.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">{client.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISION ── */}
      <section id="vision" className="relative py-28 px-6 overflow-hidden">
        {/* Background video for vision section */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.06]"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-indigo-50/80 to-violet-50/60" />
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div {...fadeUp} className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">
              Vision
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Building for the Long Term
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-12 max-w-2xl mx-auto">
              A unified digital ecosystem spanning communication, payments,
              cloud, publishing, education, and tools — built with scalable
              infrastructure to drive real-world impact across communities.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Infrastructure", value: "Scalable" },
                { label: "Design", value: "Unified" },
                { label: "Impact", value: "Real-world" },
                { label: "Approach", value: "Long-term" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6"
                >
                  <div className="text-xl font-bold text-slate-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="py-28 px-6 section-white border-t border-slate-100"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
                Contact
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">
                Let's Connect
              </h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Interested in the ecosystem? Let's talk about infrastructure,
                collaboration, or what you're building.
              </p>

              <div className="space-y-3 mb-10">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{social.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Send a Message
              </h3>
              <form
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <Input
                    placeholder="Your name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="h-11 border-slate-200 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="h-11 border-slate-200 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <Textarea
                    placeholder="What's on your mind?"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    className="min-h-[120px] resize-none border-slate-200 focus-visible:ring-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-11 text-sm font-medium shadow-sm shadow-blue-100"
                >
                  Send Message <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-6 border-t border-slate-100 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} AM Kaweesi. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2">
        <div className="flex items-center justify-around">
          {[
            { href: "#about", icon: Terminal, label: "About" },
            { href: "#ecosystem", icon: Globe, label: "Ecosystem" },
            { href: "#clients", icon: ChevronRight, label: "Clients" },
            { href: "#contact", icon: MessageSquare, label: "Contact" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center gap-1 text-slate-400 hover:text-primary transition-colors pt-1"
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
