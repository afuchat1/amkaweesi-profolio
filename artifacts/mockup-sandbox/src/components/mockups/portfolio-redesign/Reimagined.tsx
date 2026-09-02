import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  CreditCard,
  ExternalLink,
  Github,
  Globe2,
  Headphones,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  MessageSquare,
  Play,
  Radio,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  Twitter,
  X,
} from "lucide-react";

const profileImage =
  "https://pbs.twimg.com/profile_images/2001772163410325504/Hf3dXqTN_400x400.jpg";
const infrastructureImage = "/__mockup/images/infrastructure-map.png";

const products = [
  { name: "AfuChat", domain: "afuchat.com", description: "Unified communication platform for the modern web", icon: MessageSquare, accent: "#28d4c1", tint: "#dff8f1" },
  { name: "AfuMail", domain: "email.afuchat.com", description: "Smart, privacy-first email for the ecosystem", icon: Mail, accent: "#5b8cff", tint: "#e7edff" },
  { name: "AfuCloud", domain: "cloud.afuchat.com", description: "Personal cloud storage and file management", icon: Cloud, accent: "#ffb54a", tint: "#fff0d2" },
  { name: "AfuBlog", domain: "blog.afuchat.com", description: "Publish ideas, stories, and long-form content", icon: Layers3, accent: "#ef7f9d", tint: "#ffe6ec" },
  { name: "AfuMath", domain: "math.afuchat.com", description: "Interactive math education and problem solving", icon: Sparkles, accent: "#a786ff", tint: "#eee8ff" },
  { name: "AfuDesk", domain: "desk.afuchat.com", description: "Customer support and helpdesk for the ecosystem", icon: Headphones, accent: "#67b7ff", tint: "#e4f3ff" },
  { name: "AfuChat.dev", domain: "dev.afuchat.com", description: "Professional full-stack web and mobile development in Uganda", icon: Code2, accent: "#f0834c", tint: "#ffeadc", cta: "Get a quote", href: "https://dev.afuchat.com/estimate" },
];

const clients = [
  { name: "SkyPay", domain: "pay.afuchat.com", description: "Payments API powering seamless UGX collections and transfers", icon: CreditCard, accent: "#5b8cff" },
  { name: "Honeybee Ministries", domain: "honeybeeministriesug.org", description: "Faith-based organization serving communities across Uganda", icon: Globe2, accent: "#f2aa42", logo: "/__mockup/favicons/honeybeeministriesug.org.ico", founder: "Founder" },
  { name: "Sabula Shoe Spot", domain: "sabulashoespot.com", description: "Quality footwear retail brand for everyday style", icon: Globe2, accent: "#ff806b", logo: "/__mockup/favicons/sabulashoespot.com.jpg" },
  { name: "MM Radio Uganda", domain: "mmradioug.org", description: "Online radio station keeping Uganda connected through music, news and culture", icon: Radio, accent: "#e85b7a", logo: "/__mockup/favicons/mmradioug.org.png" },
];

const socials = [
  { label: "AfuChat", href: "https://afuchat.com/@amkaweesi", icon: MessageSquare },
  { label: "Telegram", href: "https://t.me/amkaweesi", icon: Send },
  { label: "X", href: "https://x.com/amkaweesii", icon: Twitter },
  { label: "GitHub", href: "https://github.com/amkaweesi", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/amkaweesi", icon: Linkedin },
];

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduceMotion ? 0 : 0.65, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="mb-7 flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#e4774f]">
      <span className="text-[#8c938d]">{index}</span>
      <span className="h-px w-8 bg-[#e4774f]" />
      <span>{children}</span>
    </div>
  );
}

function LogoMark() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#12212b] text-[#f4efe4] shadow-[4px_4px_0_#ef7f59]">
      <span className="font-mono text-sm font-bold">A/</span>
    </span>
  );
}

