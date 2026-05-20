import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  ExternalLink, Mail, ArrowRight, Github, Twitter, Linkedin,
  Globe, Send, MessageSquare, ChevronRight, ChevronDown,
  Cloud, BookOpen, Megaphone, Calculator, Menu, X,
  CreditCard, Headphones, GraduationCap, Code2, Sparkles, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ─────────────────────────────────────────────── data ──── */

const PROFILE_IMG = "https://pbs.twimg.com/profile_images/2001772163410325504/Hf3dXqTN_400x400.jpg";

const projects = [
  { domain: "afuchat.com",       name: "AfuChat",     desc: "Unified communication platform for the modern web",                      icon: MessageSquare, brand: { primary: "#00BCD4", iconBg: "#e0f7fa", card: "#faf8f3", cardBorder: "#b2ebf2", dark: false }, logoUrl: "/favicons/afuchat.png" },
  { domain: "email.afuchat.com", name: "AfuMail",     desc: "Smart, privacy-first email for the ecosystem",                           icon: Mail,          brand: { primary: "#3b82f6", iconBg: "#1e3a5f", card: "#0a0a0a", cardBorder: "#1e2a3a", dark: true  }, logoUrl: "/favicons/email.afuchat.com.svg" },
  { domain: "cloud.afuchat.com", name: "AfuCloud",    desc: "Personal cloud storage and file management",                             icon: Cloud,         brand: { primary: "#f97316", iconBg: "#ffedd5", card: "#ffffff", cardBorder: "#fed7aa", dark: false }, logoUrl: "/favicons/cloud.afuchat.com.ico" },
  { domain: "blog.afuchat.com",  name: "AfuBlog",     desc: "Publish ideas, stories, and long-form content",                          icon: BookOpen,      brand: { primary: "#14b8a6", iconBg: "#ccfbf1", card: "#ffffff", cardBorder: "#99f6e4", dark: false }, logoUrl: "/favicons/blog.afuchat.com.ico" },
  { domain: "ads.afuchat.com",   name: "AfuAds",      desc: "Digital advertising and audience reach tools",                           icon: Megaphone,     brand: { primary: "#f97316", iconBg: "#ffedd5", card: "#ffffff", cardBorder: "#fed7aa", dark: false }, logoUrl: "/favicons/ads.afuchat.com.svg" },
  { domain: "math.afuchat.com",  name: "AfuMath",     desc: "Interactive math education and problem solving",                         icon: GraduationCap, brand: { primary: "#3b82f6", iconBg: "#1a2050", card: "#0f0f1a", cardBorder: "#1e2040", dark: true  }, logoUrl: "/favicons/math.afuchat.com.png" },
  { domain: "desk.afuchat.com",  name: "AfuDesk",     desc: "Customer support and helpdesk for the ecosystem",                        icon: Headphones,    brand: { primary: "#f97316", iconBg: "#2a1800", card: "#111111", cardBorder: "#2a2a2a", dark: true  }, logoUrl: "/favicons/desk.afuchat.com.ico" },
  { domain: "dev.afuchat.com",   name: "AfuChat.dev", desc: "Professional full-stack web and mobile development in Uganda",           icon: Code2,         brand: { primary: "#a855f7", iconBg: "#f3e8ff", card: "#ffffff", cardBorder: "#e9d5ff", dark: false }, logoUrl: "/favicons/dev.afuchat.com.svg", ctaLabel: "Get a Quote", ctaHref: "https://dev.afuchat.com/estimate" },
];

const clients = [
  { domain: "pay.afuchat.com",          name: "SkyPay",              desc: "Payments API powering seamless UGX collections and transfers",                     icon: CreditCard, brand: { primary: "#60a5fa", iconBg: "#0c2340", card: "#0d1117", cardBorder: "#1e2d3d", dark: true  } },
  { domain: "honeybeeministriesug.org", name: "Honeybee Ministries", desc: "Faith-based organization serving communities across Uganda",                       icon: Globe,      brand: { primary: "#d97706", iconBg: "#fef3c7", card: "#fffbeb", cardBorder: "#fde68a", dark: false }, logoUrl: "/favicons/honeybeeministriesug.org.ico", founderImg: "https://github.com/afuchat1/honeybee/blob/main/src/assets/founder-portrait.jpg?raw=true", founderLabel: "Founder" },
  { domain: "sabulashoespot.com",        name: "Sabula Shoe Spot",   desc: "Quality footwear retail brand for everyday style",                                  icon: Globe,      brand: { primary: "#f59e0b", iconBg: "#1a1500", card: "#0a0a00", cardBorder: "#2a2000", dark: true  }, logoUrl: "/favicons/sabulashoespot.com.jpg" },
  { domain: "mmradioug.org",             name: "MM Radio Uganda",    desc: "Online radio station keeping Uganda connected through music, news and culture",      icon: Globe,      brand: { primary: "#ef4444", iconBg: "#fef2f2", card: "#ffffff", cardBorder: "#fecaca", dark: false }, logoUrl: "/favicons/mmradioug.org.png" },
];

