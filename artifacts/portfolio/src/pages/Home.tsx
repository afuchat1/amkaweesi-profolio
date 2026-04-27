import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  CreditCard,
  Headphones,
  GraduationCap,
  Code2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/* ─────────────────────────────────────────────── data ──── */

const projects = [
  { domain: "afuchat.com",        name: "AfuChat",  desc: "Unified communication platform for the modern web",   icon: MessageSquare, brand: { primary: "#00BCD4", iconBg: "#e0f7fa", card: "#faf8f3", cardBorder: "#b2ebf2", dark: false }, logoUrl: "/favicons/afuchat.png" },
  { domain: "email.afuchat.com",  name: "AfuMail",  desc: "Smart, privacy-first email for the ecosystem",        icon: Mail,          brand: { primary: "#3b82f6", iconBg: "#1e3a5f", card: "#0a0a0a", cardBorder: "#1e2a3a", dark: true  }, logoUrl: "/favicons/email.afuchat.com.svg" },
  { domain: "cloud.afuchat.com",  name: "AfuCloud", desc: "Personal cloud storage and file management",          icon: Cloud,         brand: { primary: "#f97316", iconBg: "#ffedd5", card: "#ffffff", cardBorder: "#fed7aa", dark: false }, logoUrl: "/favicons/cloud.afuchat.com.ico" },
  { domain: "blog.afuchat.com",   name: "AfuBlog",  desc: "Publish ideas, stories, and long-form content",       icon: BookOpen,      brand: { primary: "#14b8a6", iconBg: "#ccfbf1", card: "#ffffff", cardBorder: "#99f6e4", dark: false }, logoUrl: "/favicons/blog.afuchat.com.ico" },
  { domain: "ads.afuchat.com",    name: "AfuAds",   desc: "Digital advertising and audience reach tools",        icon: Megaphone,     brand: { primary: "#f97316", iconBg: "#ffedd5", card: "#ffffff", cardBorder: "#fed7aa", dark: false }, logoUrl: "/favicons/ads.afuchat.com.svg" },
  { domain: "math.afuchat.com",   name: "AfuMath",  desc: "Interactive math education and problem solving",      icon: GraduationCap, brand: { primary: "#3b82f6", iconBg: "#1a2050", card: "#0f0f1a", cardBorder: "#1e2040", dark: true  }, logoUrl: "/favicons/math.afuchat.com.png" },
  { domain: "desk.afuchat.com",   name: "AfuDesk",  desc: "Customer support and helpdesk for the ecosystem",    icon: Headphones,    brand: { primary: "#f97316", iconBg: "#2a1800", card: "#111111", cardBorder: "#2a2a2a", dark: true  }, logoUrl: "/favicons/desk.afuchat.com.ico" },
  { domain: "dev.afuchat.com",    name: "AfuChat.dev", desc: "Professional full-stack web and mobile development in Uganda", icon: Code2, brand: { primary: "#a855f7", iconBg: "#f3e8ff", card: "#ffffff", cardBorder: "#e9d5ff", dark: false }, logoUrl: "/favicons/dev.afuchat.com.svg", ctaLabel: "Get a Quote", ctaHref: "https://dev.afuchat.com/estimate" },
];

const clients = [
  { domain: "pay.afuchat.com",          name: "SkyPay",              desc: "Payments API powering seamless UGX collections and transfers", icon: CreditCard, brand: { primary: "#60a5fa", iconBg: "#0c2340", card: "#0d1117", cardBorder: "#1e2d3d", dark: true  } },
  { domain: "honeybeeministriesug.org", name: "Honeybee Ministries", desc: "Faith-based organization serving communities across Uganda",   icon: Globe,      brand: { primary: "#d97706", iconBg: "#fef3c7", card: "#fffbeb", cardBorder: "#fde68a", dark: false }, logoUrl: "/favicons/honeybeeministriesug.org.ico", founderImg: "https://github.com/afuchat1/honeybee/blob/main/src/assets/founder-portrait.jpg?raw=true", founderLabel: "Founder" },
  { domain: "sabulashoespot.com",        name: "Sabula Shoe Spot",    desc: "Quality footwear retail brand for everyday style",             icon: Globe,      brand: { primary: "#f59e0b", iconBg: "#1a1500", card: "#0a0a00", cardBorder: "#2a2000", dark: true  }, logoUrl: "/favicons/sabulashoespot.com.svg" },
];