function StatusChip() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = window.setInterval(() => setTick((value) => value + 1), 2600);
    return () => window.clearInterval(interval);
  }, []);
  const statuses = ["systems online", "shipping in Uganda", "open for a build"];
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#527066]">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#37bea3] opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#37bea3]" />
      </span>
      <span>{statuses[tick % statuses.length]}</span>
    </div>
  );
}

function SocialRail() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {socials.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#cad1c7] bg-[#f8f5ed] text-[#53615b] transition-colors hover:border-[#ef7f59] hover:bg-[#fff0e9] hover:text-[#c45432]"
        >
          <Icon size={15} strokeWidth={1.8} />
        </a>
      ))}
    </div>
  );
}

function ProductCard({
  product,
  index,
  onVisit,
}: {
  product: (typeof products)[number];
  index: number;
  onVisit: (domain: string) => void;
}) {
  const Icon = product.icon;
  return (
    <Reveal delay={index * 0.045} className={index === 0 ? "md:col-span-2" : ""}>
      <a
        href={product.href ?? `https://${product.domain}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onVisit(product.domain)}
        className={`group relative flex min-h-[205px] flex-col justify-between overflow-hidden rounded-[22px] border border-[#d2d7cc] bg-[#f8f5ed] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#ef7f59] hover:shadow-[8px_8px_0_#d9ded3] ${index === 0 ? "md:min-h-[272px] md:p-7" : ""}`}
      >
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-60 transition-transform duration-500 group-hover:scale-150" style={{ background: product.tint }} />
        <div className="relative z-10 flex items-start justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-[14px]" style={{ background: product.tint, color: product.accent }}>
            <Icon size={21} strokeWidth={1.7} />
          </span>
          <span className="font-mono text-[10px] text-[#87918a]">0{index + 1} / 07</span>
        </div>
        <div className="relative z-10 mt-8">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="font-sans text-xl font-bold tracking-[-0.04em] text-[#15232a]">{product.name}</h3>
            {product.cta && <span className="rounded-full bg-[#15232a] px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-[#f4efe4]">{product.cta}</span>}
          </div>
          <p className="max-w-[34rem] text-sm leading-6 text-[#64716b]">{product.description}</p>
          <div className="mt-4 flex items-center justify-between border-t border-[#dce0d7] pt-3">
            <span className="font-mono text-[10px] text-[#8b958e]">{product.domain}</span>
            <ArrowUpRight className="h-4 w-4 text-[#ef7f59] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </a>
    </Reveal>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return <ArrowDownRight className={`${className ?? ""} rotate-[-90deg]`} />;
}

export function Reimagined() {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTrace, setActiveTrace] = useState("AfuChat");
  const [visits, setVisits] = useState<Record<string, number>>({});
  const [sent, setSent] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const traces = useMemo(
    () => ({
      AfuChat: ["POST /messages", "AUTH /session", "WS /presence", "SYNC /threads"],
      AfuCloud: ["PUT /objects", "GET /vault", "HASH /sha256", "SYNC /devices"],
      SkyPay: ["POST /collections", "VERIFY /otp", "LEDGER /ugx", "WEBHOOK /settled"],
    }),
    [],
  );

  const trackVisit = (domain: string) => {
    setVisits((current) => ({ ...current, [domain]: (current[domain] ?? 0) + 1 }));
  };

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    setMenuOpen(false);
  };

  return (
    <main className="min-h-[100dvh] overflow-hidden bg-[#f4efe4] font-sans text-[#15232a] selection:bg-[#ef7f59] selection:text-[#15232a]">
      <style>{`
        @keyframes trace { from { stroke-dashoffset: 80; } to { stroke-dashoffset: 0; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .trace-line { stroke-dasharray: 6 8; animation: trace 4s linear infinite; }
        .float-node { animation: float 4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .trace-line, .float-node { animation: none; }
        }
      `}</style>
      <motion.div className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-[#ef7f59]" style={{ scaleX: progress }} />

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#d7dbd1]/80 bg-[#f4efe4]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-5 md:px-8">
          <button onClick={() => jumpTo("top")} className="flex items-center gap-3 text-left" aria-label="Back to top">
            <LogoMark />
            <span className="hidden font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#33423d] sm:block">AM Kaweesi / lab</span>
          </button>
          <div className="hidden items-center gap-8 md:flex">
            {[
              ["01", "systems", "ecosystem"],
              ["02", "field notes", "about"],
              ["03", "contact", "contact"],
            ].map(([index, label, id]) => (
              <button key={id} onClick={() => jumpTo(id)} className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6c7871] transition-colors hover:text-[#c45432]">
                <span className="text-[#b0b7ae] group-hover:text-[#ef7f59]">{index}</span>
                {label}
              </button>
            ))}
            <a href="https://dev.afuchat.com/estimate" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#15232a] px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.13em] text-[#f4efe4] transition-transform hover:-translate-y-0.5">
              Start a build
            </a>
          </div>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cad1c7] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-[#d7dbd1] bg-[#f4efe4] px-5 pb-5 pt-3 md:hidden">
            {[
              ["Systems", "ecosystem"],
              ["Field notes", "about"],
              ["Clients", "clients"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button key={id} onClick={() => jumpTo(id)} className="block w-full border-b border-[#dce0d7] py-4 text-left font-mono text-xs uppercase tracking-[0.14em] text-[#33423d]">{label}</button>
            ))}
            <a href="https://dev.afuchat.com/estimate" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center rounded-full bg-[#15232a] px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.13em] text-[#f4efe4]">Start a build</a>
          </div>
        )}
      </nav>

      <section id="top" className="relative border-b border-[#d7dbd1] px-5 pb-16 pt-[122px] md:px-8 md:pb-24">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(#d7dbd1_1px,transparent_1px),linear-gradient(90deg,#d7dbd1_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
        <div className="relative mx-auto max-w-[1240px]">
          <div className="mb-14 flex flex-wrap items-center justify-between gap-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a938c]"><span className="text-[#ef7f59]">AMK_001</span> / portfolio / 2026</div>
            <StatusChip />
          </div>
          <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Reveal>
                <p className="mb-6 max-w-xl font-mono text-xs uppercase tracking-[0.16em] text-[#c45432]">Full-stack builder · founder · Kampala, Uganda</p>
                <h1 className="max-w-[900px] font-sans text-[clamp(4.2rem,11vw,9.8rem)] font-extrabold leading-[0.82] tracking-[-0.1em] text-[#15232a]">
                  Living
                  <br />
                  <span className="ml-[9vw] text-[#ef7f59]">systems.</span>
                </h1>
                <p className="mt-9 max-w-[550px] text-lg leading-8 text-[#58655f] md:text-xl">I build the connective tissue between people, products, and infrastructure. Founder of the <strong className="font-semibold text-[#15232a]">AfuChat ecosystem</strong>.</p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <button onClick={() => jumpTo("ecosystem")} className="group flex items-center gap-3 rounded-full bg-[#ef7f59] px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#15232a] transition-all hover:-translate-y-1 hover:shadow-[5px_5px_0_#15232a]">Inspect the system <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></button>
                  <a href="mailto:amkaweesi@afuchat.com" className="flex items-center gap-2 rounded-full border border-[#bfc8be] px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#52605a] transition-colors hover:border-[#ef7f59] hover:bg-[#fff0e9]">Email me <Mail size={15} /></a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.18}>
              <div className="relative min-h-[360px] overflow-hidden rounded-[26px] border border-[#263e4a] bg-[#101d28] shadow-[12px_12px_0_#d9ded3]">
                <img src={infrastructureImage} alt="Abstract digital infrastructure map showing connected cloud, data, payments and communication systems" className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-screen" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,29,40,0.98)_0%,rgba(16,29,40,0.42)_54%,rgba(16,29,40,0.1)_100%)]" />
                <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-between p-5 md:p-7">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-[#9faaa8]"><span>infra.map / live</span><span className="flex items-center gap-2 text-[#68d8bd]"><span className="h-1.5 w-1.5 rounded-full bg-[#68d8bd]" /> encrypted</span></div>
                  <div>
                    <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ef7f59]">One builder, many surfaces</div>
                    <p className="max-w-xs font-sans text-2xl font-bold leading-tight tracking-[-0.05em] text-[#f4efe4]">Communication is the root. Everything else branches.</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#a5b8b4]">
                    <div className="border-l border-[#ef7f59] pl-2"><span className="block text-[#f4efe4]">{String(products.length).padStart(2, "0")}</span> product surfaces</div>
                    <div className="border-l border-[#68d8bd] pl-2"><span className="block text-[#f4efe4]">{String(clients.length).padStart(2, "0")}</span> client systems</div>
                    <div className="border-l border-[#8297f1] pl-2"><span className="block text-[#f4efe4]">01</span> AfuChat root</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="mt-16 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#89948c]"><span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c5ccc1]"><ArrowDownRight size={14} /></span> scroll to trace the network</div>
        </div>
      </section>

      <section className="border-b border-[#d7dbd1] bg-[#15232a] px-5 py-5 text-[#f4efe4] md:px-8">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8eaaa2]">runtime / uganda × global</span>
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[#f4efe4]">
            <span><b className="mr-2 text-[#ef7f59]">{String(products.length).padStart(2, "0")}</b> product surfaces</span><span><b className="mr-2 text-[#68d8bd]">{String(clients.length).padStart(2, "0")}</b> client systems</span><span><b className="mr-2 text-[#8297f1]">2022</b> AfuChat founded</span>
          </div>
        </div>
      </section>

      <section id="about" className="border-b border-[#d7dbd1] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionLabel index="02">field notes</SectionLabel>
            <div className="relative max-w-[320px]">
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded-[24px] border border-[#ef7f59]" />
              <img src={profileImage} alt="AM Kaweesi" className="relative aspect-square w-full rounded-[24px] object-cover grayscale-[25%]" />
              <div className="absolute -bottom-7 -left-5 rounded-xl border border-[#d1d8ce] bg-[#f4efe4] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#64716b] shadow-[4px_4px_0_#d9ded3]">AMK / builder<br /><span className="text-[#c45432]">Kampala, UG</span></div>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mb-8 max-w-2xl font-sans text-3xl font-bold leading-[1.08] tracking-[-0.06em] text-[#15232a] md:text-5xl">The web is more interesting when its parts know how to talk to one another.</p>
            <div className="grid gap-8 border-t border-[#cfd5cb] pt-8 md:grid-cols-2">
              <div className="text-[15px] leading-7 text-[#64716b]"><p>I am AM Kaweesi, a Ugandan full-stack builder focused on creating cohesive digital ecosystems. Tools should not exist in isolation; they should connect, communicate, and compound.</p></div>
              <div className="text-[15px] leading-7 text-[#64716b]"><p><strong className="text-[#15232a]">AfuChat</strong> is the core of this expanding platform — a unified communication layer that branches into payments, cloud storage, publishing, education, and beyond.</p></div>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {["React", "TypeScript", "Node.js", "Postgres", "Cloud infra", "Product thinking"].map((skill) => <span key={skill} className="rounded-full border border-[#cbd3c8] bg-[#f9f6ee] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#596860]">{skill}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="ecosystem" className="border-b border-[#d7dbd1] bg-[#e9eee6] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal><SectionLabel index="03">the ecosystem</SectionLabel>
            <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><h2 className="max-w-3xl font-sans text-5xl font-extrabold leading-[0.92] tracking-[-0.08em] text-[#15232a] md:text-7xl">Seven surfaces.<br /><span className="text-[#c45432]">One connective layer.</span></h2></div><p className="max-w-xs text-sm leading-6 text-[#64716b]">AfuChat is a growing suite of digital services — designed as a system, built one useful surface at a time.</p></div>
          </Reveal>
          <div className="grid gap-3 md:grid-cols-3">
            {products.map((product, index) => <ProductCard key={product.name} product={product} index={index} onVisit={trackVisit} />)}
          </div>
           <div className="mt-7 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[#859088]"><span>hover a node to inspect</span><span>{products.length} products · {clients.length} client systems indexed</span></div>
        </div>
      </section>

      <section className="border-b border-[#d7dbd1] bg-[#15232a] px-5 py-24 text-[#f4efe4] md:px-8 md:py-32">
        <div className="mx-auto max-w-[1240px]">
          <Reveal><SectionLabel index="04">system diagram</SectionLabel>
            <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div><h2 className="font-sans text-5xl font-extrabold leading-[0.9] tracking-[-0.08em] md:text-7xl">Design the<br /><span className="text-[#68d8bd]">connections.</span></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#9faaa8]">The best work is not a collection of screens. It is the quiet infrastructure that makes a meaningful action feel obvious.</p></div>
              <div className="relative min-h-[360px] overflow-hidden rounded-[26px] border border-[#3a5156] bg-[#10202a] p-5 md:p-8">
                <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 700 360" fill="none" aria-hidden="true"><path className="trace-line" d="M102 177 C195 177 183 78 282 78 S367 178 464 178 S550 90 620 90" stroke="#68d8bd" strokeWidth="1" /><path className="trace-line" d="M102 177 C192 177 211 282 300 282 S397 181 464 178 S522 270 620 270" stroke="#ef7f59" strokeWidth="1" /><path className="trace-line" d="M282 78 C370 78 378 178 464 178" stroke="#8297f1" strokeWidth="1" /></svg>
                {[
                  { label: "AfuChat", sub: "communication", x: "9%", y: "43%", icon: MessageSquare, color: "#68d8bd" },
                  { label: "AfuCloud", sub: "storage", x: "34%", y: "12%", icon: Cloud, color: "#8297f1" },
                  { label: "SkyPay", sub: "payments", x: "67%", y: "43%", icon: CreditCard, color: "#ef7f59" },
                  { label: "AfuDesk", sub: "support", x: "34%", y: "72%", icon: Headphones, color: "#f3bc60" },
                  { label: "People", sub: "the point", x: "89%", y: "72%", icon: Globe2, color: "#ef7f9d" },
                ].map(({ label, sub, x, y, icon: Icon, color }, index) => (
                  <button key={label} onClick={() => setActiveTrace(label === "AfuCloud" ? "AfuCloud" : label === "SkyPay" ? "SkyPay" : "AfuChat")} className={`float-node absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 text-left transition-transform hover:scale-105 ${activeTrace === label || (label === "People" && activeTrace === "AfuChat") ? "border-[#f4efe4] bg-[#1c323b]" : "border-[#3b5359] bg-[#132832]"}`} style={{ left: x, top: y, animationDelay: `${index * 0.3}s` }}><span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color }}><Icon size={14} /> {label}</span><span className="ml-5 block font-mono text-[9px] text-[#80928e]">{sub}</span></button>
                ))}
                 <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between border-t border-[#30474e] pt-3 font-mono text-[9px] uppercase tracking-[0.14em] text-[#71847f]"><span>click a node</span><span>AfuChat root / network stable</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-[#d7dbd1] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal><SectionLabel index="05">live trace</SectionLabel><h2 className="max-w-md font-sans text-5xl font-extrabold leading-[0.92] tracking-[-0.08em] md:text-7xl">Under the<br /><span className="text-[#c45432]">interface.</span></h2><p className="mt-7 max-w-sm text-sm leading-7 text-[#64716b]">A glimpse at how I think: start from the user signal, route it through sturdy primitives, and leave room for the system to grow.</p><div className="mt-8 flex flex-wrap gap-2">{["AfuChat", "AfuCloud", "SkyPay"].map((name) => <button key={name} onClick={() => setActiveTrace(name)} className={`rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-wider transition-colors ${activeTrace === name ? "bg-[#15232a] text-[#f4efe4]" : "border border-[#cbd3c8] text-[#66736d] hover:border-[#ef7f59]"}`}>{name}</button>)}</div></Reveal>
          <Reveal delay={0.12}><div className="overflow-hidden rounded-[24px] border border-[#2a3d46] bg-[#15232a] shadow-[10px_10px_0_#d9ded3]"><div className="flex items-center justify-between border-b border-[#344b52] px-5 py-4 font-mono text-[10px] text-[#899b96]"><span className="flex items-center gap-2"><Terminal size={14} className="text-[#ef7f59]" /> trace/{activeTrace.toLowerCase()}</span><span className="text-[#68d8bd]">running</span></div><div className="grid gap-8 p-5 md:grid-cols-[1fr_0.7fr] md:p-7"><div className="font-mono text-xs leading-8 text-[#afc0ba]">{(traces[activeTrace as keyof typeof traces] ?? traces.AfuChat).map((line, index) => <motion.div key={`${activeTrace}-${line}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.09 }}><span className="mr-4 text-[#637873]">0{index + 1}</span><span className={index === 0 ? "text-[#ef7f59]" : index === 3 ? "text-[#68d8bd]" : "text-[#d9e0d8]"}>{line}</span></motion.div>)}</div><div className="border-l border-[#344b52] pl-5 font-mono text-[10px] leading-6 text-[#82918c]"><p className="mb-4 uppercase tracking-[0.16em] text-[#efefe6]">request anatomy</p><p><span className="text-[#ef7f59]">input</span> → human intent</p><p><span className="text-[#8297f1]">route</span> → shared primitives</p><p><span className="text-[#68d8bd]">output</span> → useful action</p><div className="mt-7 flex items-center gap-2 text-[#68d8bd]"><Check size={14} /> all checks passing</div></div></div></div></Reveal>
        </div>
      </section>

      <section id="clients" className="border-b border-[#d7dbd1] bg-[#e9eee6] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-[1240px]"><Reveal><SectionLabel index="06">field deployments</SectionLabel><div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="font-sans text-5xl font-extrabold leading-[0.92] tracking-[-0.08em] md:text-7xl">Real work.<br /><span className="text-[#c45432]">Real context.</span></h2><p className="max-w-xs text-sm leading-6 text-[#64716b]">Systems built with organizations, brands, and people doing important work across Uganda.</p></div></Reveal>
          <div className="grid gap-3 md:grid-cols-2">{clients.map((client, index) => { const Icon = client.icon; return <Reveal key={client.name} delay={index * 0.08}><a href={`https://${client.domain}`} target="_blank" rel="noopener noreferrer" onClick={() => trackVisit(client.domain)} className="group flex min-h-[210px] flex-col justify-between rounded-[22px] border border-[#d2d7cc] bg-[#f8f5ed] p-6 transition-all hover:-translate-y-1 hover:border-[#ef7f59] hover:shadow-[8px_8px_0_#d9ded3]"><div className="flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#e9eee6]" style={{ color: client.accent }}>{client.logo ? <img src={client.logo} alt="" className="h-7 w-7 rounded object-contain" /> : <Icon size={21} />}</span><ExternalLink size={15} className="text-[#a0a9a1] transition-colors group-hover:text-[#ef7f59]" /></div><div><h3 className="font-sans text-xl font-bold tracking-[-0.04em]">{client.name}</h3><p className="mt-1 max-w-md text-sm leading-6 text-[#64716b]">{client.description}</p><div className="mt-4 flex items-center justify-between border-t border-[#dce0d7] pt-3 font-mono text-[10px] text-[#8b958e]"><span>{client.domain}</span>{client.founder ? <span className="text-[#c45432]">{client.founder}</span> : <span>{visits[client.domain] ?? 0} visits</span>}</div></div></a></Reveal> })}</div>
        </div>
      </section>

      <section className="border-b border-[#d7dbd1] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end"><Reveal><SectionLabel index="07">operating principles</SectionLabel><h2 className="max-w-3xl font-sans text-5xl font-extrabold leading-[0.92] tracking-[-0.08em] md:text-7xl">Infrastructure<br /><span className="text-[#c45432]">with intent.</span></h2></Reveal><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"><Reveal delay={0.08}><div className="border-t border-[#cbd3c8] py-4"><span className="font-mono text-[10px] text-[#ef7f59]">01 / build</span><p className="mt-2 text-sm leading-6 text-[#64716b]">Ship useful primitives, not impressive demos.</p></div></Reveal><Reveal delay={0.14}><div className="border-t border-[#cbd3c8] py-4"><span className="font-mono text-[10px] text-[#68a995]">02 / connect</span><p className="mt-2 text-sm leading-6 text-[#64716b]">Make every new surface strengthen the whole.</p></div></Reveal><Reveal delay={0.2}><div className="border-t border-[#cbd3c8] py-4"><span className="font-mono text-[10px] text-[#8297f1]">03 / endure</span><p className="mt-2 text-sm leading-6 text-[#64716b]">Choose foundations that still make sense later.</p></div></Reveal></div></div>
      </section>

      <section id="contact" className="bg-[#ef7f59] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"><Reveal><SectionLabel index="08">open channel</SectionLabel><h2 className="max-w-4xl font-sans text-6xl font-extrabold leading-[0.85] tracking-[-0.09em] text-[#15232a] md:text-8xl">Have a system<br />in mind?</h2><p className="mt-8 max-w-md text-lg leading-7 text-[#713c2c]">Tell me what you are trying to connect. I am open to product work, infrastructure conversations, and collaborations with a long runway.</p><a href="mailto:amkaweesi@afuchat.com?subject=Build%20a%20system" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#15232a] px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#f4efe4] transition-transform hover:-translate-y-1"><Mail size={16} /> amkaweesi@afuchat.com <ArrowRight size={16} /></a></Reveal>
          <Reveal delay={0.12}><form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="rounded-[24px] border border-[#d65e3d] bg-[#f58b69] p-5 md:p-7"><div className="mb-7 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-[#713c2c]"><span>message.packet</span><span className="flex items-center gap-2"><ShieldCheck size={14} /> no tracking</span></div><div className="space-y-4"><label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.13em] text-[#713c2c]">your name</span><input required placeholder="Name" className="w-full border-b border-[#d56647] bg-transparent px-0 py-3 text-base text-[#15232a] outline-none placeholder:text-[#9b4e39] focus:border-[#15232a]" /></label><label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.13em] text-[#713c2c]">your email</span><input required type="email" placeholder="you@company.com" className="w-full border-b border-[#d56647] bg-transparent px-0 py-3 text-base text-[#15232a] outline-none placeholder:text-[#9b4e39] focus:border-[#15232a]" /></label><label className="block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.13em] text-[#713c2c]">the brief</span><textarea required placeholder="What are you building?" rows={3} className="w-full resize-none border-b border-[#d56647] bg-transparent px-0 py-3 text-base text-[#15232a] outline-none placeholder:text-[#9b4e39] focus:border-[#15232a]" /></label></div><button type="submit" className="mt-7 flex w-full items-center justify-between rounded-full bg-[#15232a] px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#f4efe4] transition-colors hover:bg-[#263943]">{sent ? <><span className="flex items-center gap-2"><Check size={15} /> packet staged</span><span>thank you</span></> : <><span>Stage the conversation</span><Play size={14} fill="currentColor" /></>}</button>{sent && <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-[#713c2c]">This prototype does not send data. Email is ready when you are.</p>}</form></Reveal>
        </div>
      </section>

      <footer className="bg-[#15232a] px-5 py-10 text-[#f4efe4] md:px-8"><div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-8 md:flex-row md:items-end"><div><div className="flex items-center gap-3"><LogoMark /><span className="font-mono text-xs uppercase tracking-[0.16em] text-[#becbc3]">AM Kaweesi / AfuChat ecosystem</span></div><p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#71847f]">© {new Date().getFullYear()} · built from Kampala</p></div><div className="flex flex-col gap-4 md:items-end"><SocialRail /><div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.13em] text-[#71847f]">{products.map((product) => <a key={product.name} href={product.href ?? `https://${product.domain}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#ef7f59]">{product.name}</a>)}</div></div></div></footer>
    </main>
  );
}

export default Reimagined;