const partners = [
  { domain: "ajsdigitalservices.com", name: "AJS Digital Services", desc: "IT training and digital services empowering careers across Africa", icon: Globe, brand: { primary: "#f97316", iconBg: "#fff7ed", card: "#ffffff", cardBorder: "#fed7aa", dark: false }, logoUrl: "/favicons/ajsdigitalservices.com.png", founderImg: "https://dev.afuchat.com/assets/cofounder-photo-Bw4GhOPz.jpg", founderLabel: "Founder" },
];

const socialLinks = [
  { href: "https://afuchat.com/@amkaweesi", label: "AfuChat",      icon: MessageSquare, logoUrl: "/favicons/afuchat.png" },
  { href: "https://t.me/amkaweesi",          label: "Telegram",     icon: Send },
  { href: "https://x.com/amkaweesii",        label: "X (Twitter)",  icon: Twitter },
  { href: "https://github.com/amkaweesi",    label: "GitHub",       icon: Github },
  { href: "https://linkedin.com/in/amkaweesi", label: "LinkedIn",   icon: Linkedin },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

/* ─────────────────────────────────────────── ServiceLogo ──── */
interface ServiceLogoProps {
  name: string; domain: string; logoUrl?: string;
  FallbackIcon: React.ElementType; imgClassName?: string; iconClassName?: string;
}
function ServiceLogo({ name, logoUrl, FallbackIcon, imgClassName = "w-7 h-7 object-contain", iconClassName = "w-6 h-6" }: ServiceLogoProps) {
  const [failed, setFailed] = useState(false);
  if (!logoUrl || failed) return <FallbackIcon className={iconClassName} />;
  return <img src={logoUrl} alt={name} className={imgClassName} onError={() => setFailed(true)} />;
}

/* ─────────────────────────────────────────── Breadcrumb ──── */
function Breadcrumb({ items, light = false }: { items: string[]; light?: boolean }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs mb-6 select-none" style={{ color: light ? "rgba(255,255,255,0.4)" : "#94a3b8" }}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3 h-3" />}
          <span style={i === items.length - 1 ? { color: light ? "rgba(255,255,255,0.85)" : "#3b82f6", fontWeight: 600 } : {}}>{item}</span>
        </span>
      ))}
    </nav>
  );
}

/* ─────────────────────────────────────── nav dropdown type ──── */
type DropdownItem = { name: string; desc: string; href: string; domain: string; logoUrl?: string; icon: React.ElementType };
type NavItem = { label: string; href?: string; dropdown?: DropdownItem[] };

const navItems: NavItem[] = [
  { label: "Products", dropdown: projects.map((p) => ({ name: p.name, desc: p.desc, href: `https://${p.domain}`, domain: p.domain, logoUrl: p.logoUrl, icon: p.icon })) },
  { label: "About", href: "#about" },
  { label: "Clients", dropdown: clients.map((c) => ({ name: c.name, desc: c.desc, href: `https://${c.domain}`, domain: c.domain, logoUrl: (c as any).logoUrl, icon: c.icon })) },
  { label: "Partners", dropdown: partners.map((p) => ({ name: p.name, desc: p.desc, href: `https://${p.domain}`, domain: p.domain, logoUrl: (p as any).logoUrl, icon: p.icon })) },
  { label: "Vision", href: "#vision" },
];