const partners = [
  { domain: "ajsdigitalservices.com", name: "AJS Digital Services", desc: "IT training and digital services empowering careers across Africa", icon: Globe, brand: { primary: "#f97316", iconBg: "#fff7ed", card: "#ffffff", cardBorder: "#fed7aa", dark: false }, founderImg: "https://dev.afuchat.com/assets/cofounder-photo-Bw4GhOPz.jpg", founderLabel: "Founder" },
];

const socialLinks = [
  { href: "https://afuchat.com/@amkaweesi", label: "AfuChat", icon: MessageSquare, logoUrl: "/favicons/afuchat.png" },
  { href: "https://t.me/amkaweesi", label: "Telegram", icon: Send },
  { href: "https://x.com/amkaweesii", label: "X (Twitter)", icon: Twitter },
  { href: "https://github.com/amkaweesi", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/amkaweesi", label: "LinkedIn", icon: Linkedin },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, ease: "easeOut" as const },
};

/* ──────────────────────────────────────── ServiceLogo ──── */
interface ServiceLogoProps {
  name: string;
  domain: string;
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
    dropdown: projects.map((p) => ({ name: p.name, desc: p.desc, href: `https://${p.domain}`, domain: p.domain, logoUrl: p.logoUrl, icon: p.icon })),
  },
  { label: "About", href: "#about" },
  {
    label: "Clients",
    dropdown: clients.map((c) => ({ name: c.name, desc: c.desc, href: `https://${c.domain}`, domain: c.domain, logoUrl: c.logoUrl, icon: c.icon })),
  },
  { label: "Partners", href: "#partners" },
  { label: "Vision", href: "#vision" },
];

function NavDropdown({ items, footer }: { items: DropdownItem[]; footer: { text: string; href: string; linkLabel: string } }) {
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
                domain={item.domain}
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
        <span className="text-xs text-slate-500">{footer.text}</span>
        <a href={footer.href} className="text-xs font-medium text-primary flex items-center gap-1 hover:underline">
          {footer.linkLabel} <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}


/* ─────────────────────────────────── github contribution heatmap ──── */
type ContribDay = { date: string; count: number; level: number };

const LEVEL_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const AVAILABLE_YEARS = [2026, 2025, 2024];

