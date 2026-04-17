import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  ExternalLink,
  Mail,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Globe,
  Send,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Cloud,
  BookOpen,
  Megaphone,
  Calculator,
  Menu,
  X,
  ArrowLeft,
  CreditCard,
  Layers,
  Headphones,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ─────────────────────────────────────────────── data ──── */

const projects = [
  { domain: "afuchat.com",        name: "AfuChat",  desc: "Unified communication platform for the modern web",   icon: MessageSquare, brand: { primary: "#0099B8", iconBg: "#e0f7fa", card: "#f0fdff", cardBorder: "#a5f3fc" }, logoUrl: "https://www.afuchat.com/assets/assets/images/afu-symbol.b9ba727f19cc6672bb65a748a7279e4b.png" },
  { domain: "email.afuchat.com",  name: "AfuMail",  desc: "Smart, privacy-first email for the ecosystem",        icon: Mail,          brand: { primary: "#3b82f6", iconBg: "#dbeafe", card: "#eff6ff", cardBorder: "#bfdbfe" } },
  { domain: "pay.afuchat.com",    name: "AfuPay",   desc: "Seamless digital payments and transfers",              icon: CreditCard,    brand: { primary: "#0ea5e9", iconBg: "#e0f2fe", card: "#f0f9ff", cardBorder: "#bae6fd" } },
  { domain: "cloud.afuchat.com",  name: "AfuCloud", desc: "Personal cloud storage and file management",          icon: Cloud,         brand: { primary: "#f97316", iconBg: "#ffedd5", card: "#fff7ed", cardBorder: "#fed7aa" } },
  { domain: "blog.afuchat.com",   name: "AfuBlog",  desc: "Publish ideas, stories, and long-form content",       icon: BookOpen,      brand: { primary: "#14b8a6", iconBg: "#ccfbf1", card: "#f0fdfa", cardBorder: "#99f6e4" } },
  { domain: "build.afuchat.com",  name: "AfuBuild", desc: "Website and application builder for everyone",        icon: Layers,        brand: { primary: "#06b6d4", iconBg: "#cffafe", card: "#ecfeff", cardBorder: "#a5f3fc" } },
  { domain: "ads.afuchat.com",    name: "AfuAds",   desc: "Digital advertising and audience reach tools",        icon: Megaphone,     brand: { primary: "#f97316", iconBg: "#ffedd5", card: "#fff7ed", cardBorder: "#fed7aa" } },
  { domain: "math.afuchat.com",   name: "AfuMath",  desc: "Interactive math education and problem solving",      icon: GraduationCap, brand: { primary: "#3b82f6", iconBg: "#dbeafe", card: "#eff6ff", cardBorder: "#bfdbfe" } },
  { domain: "desk.afuchat.com",   name: "AfuDesk",  desc: "Customer support and helpdesk for the ecosystem",    icon: Headphones,    brand: { primary: "#f97316", iconBg: "#ffedd5", card: "#fff7ed", cardBorder: "#fed7aa" } },
];

const clients = [
  { domain: "honeybeeministriesug.org", name: "Honeybee Ministries", desc: "Faith-based organization serving communities across Uganda", brand: { primary: "#d97706", iconBg: "#fef3c7", card: "#fffbeb", cardBorder: "#fde68a" } },
  { domain: "sabulashoespot.com",        name: "Sabula Shoe Spot",    desc: "Quality footwear retail brand for everyday style",           brand: { primary: "#ca8a04", iconBg: "#fef9c3", card: "#fefce8", cardBorder: "#fef08a" } },
];

const socialLinks = [
  { href: "https://afuchat.com/@amkaweesi", label: "AfuChat", icon: MessageSquare },
  { href: "https://x.com/amkaweesii", label: "X (Twitter)", icon: Twitter },
  { href: "https://github.com/amkaweesi", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/amkaweesi", label: "LinkedIn", icon: Linkedin },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" },
};

/* ──────────────────────────────────────── ServiceLogo ──── */
interface ServiceLogoProps {
  name: string;
  logoUrl?: string;
  FallbackIcon: React.ElementType;
  imgClassName?: string;
  iconClassName?: string;
}

function ServiceLogo({ name, logoUrl, FallbackIcon, imgClassName = "w-7 h-7 object-contain", iconClassName = "w-6 h-6" }: ServiceLogoProps) {
  const [failed, setFailed] = useState(false);

  if (!logoUrl || failed) {
    return <FallbackIcon className={iconClassName} />;
  }

  return (
    <img
      src={logoUrl}
      alt={name}
      className={imgClassName}
      onError={() => setFailed(true)}
    />
  );
}

/* ─────────────────────────────────────── breadcrumb ──── */
function Breadcrumb({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6 select-none">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3 h-3" />}
          <span className={i === items.length - 1 ? "text-primary font-medium" : ""}>{item}</span>
        </span>
      ))}
    </nav>
  );
}