function NavDropdown({ items, footer }: { items: DropdownItem[]; footer: { text: string; href: string; linkLabel: string } }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.16 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[500px] bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/70 overflow-hidden z-[100]"
    >
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-slate-200 rotate-45" />
      <div className="grid grid-cols-2 gap-0 p-3">
        {items.map((item) => (
          <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
          >
            <span className="shrink-0 mt-0.5 text-slate-400 group-hover:text-blue-600 transition-colors">
              <ServiceLogo name={item.name} domain={item.domain} logoUrl={item.logoUrl} FallbackIcon={item.icon} imgClassName="w-5 h-5 object-contain" iconClassName="w-4 h-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{item.name}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug line-clamp-2">{item.desc}</p>
            </div>
          </a>
        ))}
      </div>
      <div className="border-t border-slate-100 px-5 py-3 bg-slate-50/80 flex items-center justify-between">
        <span className="text-xs text-slate-500">{footer.text}</span>
        <a href={footer.href} className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:underline">
          {footer.linkLabel} <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────── github heatmap ──── */
type ContribDay = { date: string; count: number; level: number };
const LEVEL_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const AVAILABLE_YEARS = [2026, 2025, 2024];

function HeroHeatmap() {
  const [year, setYear] = useState<number>(AVAILABLE_YEARS[0]);
  const [days, setDays] = useState<ContribDay[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setDays(null); setError(null);
    fetch(`https://github-contributions-api.jogruber.de/v4/afuchat1?y=${year}`)
      .then((r) => { if (!r.ok) throw new Error(`${r.status}`); return r.json(); })
      .then((data) => {
        if (cancelled) return;
        const contribs: ContribDay[] = data?.contributions ?? [];
        setDays(contribs);
        const yr = data?.total?.[String(year)];
        setTotal(typeof yr === "number" ? yr : contribs.reduce((s, d) => s + d.count, 0));
      })
      .catch((e) => { if (!cancelled) setError(String(e.message ?? e)); });
    return () => { cancelled = true; };
  }, [year]);

  const weeks: (ContribDay | null)[][] = [];
  if (days && days.length > 0) {
    const firstDow = new Date(days[0].date + "T00:00:00").getDay();
    let week: (ContribDay | null)[] = Array(firstDow).fill(null);
    for (const d of days) {
      week.push(d);
      if (week.length === 7) { weeks.push(week); week = []; }
    }
    if (week.length > 0) { while (week.length < 7) week.push(null); weeks.push(week); }
  }

  const monthLabels: { idx: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((w, i) => {
    const firstDay = w.find((d) => d !== null);
    if (!firstDay) return;
    const m = new Date(firstDay.date + "T00:00:00").getMonth();
    if (m !== lastMonth) { monthLabels.push({ idx: i, label: MONTH_NAMES[m] }); lastMonth = m; }
  });

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-5 md:p-6">
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-2.5 min-w-0">
          <Github className="w-4 h-4 text-slate-300 shrink-0" />
          <span className="text-sm font-semibold text-white">
            {total !== null ? `${total.toLocaleString()} contributions` : "Loading…"}
          </span>
          <span className="text-sm text-slate-500">in {year}</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 ml-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
          </span>
        </div>
        <div className="inline-flex items-center gap-1 p-0.5 rounded-full bg-slate-800 border border-slate-700">
          {AVAILABLE_YEARS.map((y) => (
            <button key={y} onClick={() => setYear(y)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${year === y ? "bg-slate-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"}`}
            >{y}</button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="py-10 text-center">
          <a href="https://github.com/afuchat1" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:underline">
            <Github className="w-4 h-4" /> View on GitHub
          </a>
        </div>
      ) : days === null ? (
        <div className="h-[120px] flex items-center justify-center">
          <div className="text-sm text-slate-600">Loading {year}…</div>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-1 px-1">
          <div className="inline-block min-w-full">
            <div className="flex pl-7 mb-1.5 text-[10px] text-slate-600 select-none" style={{ gap: 3 }}>
              {weeks.map((_, i) => {
                const label = monthLabels.find((m) => m.idx === i)?.label ?? "";
                return <div key={i} style={{ width: 11, minWidth: 11 }} className="text-left">{label}</div>;
              })}
            </div>
            <div className="flex">
              <div className="flex flex-col mr-2 text-[10px] text-slate-600 select-none" style={{ gap: 3 }}>
                {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                  <div key={i} style={{ height: 11, lineHeight: "11px" }}>{d}</div>
                ))}
              </div>
              <div className="flex" style={{ gap: 3 }}>
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col" style={{ gap: 3 }}>
                    {week.map((day, di) => (
                      <div key={di}
                        title={day ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}` : ""}
                        className="rounded-[2px] transition-transform hover:scale-125 cursor-default"
                        style={{ width: 11, height: 11, background: day ? LEVEL_COLORS[day.level] : "transparent", border: day && day.level === 0 ? "1px solid #333" : "none" }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
              <a href="https://github.com/afuchat1" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-blue-400 transition-colors">
                <Github className="w-3.5 h-3.5" /> @afuchat1 on GitHub <ArrowRight className="w-3 h-3" />
              </a>
              <div className="flex items-center gap-2 text-[10px] text-slate-600">
                <span>Less</span>
                <div className="flex" style={{ gap: 3 }}>
                  {LEVEL_COLORS.map((c, i) => (
                    <div key={i} className="rounded-[2px]" style={{ width: 11, height: 11, background: c, border: i === 0 ? "1px solid #333" : "none" }} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────── Marquee stats ──── */
const STATS = [
  `${projects.length} Products Built`,
  "AfuChat Ecosystem",
  "Uganda × Global",
  "Full-Stack Builder",
  `${clients.length} Active Clients`,
  "Payments · Cloud · Comms",
  "Open for Projects",
  "Infrastructure-First",
];

function StatsTicker() {
  const items = [...STATS, ...STATS];
  return (
    <div className="overflow-hidden py-4 border-y border-slate-800 bg-slate-950/80">
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-500 shrink-0">
            <Zap className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────── main component ──── */
export default function Home() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [visitCounts, setVisitCounts] = useState<Record<string, number>>({});
  const [adDismissed, setAdDismissed] = useState(false);
  const [adVisible, setAdVisible] = useState(false);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAdVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    fetch("/api/visits")
      .then((r) => r.json())
      .then((data) => { if (data?.counts) setVisitCounts(data.counts); })
      .catch(() => {});
  }, []);

  const trackVisit = (domain: string) => {
    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ domain }) })
      .then((r) => r.json())
      .then((data) => { if (data?.count !== undefined) setVisitCounts((prev) => ({ ...prev, [domain]: data.count })); })
      .catch(() => {});
  };

  const handleMouseEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };
  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 130);
  };
  useEffect(() => () => { if (dropdownTimer.current) clearTimeout(dropdownTimer.current); }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>

      {/* ── scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
        style={{ scaleX, background: "linear-gradient(90deg, #3b82f6, #a855f7, #06b6d4)" }}
      />

      {/* ══════════ NAVBAR ══════════ */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/70">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-4">

          <a href="#" className="text-lg font-bold tracking-tight text-white shrink-0">
            AMK<span className="text-blue-500">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {navItems.map((item) => (
              <div key={item.label} className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.href ? (
                  <a href={item.href}
                    className="flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors">
                    {item.label}
                  </a>
                ) : (
                  <button className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${activeDropdown === item.label ? "text-white bg-slate-800/60" : "text-slate-400 hover:text-white hover:bg-slate-800/60"}`}>
                    {item.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180 text-blue-400" : ""}`} />
                  </button>
                )}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <NavDropdown items={item.dropdown} footer={
                      item.label === "Clients"
                        ? { text: `${clients.length} active clients`, href: "#clients", linkLabel: "View all" }
                        : item.label === "Partners"
                        ? { text: `${partners.length} ecosystem partner${partners.length !== 1 ? "s" : ""}`, href: "#partners", linkLabel: "View all" }
                        : { text: `${projects.length} services in the AfuChat ecosystem`, href: "#ecosystem", linkLabel: "View all" }
                    } />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Button size="sm" className="rounded-full px-5 text-sm bg-blue-600 hover:bg-blue-500 border-0 text-white" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          <button className="md:hidden p-2 text-slate-400 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }} className="md:hidden bg-slate-950 border-t border-slate-800 overflow-hidden"
            >
              <div className="px-5 py-3 flex flex-col gap-1">
                <button onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors">
                  Products
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileProductsOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.18 }} className="overflow-hidden">
                      <div className="pl-4 pb-1 flex flex-col gap-0.5">
                        {projects.map((p) => {
                          const Icon = p.icon;
                          return (
                            <a key={p.name} href={`https://${p.domain}`} target="_blank" rel="noopener noreferrer"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                              <Icon className="w-4 h-4 text-slate-600" /> {p.name}
                            </a>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {[{ label: "About", href: "#about" }, { label: "Clients", href: "#clients" }, { label: "Partners", href: "#partners" }, { label: "Vision", href: "#vision" }, { label: "Contact", href: "#contact" }].map((item) => (
                  <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
                    {item.label}
                  </a>
                ))}
                <div className="pt-2 pb-1">
                  <Button className="w-full rounded-full bg-blue-600 hover:bg-blue-500 text-white border-0" asChild>
                    <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Get in Touch</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section className="relative pt-24 pb-0 overflow-hidden bg-slate-950">
        {/* animated gradient orbs — replace video */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div
            className="absolute -top-48 -left-48 w-[750px] h-[750px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 68%)" }}
            animate={{ x: [0, 70, 0], y: [0, 50, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" as const }}
          />
          <motion.div
            className="absolute top-10 right-[-80px] w-[580px] h-[580px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 68%)" }}
            animate={{ x: [0, -55, 0], y: [0, 65, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" as const, delay: 1.2 }}
          />
          <motion.div
            className="absolute bottom-[-60px] left-1/3 w-[550px] h-[550px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 68%)" }}
            animate={{ x: [0, 45, 0], y: [0, -35, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" as const, delay: 2.5 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-[320px] h-[320px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 68%)" }}
            animate={{ x: [0, -30, 0], y: [0, -40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 }}
          />
        </div>

        {/* grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12">
          <Breadcrumb items={["AMK", "Portfolio", "Home"]} light />

          {/* two-column hero layout */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-start pb-16">
            <div>
              {/* status badge */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for projects · Based in Uganda
              </motion.div>

              {/* headline */}
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.05 }}
                className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight text-white mb-6">
                AM<br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #60a5fa 0%, #a855f7 50%, #06b6d4 100%)" }}>
                  Kaweesi
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl mb-8">
                Building connected digital systems across communication, payments, cloud, publishing, and tools.
                Founder of the <span className="text-white font-semibold">AfuChat Ecosystem</span>.
              </motion.p>

              {/* stat row */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
                className="flex flex-wrap gap-6 mb-10">
                {[
                  { value: `${projects.length}`, label: "Products" },
                  { value: `${clients.length}`, label: "Clients" },
                  { value: `${partners.length}`, label: "Partners" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap items-center gap-3 mb-12">
                <a href="#ecosystem" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}>
                  Explore Ecosystem <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 transition-all">
                  Contact Me
                </a>
              </motion.div>

              {/* github heatmap */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
                <HeroHeatmap />
              </motion.div>
            </div>

            {/* profile photo column */}
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="hidden lg:flex flex-col items-center gap-5 pt-8">
              <div className="relative">
                <div className="w-[220px] h-[220px] rounded-3xl overflow-hidden ring-1 ring-slate-700 shadow-2xl shadow-blue-900/30">
                  <img src={PROFILE_IMG} alt="AM Kaweesi" className="w-full h-full object-cover" />
                </div>
                {/* floating badge */}
                <div className="absolute -bottom-4 -right-4 px-3 py-1.5 rounded-full border border-slate-700 bg-slate-900 text-xs font-semibold text-slate-300 shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-blue-400" /> Digital Builder
                </div>
              </div>
              {/* social links */}
              <div className="flex items-center gap-2 mt-6">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                      className="w-9 h-9 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center hover:border-blue-500/50 hover:bg-slate-800 transition-all overflow-hidden">
                      {(s as any).logoUrl
                        ? <img src={(s as any).logoUrl} alt={s.label} className="w-4 h-4 object-contain" />
                        : <Icon className="w-4 h-4 text-slate-500" />}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* stats ticker */}
        <StatsTicker />
      </section>

      {/* ══════════ ABOUT ══════════ */}
      <section id="about" className="py-28 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={["AMK", "About"]} />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* big stats */}
            <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
              {[
                { value: `${projects.length}`, label: "Products", sub: "Across the AfuChat ecosystem", accent: true },
                { value: `${clients.length}`, label: "Clients", sub: "Organizations powered by this work", accent: false },
                { value: "2022", label: "Founded", sub: "AfuChat Ecosystem launched", accent: false },
                { value: "∞", label: "Vision", sub: "Infrastructure-first, long-term", accent: false },
              ].map((stat, i) => (
                <div key={i} className={`p-6 rounded-2xl border ${stat.accent ? "bg-blue-600 border-blue-500" : "bg-slate-50 border-slate-100"}`}>
                  <div className={`text-4xl font-bold mb-1 ${stat.accent ? "text-white" : "text-slate-900"}`}>{stat.value}</div>
                  <div className={`text-xs font-bold uppercase tracking-widest mb-1.5 ${stat.accent ? "text-blue-200" : "text-blue-600"}`}>{stat.label}</div>
                  <div className={`text-xs leading-snug ${stat.accent ? "text-blue-100" : "text-slate-500"}`}>{stat.sub}</div>
                </div>
              ))}
            </motion.div>

            {/* text */}
            <motion.div {...fadeUp}>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-0.5 rounded-2xl" style={{ background: "linear-gradient(135deg,#3b82f6,#a855f7,#06b6d4)" }}>
                  <img src={PROFILE_IMG} alt="AM Kaweesi" className="w-16 h-16 object-cover rounded-2xl block" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-0.5">About</p>
                  <p className="text-base font-semibold text-slate-900">AM Kaweesi</p>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">The Architect<br />of Connectivity</h2>

              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                <p>I am a builder focused on creating cohesive digital ecosystems. Digital tools shouldn't exist in isolation — they should connect, communicate, and compound.</p>
                <p><strong className="text-slate-900 font-semibold">AfuChat</strong> is the core of this expanding platform — a unified communication layer that branches into payments, cloud storage, publishing, education, and beyond.</p>
                <p>Every project I build is designed to be an interconnected piece of a larger, seamless online service architecture.</p>
              </div>

              <div className="mt-8 flex gap-3">
                <a href="#ecosystem" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors">
                  View Ecosystem <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors">
                  Get in Touch
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ ECOSYSTEM ══════════ */}
      <section id="ecosystem" className="py-28 border-t border-slate-100 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumb items={["AMK", "Products", "Ecosystem"]} />

          <motion.div {...fadeUp} className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Ecosystem
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.0] tracking-tight mb-4">
              The AfuChat Suite.
              <br />
              <span className="text-slate-500">{projects.length} services. One vision.</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mb-5">
              A unified collection of interconnected digital services — communication, payments, cloud, publishing, education, and tools.
            </p>
            <div className="flex items-center gap-2.5">
              <div className="p-0.5 rounded-full" style={{ background: "linear-gradient(135deg,#3b82f6,#a855f7)" }}>
                <img src={PROFILE_IMG} alt="AM Kaweesi" className="w-7 h-7 rounded-full object-cover block" />
              </div>
              <span className="text-sm text-slate-500">Built by <span className="font-semibold text-slate-700">AM Kaweesi</span></span>
            </div>
          </motion.div>

          {/* bento grid — first two cards are wide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((project, idx) => {
              const visits = visitCounts[project.domain];
              const ctaHref = (project as any).ctaHref as string | undefined;
              const ctaLabel = (project as any).ctaLabel as string | undefined;
              const isFeature = idx < 2;
              const txtMain = project.brand.dark ? "#f1f5f9" : "#0f172a";
              const txtSub  = project.brand.dark ? "#94a3b8" : "#64748b";
              const txtMuted = project.brand.dark ? "#64748b" : "#94a3b8";

              return (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: Math.min(idx * 0.06, 0.4) }}
                  onClick={() => { trackVisit(project.domain); window.open(`https://${project.domain}`, "_blank"); }}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${isFeature ? "lg:col-span-2 min-h-[300px]" : "min-h-[240px]"}`}
                  style={{ background: project.brand.card, borderWidth: 1, borderStyle: "solid", borderColor: project.brand.cardBorder }}
                >
                  {/* brand top stripe */}
                  <div className="h-1 w-full shrink-0" style={{ background: `linear-gradient(90deg, ${project.brand.primary}, ${project.brand.primary}aa)` }} />

                  {/* glow */}
                  <div className="pointer-events-none absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-500"
                    style={{ background: project.brand.primary }} />

                  <div className="relative flex flex-col flex-1 p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="rounded-xl inline-flex items-center justify-center p-2.5"
                        style={{ background: project.brand.iconBg, color: project.brand.primary }}>
                        <ServiceLogo name={project.name} domain={project.domain} logoUrl={project.logoUrl} FallbackIcon={project.icon}
                          imgClassName="object-contain rounded w-7 h-7" iconClassName="w-7 h-7" />
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-40 transition-opacity" style={{ color: txtMuted }} />
                    </div>

                    <h3 className="font-bold mb-1.5 text-base" style={{ color: txtMain }}>{project.name}</h3>
                    <p className="text-sm leading-relaxed flex-1 line-clamp-3" style={{ color: txtSub }}>{project.desc}</p>

                    <div className="mt-4 pt-3 border-t flex items-center justify-between gap-3" style={{ borderColor: project.brand.cardBorder }}>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-xs truncate font-medium" style={{ color: txtMuted }}>{project.domain}</span>
                        {visits ? <span className="text-[10px]" style={{ color: txtMuted }}>{visits.toLocaleString()} {visits === 1 ? "visit" : "visits"}</span> : null}
                      </div>
                      {ctaHref ? (
                        <a href={ctaHref} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                          className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all group-hover:scale-105"
                          style={{ background: project.brand.primary, color: "#ffffff" }}>
                          {ctaLabel} <ArrowRight className="w-3 h-3" />
                        </a>
                      ) : (
                        <div className="shrink-0 w-8 h-8 rounded-full inline-flex items-center justify-center transition-all group-hover:scale-110"
                          style={{ background: project.brand.iconBg, color: project.brand.primary }}>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ CLIENTS ══════════ */}
      <section id="clients" className="py-28 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={["AMK", "Clients"]} />

          <motion.div {...fadeUp} className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Clients
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-3">
              Built for Real People
            </h2>
            <p className="text-lg text-slate-500 max-w-xl">Organizations and brands powered by this ecosystem.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {clients.map((client, index) => {
              const txtMain  = client.brand.dark ? "#f1f5f9" : "#0f172a";
              const txtSub   = client.brand.dark ? "#94a3b8" : "#64748b";
              return (
                <motion.div key={client.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}>
                  <a href={`https://${client.domain}`} target="_blank" rel="noopener noreferrer"
                    onClick={() => trackVisit(client.domain)}
                    className="group flex flex-col gap-5 p-7 rounded-2xl hover:shadow-xl transition-all h-full overflow-hidden relative"
                    style={{ background: client.brand.card, borderWidth: 1, borderStyle: "solid", borderColor: client.brand.cardBorder }}>

                    {/* left accent bar */}
                    <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full" style={{ background: client.brand.primary }} />

                    {/* top row */}
                    <div className="flex items-start justify-between gap-4 pl-3">
                      <div className="p-2.5 rounded-xl inline-flex w-fit" style={{ background: client.brand.iconBg, color: client.brand.primary }}>
                        <ServiceLogo name={client.name} domain={client.domain} logoUrl={(client as any).logoUrl} FallbackIcon={client.icon}
                          imgClassName="w-8 h-8 object-contain rounded" iconClassName="w-8 h-8" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: client.brand.iconBg, color: client.brand.primary }}>Active</span>
                      </div>
                    </div>

                    {/* content */}
                    <div className="flex-1 pl-3">
                      <h3 className="text-lg font-bold mb-2" style={{ color: txtMain }}>{client.name}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: txtSub }}>{client.desc}</p>
                    </div>

                    {/* founder row */}
                    {(client as any).founderImg && (
                      <div className="flex items-center gap-3 pl-3">
                        <div className="p-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${client.brand.primary}, #fbbf24)` }}>
                          <img src={(client as any).founderImg} alt={(client as any).founderLabel ?? "Founder"}
                            className="w-8 h-8 rounded-full object-cover block" />
                        </div>
                        <span className="text-xs font-medium" style={{ color: txtSub }}>{(client as any).founderLabel ?? "Founder"}</span>
                      </div>
                    )}

                    {/* footer */}
                    <div className="flex items-center justify-between pl-3 pt-2 border-t" style={{ borderColor: client.brand.cardBorder }}>
                      <span className="text-xs font-medium" style={{ color: client.brand.dark ? "#475569" : "#94a3b8" }}>{client.domain}</span>
                      <div className="flex items-center gap-2">
                        {visitCounts[client.domain] ? (
                          <span className="text-xs" style={{ color: client.brand.dark ? "#475569" : "#94a3b8" }}>
                            {visitCounts[client.domain].toLocaleString()} visit{visitCounts[client.domain] !== 1 ? "s" : ""}
                          </span>
                        ) : null}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" style={{ color: client.brand.primary }} />
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════ PARTNERS ══════════ */}
      <section id="partners" className="py-28 px-6 border-t border-slate-100 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={["AMK", "Partners"]} />

          <motion.div {...fadeUp} className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-700 text-xs font-semibold mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Partners
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-tight mb-3">Trusted Collaborators</h2>
            <p className="text-lg text-slate-500 max-w-xl">Organizations we work alongside to deliver greater impact across Africa.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {partners.map((partner, index) => (
              <motion.div key={partner.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}>
                <a href={`https://${partner.domain}`} target="_blank" rel="noopener noreferrer"
                  onClick={() => trackVisit(partner.domain)}
                  className="group flex flex-col gap-5 p-7 rounded-2xl hover:shadow-xl transition-all h-full relative overflow-hidden"
                  style={{ background: partner.brand.card, borderWidth: 1, borderStyle: "solid", borderColor: partner.brand.cardBorder }}>

                  <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full" style={{ background: partner.brand.primary }} />

                  <div className="pl-3">
                    <div className="p-2.5 rounded-xl inline-flex w-fit mb-4" style={{ background: partner.brand.iconBg, color: partner.brand.primary }}>
                      <ServiceLogo name={partner.name} domain={partner.domain} logoUrl={(partner as any).logoUrl} FallbackIcon={partner.icon}
                        imgClassName="w-8 h-8 object-contain rounded" iconClassName="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: partner.brand.dark ? "#f1f5f9" : "#0f172a" }}>{partner.name}</h3>
                    <p className="text-sm leading-relaxed flex-1" style={{ color: partner.brand.dark ? "#94a3b8" : "#64748b" }}>{partner.desc}</p>
                  </div>

                  {(partner as any).founderImg && (
                    <div className="flex items-center gap-3 pl-3">
                      <div className="p-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${partner.brand.primary}, #fb923c)` }}>
                        <img src={(partner as any).founderImg} alt={(partner as any).founderLabel ?? "Founder"}
                          className="w-8 h-8 rounded-full object-cover block" />
                      </div>
                      <span className="text-xs font-medium text-slate-500">{(partner as any).founderLabel ?? "Founder"}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pl-3 pt-2 border-t" style={{ borderColor: partner.brand.cardBorder }}>
                    <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: partner.brand.iconBg, color: partner.brand.primary }}>Partner</span>
                    <div className="flex items-center gap-2">
                      {visitCounts[partner.domain] ? (
                        <span className="text-xs text-slate-400">{visitCounts[partner.domain].toLocaleString()} visits</span>
                      ) : null}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" style={{ color: partner.brand.primary }} />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ VISION ══════════ */}
      <section id="vision" className="relative py-32 px-6 overflow-hidden bg-slate-950">
        {/* animated orbs — replace video */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div
            className="absolute top-[-80px] right-[-60px] w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 68%)" }}
            animate={{ x: [0, -60, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const }}
          />
          <motion.div
            className="absolute bottom-[-80px] left-[-60px] w-[550px] h-[550px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(6,182,212,0.16) 0%, transparent 68%)" }}
            animate={{ x: [0, 50, 0], y: [0, -50, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" as const, delay: 1.5 }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 68%)" }}
            animate={{ scale: [1, 1.25, 1], rotate: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const, delay: 0.8 }}
          />
        </div>
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Breadcrumb items={["AMK", "Vision"]} light />
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Vision
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Building for<br />the Long Term
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-14 max-w-2xl mx-auto">
              A unified digital ecosystem spanning communication, payments, cloud, publishing, education, and tools — built with scalable infrastructure to drive real-world impact.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Infrastructure", value: "Scalable", color: "#3b82f6" },
                { label: "Design", value: "Unified", color: "#a855f7" },
                { label: "Impact", value: "Real-world", color: "#06b6d4" },
                { label: "Approach", value: "Long-term", color: "#10b981" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest font-semibold" style={{ color: stat.color }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section id="contact" className="py-28 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={["AMK", "Contact"]} />

          <div className="grid lg:grid-cols-2 gap-5 items-stretch">
            {/* left — dark panel */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="rounded-2xl bg-slate-950 p-10 flex flex-col gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold mb-5">
                  Contact
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">Let's Connect</h2>
                <p className="text-slate-400 leading-relaxed">
                  Interested in the ecosystem? Let's talk about infrastructure, collaboration, or what you're building.
                </p>
              </div>

              {/* email CTA */}
              <a href="mailto:amkaweesi@afuchat.com"
                className="group flex items-center gap-4 p-4 rounded-2xl border border-slate-800 bg-slate-900 hover:border-blue-500/40 hover:bg-slate-800/80 transition-all">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors">
                  <Mail className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-0.5">Email</p>
                  <p className="text-sm font-semibold text-white truncate">amkaweesi@afuchat.com</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
              </a>

              {/* social links */}
              <div className="flex flex-col gap-0 -mx-1">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <div key={social.label}>
                      {i > 0 && <div className="h-px bg-slate-800 mx-1" />}
                      <a href={social.href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-4 py-3.5 px-3 rounded-xl group hover:bg-slate-800/50 transition-colors">
                        <div className="w-9 h-9 rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center group-hover:border-slate-700 transition-colors overflow-hidden">
                          {(social as any).logoUrl
                            ? <img src={(social as any).logoUrl} alt={social.label} className="w-4 h-4 object-contain" />
                            : <Icon className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />}
                        </div>
                        <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors flex-1">{social.label}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-700 group-hover:text-slate-500 transition-colors" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* right — form panel */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-10 flex flex-col gap-6 relative overflow-hidden">
              <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-bold uppercase tracking-wider text-amber-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> Coming soon
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Send a Message</h3>
                <p className="text-sm text-slate-500 max-w-sm">The in-page form is on the way. Drop me an email — I read everything.</p>
              </div>

              <form className="space-y-4 opacity-50 pointer-events-none select-none" aria-disabled="true" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Name</label>
                  <Input placeholder="Your name" disabled className="h-11 border-slate-200 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Email</label>
                  <Input type="email" placeholder="your@email.com" disabled className="h-11 border-slate-200 bg-white" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Message</label>
                  <Textarea placeholder="What's on your mind?" disabled className="min-h-[110px] resize-none border-slate-200 bg-white" />
                </div>
                <Button type="button" disabled className="w-full h-11 text-sm font-semibold">Coming soon</Button>
              </form>

              <a href="mailto:amkaweesi@afuchat.com"
                className="inline-flex items-center justify-center w-full gap-2 h-11 px-5 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20"
                style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}>
                <Mail className="w-4 h-4" /> Email amkaweesi@afuchat.com <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="py-10 px-6 border-t border-slate-800 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <span className="text-xl font-bold text-white">AMK<span className="text-blue-500">.</span></span>
              <div className="h-4 w-px bg-slate-800" />
              <p className="text-sm text-slate-500">© {new Date().getFullYear()} AM Kaweesi. All rights reserved.</p>
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}
                    className="w-8 h-8 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center hover:border-slate-600 hover:bg-slate-800 transition-all overflow-hidden">
                    {(social as any).logoUrl
                      ? <img src={(social as any).logoUrl} alt={social.label} className="w-3.5 h-3.5 object-contain opacity-60" />
                      : <Icon className="w-3.5 h-3.5 text-slate-500" />}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800/50 flex flex-wrap gap-x-8 gap-y-2 justify-center">
            {projects.map((p) => (
              <a key={p.name} href={`https://${p.domain}`} target="_blank" rel="noopener noreferrer"
                className="text-xs text-slate-700 hover:text-slate-400 transition-colors font-medium">{p.name}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ── AfuChat Ads floating widget ── */}
      <AnimatePresence>
        {adVisible && !adDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" as const }}
            className="fixed bottom-5 right-5 z-[300] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-slate-700"
            style={{ width: 316 }}
          >
            {/* header bar */}
            <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-800">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 select-none">
                <img src="/favicons/afuchat.png" alt="" className="w-3.5 h-3.5 object-contain opacity-60" />
                Advertisement
              </span>
              <button
                onClick={() => setAdDismissed(true)}
                className="w-5 h-5 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                aria-label="Close advertisement"
              >
                <X className="w-3 h-3 text-slate-400" />
              </button>
            </div>

            {/* ad iframe */}
            <iframe
              src="https://zuekwzcnknkczelivurf.supabase.co/functions/v1/serve-ad?publisher=c94c610f-685e-4834-bb39-be88049814d9&site=d4c5ef0f-ed9c-496f-835d-d420a89091f4&format=banner_300x250"
              width="300"
              height="250"
              frameBorder="0"
              scrolling="no"
              style={{ border: "none", overflow: "hidden", maxWidth: "100%", display: "block", background: "#ffffff" }}
              loading="eager"
              title="Advertisement"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