function HeroHeatmap() {
  const [year, setYear] = useState<number>(AVAILABLE_YEARS[0]);
  const [days, setDays] = useState<ContribDay[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setDays(null);
    setError(null);
    fetch(`https://github-contributions-api.jogruber.de/v4/afuchat1?y=${year}`)
      .then((r) => {
        if (!r.ok) throw new Error(`API ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const contribs: ContribDay[] = data?.contributions ?? [];
        setDays(contribs);
        const yearTotal = data?.total?.[String(year)];
        setTotal(typeof yearTotal === "number" ? yearTotal : contribs.reduce((s, d) => s + d.count, 0));
      })
      .catch((e) => { if (!cancelled) setError(String(e.message ?? e)); });
    return () => { cancelled = true; };
  }, [year]);

  // Build week columns: each column is 7 days (Sun..Sat). Pad start so day-of-week aligns.
  const weeks: (ContribDay | null)[][] = [];
  if (days && days.length > 0) {
    const firstDow = new Date(days[0].date + "T00:00:00").getDay(); // 0=Sun
    let week: (ContribDay | null)[] = Array(firstDow).fill(null);
    for (const d of days) {
      week.push(d);
      if (week.length === 7) { weeks.push(week); week = []; }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      weeks.push(week);
    }
  }

  // Month labels: position above the column where each month starts
  const monthLabels: { idx: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((w, i) => {
    const firstDay = w.find((d) => d !== null);
    if (!firstDay) return;
    const m = new Date(firstDay.date + "T00:00:00").getMonth();
    if (m !== lastMonth) {
      monthLabels.push({ idx: i, label: MONTH_NAMES[m] });
      lastMonth = m;
    }
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6">
      {/* compact header — title left, year selector right */}
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-2.5 min-w-0">
          <Github className="w-4 h-4 text-slate-700 shrink-0" />
          <span className="text-sm font-semibold text-slate-900">
            {total !== null ? `${total.toLocaleString()} contributions` : "Loading…"}
          </span>
          <span className="text-sm text-slate-400">in {year}</span>
          <span className="hidden sm:inline-flex items-center gap-1.5 ml-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>
        <div className="inline-flex items-center gap-1 p-0.5 rounded-full bg-slate-100 border border-slate-200">
          {AVAILABLE_YEARS.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                year === y
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div className="py-10 text-center">
          <p className="text-sm text-slate-500 mb-2">Couldn't load contributions.</p>
          <a
            href="https://github.com/afuchat1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <Github className="w-4 h-4" /> View on GitHub
          </a>
        </div>
      ) : days === null ? (
        <div className="h-[140px] flex items-center justify-center">
          <div className="text-sm text-slate-400">Loading {year}…</div>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-1 px-1">
          <div className="inline-block min-w-full">
            {/* month labels row */}
            <div className="flex pl-7 mb-1.5 text-[10px] text-slate-500 select-none" style={{ gap: 3 }}>
              {weeks.map((_, i) => {
                const label = monthLabels.find((m) => m.idx === i)?.label ?? "";
                return (
                  <div key={i} style={{ width: 11, minWidth: 11 }} className="text-left">
                    {label}
                  </div>
                );
              })}
            </div>

            <div className="flex">
              {/* day-of-week labels */}
              <div className="flex flex-col mr-2 text-[10px] text-slate-500 select-none" style={{ gap: 3 }}>
                {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                  <div key={i} style={{ height: 11, lineHeight: "11px" }}>{d}</div>
                ))}
              </div>

              {/* heatmap grid */}
              <div className="flex" style={{ gap: 3 }}>
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col" style={{ gap: 3 }}>
                    {week.map((day, di) => (
                      <div
                        key={di}
                        title={day ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}` : ""}
                        className="rounded-[2px] transition-transform hover:scale-125"
                        style={{
                          width: 11,
                          height: 11,
                          background: day ? LEVEL_COLORS[day.level] : "transparent",
                          border: day && day.level === 0 ? "1px solid #e5e7eb" : "none",
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* legend + cta row */}
            <div className="flex items-center justify-between mt-4 gap-3 flex-wrap">
              <a
                href="https://github.com/afuchat1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-primary transition-colors"
              >
                <Github className="w-3.5 h-3.5" /> @afuchat1 on GitHub
                <ArrowRight className="w-3 h-3" />
              </a>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <span>Less</span>
                <div className="flex" style={{ gap: 3 }}>
                  {LEVEL_COLORS.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-[2px]"
                      style={{
                        width: 11,
                        height: 11,
                        background: c,
                        border: i === 0 ? "1px solid #e5e7eb" : "none",
                      }}
                    />
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

/* ─────────────────────────────────── main component ──── */
export default function Home() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [visitCounts, setVisitCounts] = useState<Record<string, number>>({});
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    fetch("/api/visits")
      .then((r) => r.json())
      .then((data) => { if (data?.counts) setVisitCounts(data.counts); })
      .catch(() => {});
  }, []);

  const trackVisit = (domain: string) => {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data?.count !== undefined) {
          setVisitCounts((prev) => ({ ...prev, [domain]: data.count }));
        }
      })
      .catch(() => {});
  };

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
                    <NavDropdown
                      items={item.dropdown}
                      footer={
                        item.label === "Clients"
                          ? { text: `${clients.length} active client${clients.length !== 1 ? "s" : ""}`, href: "#clients", linkLabel: "View all" }
                          : { text: `${projects.length} services in the AfuChat ecosystem`, href: "#ecosystem", linkLabel: "View all" }
                      }
                    />
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

      {/* ══════════ HERO — flat, heatmap-first ══════════ */}
      <section className="relative pt-28 pb-16 px-6 bg-gradient-to-b from-blue-50/40 via-white to-white border-b border-slate-100">
        <div className="relative z-10 max-w-6xl mx-auto">
          <Breadcrumb items={["AMK", "Portfolio", "Home"]} />

          {/* identity row — photo + name + status, all flat */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-5 mt-2 mb-8"
          >
            <img
              src="https://pbs.twimg.com/profile_images/2001772163410325504/Hf3dXqTN_400x400.jpg"
              alt="AM Kaweesi"
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover ring-1 ring-slate-200 shrink-0"
            />
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Builder of the AfuChat Ecosystem
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-slate-900">
                AM Kaweesi <span className="text-primary">· Digital Builder</span>
              </h1>
            </div>
          </motion.div>

          {/* tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-8"
          >
            Building connected digital systems across communication, payments, cloud, publishing, and tools.
          </motion.p>

          {/* ★ contribution heatmap — first thing seen, flat */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8"
          >
            <HeroHeatmap />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button size="lg" className="px-7 text-base rounded-full" asChild>
              <a href="#ecosystem">Explore Ecosystem <ArrowRight className="ml-2 w-4 h-4" /></a>
            </Button>
            <Button size="lg" variant="outline" className="px-7 text-base rounded-full border-slate-300 bg-white hover:bg-slate-50" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
            <span className="inline-flex items-center gap-2 ml-1 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for projects
            </span>
          </motion.div>
        </div>
      </section>

      {/* ══════════ ABOUT ══════════ */}
      <section id="about" className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={["AMK", "About"]} />
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-0.5 rounded-full bg-gradient-to-br from-primary via-blue-400 to-indigo-400 shadow-md shadow-blue-200/50">
                  <img
                    src="https://pbs.twimg.com/profile_images/2001772163410325504/Hf3dXqTN_400x400.jpg"
                    alt="AM Kaweesi"
                    className="w-14 h-14 object-cover rounded-full block"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-primary">About</p>
                  <p className="text-sm text-slate-500 font-medium">AM Kaweesi</p>
                </div>
              </div>
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
                { label: "Services Built", value: `${projects.length}+`, note: "Across communication, cloud, storage & more" },
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

      {/* ══════════ ECOSYSTEM — BENTO GRID ══════════ */}
      <section id="ecosystem" className="py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <Breadcrumb items={["AMK", "Products", "Ecosystem"]} />

          {/* heading */}
          <motion.div {...fadeUp} className="mb-12 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Ecosystem
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4 leading-[1.1]">
              The AfuChat Suite.
              <br />
              <span className="text-slate-400">{projects.length} services. One ecosystem.</span>
            </h2>
            <p className="text-lg text-slate-500 mb-6">
              A unified collection of interconnected digital services — communication, payments, cloud, publishing, education, and tools — each purpose-built, all connected.
            </p>
            <div className="flex items-center gap-2.5">
              <div className="p-0.5 rounded-full bg-gradient-to-br from-primary via-blue-400 to-indigo-400">
                <img src="https://pbs.twimg.com/profile_images/2001772163410325504/Hf3dXqTN_400x400.jpg" alt="AM Kaweesi" className="w-7 h-7 rounded-full object-cover block" />
              </div>
              <span className="text-sm text-slate-500">Built by <span className="font-semibold text-slate-700">AM Kaweesi</span></span>
            </div>
          </motion.div>

          {/* uniform grid — all cards equal size for clarity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((project, idx) => {
              const visits = visitCounts[project.domain];
              const ctaHref = (project as any).ctaHref as string | undefined;
              const ctaLabel = (project as any).ctaLabel as string | undefined;
              const txtMain = project.brand.dark ? "#f1f5f9" : "#0f172a";
              const txtSub = project.brand.dark ? "#94a3b8" : "#64748b";
              const txtMuted = project.brand.dark ? "#64748b" : "#94a3b8";
              return (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.4) }}
                  onClick={() => { trackVisit(project.domain); window.open(`https://${project.domain}`, "_blank"); }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl min-h-[260px]"
                  style={{
                    background: project.brand.card,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: project.brand.cardBorder,
                  }}
                >
                  {/* brand color top stripe */}
                  <div className="h-1 w-full shrink-0" style={{ background: project.brand.primary }} />

                  {/* soft brand glow on hover */}
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{ background: project.brand.primary }}
                  />

                  <div className="relative flex flex-col flex-1 p-5">
                    {/* logo */}
                    <div className="mb-4">
                      <div
                        className="rounded-xl inline-flex items-center justify-center p-2.5"
                        style={{ background: project.brand.iconBg, color: project.brand.primary }}
                      >
                        <ServiceLogo
                          name={project.name}
                          domain={project.domain}
                          logoUrl={project.logoUrl}
                          FallbackIcon={project.icon}
                          imgClassName="object-contain rounded w-7 h-7"
                          iconClassName="w-7 h-7"
                        />
                      </div>
                    </div>

                    {/* title + desc */}
                    <h3 className="font-semibold mb-1.5 text-base" style={{ color: txtMain }}>
                      {project.name}
                    </h3>
                    <p className="text-sm leading-relaxed flex-1 line-clamp-3" style={{ color: txtSub }}>
                      {project.desc}
                    </p>

                    {/* footer */}
                    <div className="mt-4 pt-3 border-t flex items-center justify-between gap-3" style={{ borderColor: project.brand.cardBorder }}>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-xs truncate font-medium" style={{ color: txtMuted }}>
                          {project.domain}
                        </span>
                        {visits ? (
                          <span className="text-[10px]" style={{ color: txtMuted }}>
                            {visits.toLocaleString()} {visits === 1 ? "visit" : "visits"}
                          </span>
                        ) : null}
                      </div>
                      {ctaHref ? (
                        <a
                          href={ctaHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-transform group-hover:scale-105"
                          style={{ background: project.brand.primary, color: "#ffffff" }}
                        >
                          {ctaLabel} <ArrowRight className="w-3 h-3" />
                        </a>
                      ) : (
                        <div
                          className="shrink-0 w-8 h-8 rounded-full inline-flex items-center justify-center transition-all group-hover:scale-110"
                          style={{ background: project.brand.iconBg, color: project.brand.primary }}
                        >
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
                  onClick={() => trackVisit(client.domain)}
                  className="group flex flex-col gap-4 p-6 rounded-2xl hover:shadow-md transition-all h-full"
                  style={{ background: client.brand.card, borderWidth: 1, borderStyle: "solid", borderColor: client.brand.cardBorder }}
                >
                  <div className="p-2.5 rounded-xl inline-flex w-fit transition-colors" style={{ background: client.brand.iconBg, color: client.brand.primary }}>
                    <ServiceLogo
                      name={client.name}
                      domain={client.domain}
                      logoUrl={client.logoUrl}
                      FallbackIcon={client.icon}
                      imgClassName="w-7 h-7 object-contain rounded"
                      iconClassName="w-7 h-7"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold mb-1" style={{ color: client.brand.dark ? "#f1f5f9" : "#0f172a" }}>{client.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: client.brand.dark ? "#94a3b8" : "#64748b" }}>{client.desc}</p>
                  </div>
                  {(client as any).founderImg && (
                    <div className="flex items-center gap-2.5">
                      <div className="p-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${client.brand.primary}, #fbbf24)` }}>
                        <img
                          src={(client as any).founderImg}
                          alt={(client as any).founderLabel ?? "Founder"}
                          className="w-8 h-8 rounded-full object-cover block"
                        />
                      </div>
                      <span className="text-xs" style={{ color: client.brand.dark ? "#94a3b8" : "#64748b" }}>{(client as any).founderLabel ?? "Founder"}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full border" style={{ background: client.brand.dark ? "#1e1e1e" : "#ffffff", borderColor: client.brand.dark ? "#333" : "#e2e8f0", color: client.brand.dark ? "#94a3b8" : "#64748b" }}>Client</span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: client.brand.iconBg, color: client.brand.primary }}>Active</span>
                      {visitCounts[client.domain] ? (
                        <span className="text-xs" style={{ color: client.brand.dark ? "#64748b" : "#94a3b8" }}>
                          {visitCounts[client.domain].toLocaleString()} visit{visitCounts[client.domain] !== 1 ? "s" : ""}
                        </span>
                      ) : null}
                    </div>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all" style={{ color: client.brand.primary }} />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PARTNERS ══════════ */}
      <section id="partners" className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={["AMK", "Partners"]} />
          <motion.div {...fadeUp} className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Partners</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Trusted Collaborators</h2>
            <p className="text-lg text-slate-500">Organizations we work alongside to deliver greater impact.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {partners.map((partner, index) => (
              <motion.div key={partner.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.12 }}>
                <a
                  href={`https://${partner.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackVisit(partner.domain)}
                  className="group flex flex-col gap-4 p-6 rounded-2xl hover:shadow-md transition-all h-full"
                  style={{ background: partner.brand.card, borderWidth: 1, borderStyle: "solid", borderColor: partner.brand.cardBorder }}
                >
                  <div className="p-2.5 rounded-xl inline-flex w-fit" style={{ background: partner.brand.iconBg, color: partner.brand.primary }}>
                    <ServiceLogo
                      name={partner.name}
                      domain={partner.domain}
                      logoUrl={(partner as any).logoUrl}
                      FallbackIcon={partner.icon}
                      imgClassName="w-7 h-7 object-contain rounded"
                      iconClassName="w-7 h-7"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold mb-1" style={{ color: partner.brand.dark ? "#f1f5f9" : "#0f172a" }}>{partner.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: partner.brand.dark ? "#94a3b8" : "#64748b" }}>{partner.desc}</p>
                  </div>
                  {(partner as any).founderImg && (
                    <div className="flex items-center gap-2.5">
                      <div className="p-0.5 rounded-full" style={{ background: `linear-gradient(135deg, ${partner.brand.primary}, #fb923c)` }}>
                        <img
                          src={(partner as any).founderImg}
                          alt={(partner as any).founderLabel ?? "Founder"}
                          className="w-8 h-8 rounded-full object-cover block"
                        />
                      </div>
                      <span className="text-xs text-slate-500">{(partner as any).founderLabel ?? "Founder"}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: partner.brand.iconBg, color: partner.brand.primary }}>Partner</span>
                      {visitCounts[partner.domain] ? (
                        <span className="text-xs" style={{ color: "#94a3b8" }}>
                          {visitCounts[partner.domain].toLocaleString()} visit{visitCounts[partner.domain] !== 1 ? "s" : ""}
                        </span>
                      ) : null}
                    </div>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all" style={{ color: partner.brand.primary }} />
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
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Interested in the ecosystem? Let's talk about infrastructure, collaboration, or what you're building.
              </p>

              {/* primary email CTA */}
              <a
                href="mailto:amkaweesi@afuchat.com"
                className="group flex items-center gap-4 p-4 mb-3 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-blue-50/40 to-indigo-50/30 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors">
                  <Mail className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-0.5">Email me directly</p>
                  <p className="text-base font-semibold text-slate-900 truncate">amkaweesi@afuchat.com</p>
                </div>
                <ArrowRight className="w-4 h-4 text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </a>

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
                        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors overflow-hidden">
                          {(social as any).logoUrl ? (
                            <img src={(social as any).logoUrl} alt={social.label} className="w-5 h-5 object-contain" />
                          ) : (
                            <Icon className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                          )}
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
              className="relative bg-white rounded-2xl border border-slate-200 shadow-sm p-8 overflow-hidden"
            >
              {/* coming-soon ribbon */}
              <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-semibold uppercase tracking-wider text-amber-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Coming soon
              </div>

              <h3 className="text-lg font-semibold text-slate-900 mb-2">Send a Message</h3>
              <p className="text-sm text-slate-500 mb-6 max-w-sm">
                The in-page contact form is on the way. In the meantime, drop me an email — I read everything.
              </p>

              <form
                className="space-y-5 opacity-50 pointer-events-none select-none"
                aria-disabled="true"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Name</label>
                  <Input placeholder="Your name" disabled className="h-11 border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <Input type="email" placeholder="your@email.com" disabled className="h-11 border-slate-200" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Message</label>
                  <Textarea placeholder="What's on your mind?" disabled className="min-h-[120px] resize-none border-slate-200" />
                </div>
                <Button type="button" disabled className="w-full h-11 text-sm font-medium">
                  Coming soon
                </Button>
              </form>

              <a
                href="mailto:amkaweesi@afuchat.com"
                className="mt-6 inline-flex items-center justify-center w-full gap-2 h-11 px-5 rounded-md bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm shadow-blue-100"
              >
                <Mail className="w-4 h-4" />
                Email amkaweesi@afuchat.com
                <ArrowRight className="w-4 h-4" />
              </a>
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
                  {(social as any).logoUrl ? (
                    <img src={(social as any).logoUrl} alt={social.label} className="w-4 h-4 object-contain opacity-50 hover:opacity-100 transition-opacity" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