/* ─────────────────────────────────────── nav dropdown ──── */
type DropdownItem = { name: string; desc: string; href: string; domain: string; logoUrl?: string; icon: React.ElementType };
type NavItem = { label: string; href?: string; dropdown?: DropdownItem[] };

const navItems: NavItem[] = [
  {
    label: "Products",
    dropdown: projects.map((p) => ({ name: p.name, desc: p.desc, href: `https://${p.domain}`, domain: p.domain, logoUrl: (p as any).logoUrl, icon: p.icon })),
  },
  { label: "About", href: "#about" },
  { label: "Clients", href: "#clients" },
  { label: "Vision", href: "#vision" },
];

function NavDropdown({ items }: { items: DropdownItem[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden z-[100]"
    >
      {/* arrow */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-slate-200 rotate-45" />
      <div className="grid grid-cols-2 gap-0 p-3">
        {items.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
          >
            <span className="shrink-0 mt-0.5 text-slate-400 group-hover:text-primary transition-colors">
              <ServiceLogo
                name={item.name}
                logoUrl={item.logoUrl}
                FallbackIcon={item.icon}
                imgClassName="w-5 h-5 object-contain"
                iconClassName="w-4 h-4"
              />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900 group-hover:text-primary transition-colors">{item.name}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug line-clamp-2">{item.desc}</p>
            </div>
          </a>
        ))}
      </div>
      <div className="border-t border-slate-100 px-5 py-3 bg-slate-50/60 flex items-center justify-between">
        <span className="text-xs text-slate-500">9 services in the AfuChat ecosystem</span>
        <a href="#ecosystem" className="text-xs font-medium text-primary flex items-center gap-1 hover:underline">
          View all <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────── main component ──── */
export default function Home() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", dragFree: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };
  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  useEffect(() => () => { if (dropdownTimer.current) clearTimeout(dropdownTimer.current); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ══════════ VERCEL-STYLE NAVBAR ══════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/70 shadow-sm">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="#" className="text-lg font-bold tracking-tight text-primary shrink-0">AMK.</a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeDropdown === item.label
                        ? "text-primary bg-slate-50"
                        : "text-slate-600 hover:text-primary hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                )}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <NavDropdown items={item.dropdown} />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Button size="sm" className="rounded-full px-5 text-sm" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-5 py-3 flex flex-col gap-1">
                {/* Products with sub-expand */}
                <button
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Products
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pb-1 flex flex-col gap-0.5">
                        {projects.map((p) => {
                          const Icon = p.icon;
                          return (
                            <a
                              key={p.name}
                              href={`https://${p.domain}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors"
                            >
                              <Icon className="w-4 h-4 text-slate-400" />
                              {p.name}
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {[{ label: "About", href: "#about" }, { label: "Clients", href: "#clients" }, { label: "Vision", href: "#vision" }, { label: "Contact", href: "#contact" }].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ))}

                <div className="pt-2 pb-1">
                  <Button className="w-full rounded-full" asChild>
                    <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Get in Touch</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-[0.07]">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-at-night-12493-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/70 to-indigo-50/80" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full pt-28 pb-16">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            {/* breadcrumb */}
            <Breadcrumb items={["AMK", "Portfolio", "Home"]} />

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
              Building connected digital systems across communication, payments, cloud, publishing, and tools.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="px-8 text-base rounded-full shadow-md shadow-blue-100" asChild>
                <a href="#ecosystem">Explore Ecosystem <ArrowRight className="ml-2 w-4 h-4" /></a>
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-base rounded-full border-slate-300 bg-white hover:bg-slate-50" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ ABOUT ══════════ */}
      <section id="about" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={["AMK", "About"]} />
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">About</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-snug">The Architect of Connectivity</h2>
              <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
                <p>I am a builder focused on creating cohesive digital ecosystems. Digital tools shouldn't exist in isolation — they should connect, communicate, and compound.</p>
                <p><strong className="text-slate-900 font-semibold">AfuChat</strong> is the core of this expanding platform — a unified communication layer that branches into payments, cloud storage, publishing, education, and beyond.</p>
                <p>Every project I build is designed to be an interconnected piece of a larger, seamless online service architecture.</p>
              </div>
            </div>

            {/* stat cards — stacked */}
            <div className="flex flex-col gap-3">
              {[
                { label: "Services Built", value: "9+", note: "Across communication, cloud, payments & more" },
                { label: "Core Platform", value: "AfuChat", note: "Unified ecosystem hub" },
                { label: "Vision", value: "Long-term", note: "Infrastructure-first, community-driven" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="text-2xl font-bold text-slate-900 mb-0.5">{stat.value}</div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">{stat.label}</div>
                  <div className="text-sm text-slate-500 leading-snug">{stat.note}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ ECOSYSTEM — CAROUSEL ══════════ */}
      <section id="ecosystem" className="py-28 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumb items={["AMK", "Products", "Ecosystem"]} />
          <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Ecosystem</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">The AfuChat Suite</h2>
              <p className="text-lg text-slate-500 max-w-xl">A unified collection of 9 interconnected digital services — each purpose-built, all connected.</p>
            </div>
            {/* carousel controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={scrollPrev} className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                <ArrowLeft className="w-4 h-4 text-slate-600" />
              </button>
              <button onClick={scrollNext} className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm">
                <ArrowRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* embla carousel — full width, overflow visible */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 px-6 md:px-[calc((100vw-72rem)/2+1.5rem)]">
            {projects.map((project) => (
                <a
                  key={project.name}
                  href={`https://${project.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col flex-[0_0_220px] md:flex-[0_0_240px] p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-250 cursor-pointer"
                  style={{ background: project.brand.card, borderWidth: 1, borderStyle: "solid", borderColor: project.brand.cardBorder }}
                >
                  <div className="mb-5 p-2.5 rounded-xl inline-flex w-fit" style={{ background: project.brand.iconBg, color: project.brand.primary }}>
                    <ServiceLogo
                      name={project.name}
                      logoUrl={(project as any).logoUrl}
                      FallbackIcon={project.icon}
                      imgClassName="w-7 h-7 object-contain"
                      iconClassName="w-7 h-7"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1.5 transition-colors" style={{ ["--tw-text-opacity" as string]: 1 }}>{project.name}</h3>
                  <p className="text-sm text-slate-500 flex-1 leading-relaxed">{project.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: project.brand.primary }}>
                    Visit <ExternalLink className="w-3 h-3" />
                  </div>
                </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CLIENTS ══════════ */}
      <section id="clients" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={["AMK", "Clients"]} />
          <motion.div {...fadeUp} className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Clients</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Built for Real People</h2>
            <p className="text-lg text-slate-500">Organizations powered by this ecosystem.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {clients.map((client, index) => (
              <motion.div key={client.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.12 }}>
                <a
                  href={`https://${client.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-4 p-6 rounded-2xl hover:shadow-md transition-all h-full"
                  style={{ background: client.brand.card, borderWidth: 1, borderStyle: "solid", borderColor: client.brand.cardBorder }}
                >
                  <div className="p-2.5 rounded-xl inline-flex w-fit transition-colors" style={{ background: client.brand.iconBg, color: client.brand.primary }}>
                    <ServiceLogo
                      name={client.name}
                      FallbackIcon={Globe}
                      imgClassName="w-7 h-7 object-contain"
                      iconClassName="w-7 h-7"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-slate-900 mb-1">{client.name}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{client.desc}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-500">Client</span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: client.brand.iconBg, color: client.brand.primary }}>Active</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-0.5 transition-all" style={{ color: client.brand.primary }} />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ VISION ══════════ */}
      <section id="vision" className="relative py-28 px-6 overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-[0.06]">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-indigo-50/80 to-violet-50/60" />
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Breadcrumb items={["AMK", "Vision"]} />
          <motion.div {...fadeUp} className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4">Vision</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">Building for the Long Term</h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-12 max-w-2xl mx-auto">
              A unified digital ecosystem spanning communication, payments, cloud, publishing, education, and tools — built with scalable infrastructure to drive real-world impact.
            </p>

            {/* horizontal divider stat strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {[
                { label: "Infrastructure", value: "Scalable" },
                { label: "Design", value: "Unified" },
                { label: "Impact", value: "Real-world" },
                { label: "Approach", value: "Long-term" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 text-center">
                  <div className="text-xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section id="contact" className="py-28 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={["AMK", "Contact"]} />
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Contact</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">Let's Connect</h2>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Interested in the ecosystem? Let's talk about infrastructure, collaboration, or what you're building.
              </p>

              {/* horizontal social link strip */}
              <div className="flex flex-col gap-0">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <div key={social.label}>
                      {i > 0 && <div className="h-px bg-slate-100" />}
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 py-4 group hover:bg-slate-50 -mx-3 px-3 rounded-xl transition-colors"
                      >
                        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                          <Icon className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-primary transition-colors flex-1">{social.label}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-primary transition-colors" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Send a Message</h3>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Name</label>
                  <Input placeholder="Your name" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="h-11 border-slate-200 focus-visible:ring-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <Input type="email" placeholder="your@email.com" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="h-11 border-slate-200 focus-visible:ring-primary" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <Textarea placeholder="What's on your mind?" value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="min-h-[120px] resize-none border-slate-200 focus-visible:ring-primary" />
                </div>
                <Button type="submit" className="w-full h-11 text-sm font-medium shadow-sm shadow-blue-100">
                  Send Message <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="py-8 px-6 border-t border-slate-100 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-primary">AMK.</span>
            <div className="h-4 w-px bg-slate-200" />
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} AM Kaweesi. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label={social.label}>
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
