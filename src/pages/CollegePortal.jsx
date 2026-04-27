import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import {
  Menu, X, Flame, ChevronDown, ChevronLeft, ChevronRight,
  CalendarDays, ArrowRight, Clock, MapPin, Users, Star,
  Music, ZoomIn, Camera, Expand, Trophy, TrendingUp,
  Heart, Sparkles, Globe, Video, MessageSquare
} from "lucide-react";
import { stats, fests, allEvents, artists, galleryPhotos, leaderboard, deptLeaderboard } from "@/lib/portalData";

// ─── HELPER DATA & CONSTANTS ───

const SLIDE_DURATION = 4500;
const slides = [
  {
    image: "/assets/amaal.jpeg",
    label: "Cultural Fest", fest: "NEXUS FEST 2026", title: "Where Every\nTalent Shines", date: "Sep 15–17", tag: "🎭 Cultural", accent: "#811811",
  },
  {
    image: "/assets/amaal1.jpeg",
    label: "DJ Night", fest: "NEXUS FEST 2026", title: "Feel The\nBeat Drop", date: "Sep 15 · Night Show", tag: "🎧 Music", accent: "#5a1060",
  },
  {
    image: "/assets/ashish.jpeg",
    label: "Live Performance", fest: "NEXUS FEST 2026", title: "Live Music\nUnleashed", date: "Sep 16 · Headline Act", tag: "🎤 Performance", accent: "#811811",
  },
  {
    image: "/assets/azhar.jpeg",
    label: "Hackathon", fest: "TECHSPIRE 2026", title: "Code. Create.\nConquer.", date: "Oct 5–6", tag: "💻 Technical", accent: "#0d3a6b",
  },
  {
    image: "/assets/band.jpeg",
    label: "Sports Day", fest: "SPORTS ZEAL 2026", title: "Sweat. Compete.\nDominate.", date: "Nov 10–12", tag: "🏃 Sports", accent: "#0d4a1a",
  },
  {
    image: "/assets/band2.jpeg",
    label: "Campus Life", fest: "CAMPUS PULSE", title: "Your Story\nStarts Here", date: "Year Round", tag: "📸 Gallery", accent: "#811811",
  },
];

const festColorMap = {
  "#811811": { text: "#ff8080", glow: "rgba(129,24,17,0.4)", border: "rgba(129,24,17,0.3)" },
  "#1a3a6b": { text: "#6090ff", glow: "rgba(26,58,107,0.5)", border: "rgba(90,144,255,0.3)" },
  "#1a4a1a": { text: "#60cc60", glow: "rgba(26,74,26,0.5)", border: "rgba(96,204,96,0.3)" },
};

const cardStyles = [
  { colSpan: "col-span-2 row-span-2", height: "h-[340px] sm:h-[420px]", overlay: "bg-gradient-to-t from-[#811811]/80 via-transparent to-transparent", captionPos: "bottom-0 left-0 right-0 p-5", captionAlign: "text-left", effect: "zoom-tilt", badge: "Featured", badgeColor: "bg-maroon text-white" },
  { colSpan: "col-span-1 row-span-2", height: "h-[280px] sm:h-[340px]", overlay: "bg-gradient-to-r from-black/70 via-transparent to-transparent", captionPos: "left-0 top-1/2 -translate-y-1/2 p-4 w-36", captionAlign: "text-left", effect: "slide-right", badge: "Live", badgeColor: "bg-ember/80 text-white" },
  { colSpan: "col-span-1", height: "h-36 sm:h-44", overlay: "bg-black/40", captionPos: "inset-0 flex items-end p-3", captionAlign: "text-center", effect: "scale-burst", badge: null, badgeColor: "" },
  { colSpan: "col-span-2", height: "h-40 sm:h-52", overlay: "bg-gradient-to-b from-black/60 to-transparent", captionPos: "top-0 left-0 right-0 p-4", captionAlign: "text-left", effect: "wipe-down", badge: "Highlight", badgeColor: "bg-white/20 text-white backdrop-blur-sm" },
  { colSpan: "col-span-1", height: "h-36 sm:h-44", overlay: "bg-[#1a3a6b]/50", captionPos: "inset-0 flex items-end p-3", captionAlign: "text-center", effect: "rotate-zoom", badge: null, badgeColor: "" },
  { colSpan: "col-span-1", height: "h-48 sm:h-60", overlay: "bg-gradient-to-br from-[#811811]/60 to-transparent", captionPos: "bottom-0 left-0 right-0 p-3", captionAlign: "text-left", effect: "diagonal", badge: "Moment", badgeColor: "bg-white/10 text-white border border-white/20" },
  { colSpan: "col-span-2", height: "h-48 sm:h-56", overlay: "bg-black/50", captionPos: "inset-0 flex flex-col items-center justify-center", captionAlign: "text-center", effect: "fade-center", badge: "Gallery", badgeColor: "bg-maroon/80 text-white" },
  { colSpan: "col-span-1", height: "h-48 sm:h-64", overlay: "bg-gradient-to-tl from-black/70 to-transparent", captionPos: "bottom-0 right-0 p-3 max-w-[80%]", captionAlign: "text-right", effect: "tilt-reveal", badge: "Action", badgeColor: "bg-[#1a4a1a]/80 text-green-300 border border-green-900" },
];

// ─── PORTAL COMPONENTS ───

function PortalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollTo = (href) => { setMobileOpen(false); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };
  return (
    <motion.nav initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0D0100]/90 backdrop-blur-xl shadow-lg shadow-black/20" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
          <img src="src/assets/vgu-logo.png" alt="Logo" className="h-8" />
          <span className="font-display text-white text-xl tracking-widest">
            {/* ya jo bhi naam chahiye */}
          </span>

        </button>
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {["Fests", "Events", "Artists", "Gallery", "Leaderboard", "About"].map((l) => (
            <button key={l} onClick={() => scrollTo(`#${l.toLowerCase()}`)} className="text-white/60 hover:text-white text-xs tracking-widest uppercase font-body transition-colors duration-300">{l}</button>
          ))}
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-1">{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      <AnimatePresence>{mobileOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-[#0D0100]/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-6 py-5 flex flex-col gap-4">
            {["Fests", "Events", "Artists", "Gallery", "Leaderboard", "About"].map((l) => (
              <button key={l} onClick={() => scrollTo(`#${l.toLowerCase()}`)} className="text-white/60 hover:text-white text-sm tracking-widest uppercase text-left transition-colors">{l}</button>
            ))}
          </div>
        </motion.div>
      )}</AnimatePresence>
    </motion.nav>
  );
}

function HeroPortal() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [, setTick] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const eventDate = new Date("2026-09-15T09:00:00");
  const diff = eventDate - new Date();
  const days = Math.max(0, Math.floor(diff / 86400000));
  const hours = Math.max(0, Math.floor((diff % 86400000) / 3600000));
  const mins = Math.max(0, Math.floor((diff % 3600000) / 60000));
  const secs = Math.max(0, Math.floor((diff % 60000) / 1000));

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => { setCurrent((c) => (c + 1) % slides.length); }, SLIDE_DURATION);
  };

  useEffect(() => {
    if (!paused) startTimer();
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [paused]);

  const goTo = (idx) => { setCurrent(idx); startTimer(); };
  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <AnimatePresence mode="sync">
        <motion.div key={current + "-bg"} className="absolute inset-0" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 1.2, ease: "easeInOut" }}>
          <img src={slide.image} alt={slide.label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0100]/60 via-[#0D0100]/30 to-[#0D0100]" />
          <motion.div key={current + "-glow"} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} style={{ background: `radial-gradient(ellipse at 80% 50%, ${slide.accent}55 0%, transparent 60%)` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0100]/70 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 pt-24 pb-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <AnimatePresence mode="wait"><motion.div key={current + "-tag"} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-body mb-5 border border-white/10 bg-white/5 backdrop-blur-sm text-white/70"><span>{slide.tag}</span></motion.div></AnimatePresence>
            <AnimatePresence mode="wait"><motion.h2 key={current + "-fest"} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, delay: 0.05 }} className="font-display text-sm sm:text-base tracking-[0.4em] text-white/40 mb-3 uppercase">{slide.fest}</motion.h2></AnimatePresence>
            <AnimatePresence mode="wait"><motion.h1 key={current + "-title"} initial={{ opacity: 0, y: 50, clipPath: "inset(100% 0% 0% 0%)" }} animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }} exit={{ opacity: 0, y: -30, clipPath: "inset(0% 0% 100% 0%)" }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="font-display text-[13vw] sm:text-[9vw] md:text-[7vw] lg:text-[5.5vw] leading-[0.95] text-white tracking-wide mb-5 whitespace-pre-line">{slide.title}</motion.h1></AnimatePresence>
            <AnimatePresence mode="wait"><motion.div key={current + "-date"} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex items-center gap-3 mb-8"><div className="h-[1px] w-10 bg-white/20" /><span className="font-body text-white/50 text-sm tracking-widest">{slide.date}</span></motion.div></AnimatePresence>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} onClick={() => document.querySelector("#fests")?.scrollIntoView({ behavior: "smooth" })} className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#811811] font-body font-bold text-xs tracking-widest uppercase rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-all duration-300">Explore Fests</motion.button>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl px-8 py-6 text-right">
              <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-body mb-4">Next Event In</p>
              <div className="flex gap-5 justify-end">
                {[{ v: days, l: "Days" }, { v: hours, l: "Hrs" }, { v: mins, l: "Min" }, { v: secs, l: "Sec" }].map(({ v, l }) => (
                  <div key={l} className="text-center"><div className="font-display text-4xl text-white tracking-wider">{String(v).padStart(2, "0")}</div><div className="text-[10px] text-white/25 tracking-[0.3em] uppercase mt-1">{l}</div></div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-xl px-4 py-3 text-center"><div className="text-xl mb-1">{s.icon}</div><div className="font-display text-xl text-white tracking-wider">{s.value}</div><div className="text-white/25 text-[10px] tracking-widest uppercase font-body">{s.label}</div></div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      <div className="relative z-10 pb-8 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-2">
            {slides.map((s, i) => (
              <button key={i} onClick={() => goTo(i)} className={`relative overflow-hidden rounded-lg transition-all duration-500 ${i === current ? "w-20 h-12 opacity-100" : "w-10 h-10 opacity-40 hover:opacity-70"}`}>
                <img src={s.image} alt={s.label} className="w-full h-full object-cover" />
                {i === current && <div className="absolute inset-0 ring-1 ring-white/40 rounded-lg" />}
              </button>
            ))}
          </div>
          <div className="flex sm:hidden items-center gap-1.5">{slides.map((_, i) => (<button key={i} onClick={() => goTo(i)} className={`rounded-full transition-all duration-500 ${i === current ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/25"}`} />))}</div>
          <div className="flex-1 mx-4 hidden sm:block">
            <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div key={current} className="h-full bg-white rounded-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }} />
            </div>
            <p className="text-white/20 text-[10px] font-body mt-1.5 tracking-widest">{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} — {slide.label}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 hover:bg-white/[0.12] hover:text-white transition-all duration-300"><ChevronLeft size={16} /></button>
            <button onClick={next} className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/60 hover:bg-white/[0.12] hover:text-white transition-all duration-300"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FestsSection() {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [tappedIdx, setTappedIdx] = useState(null);

  const displayFests = [
    { id: "p1", name: "Nexus", isPlaceholder: true, image: "/assets/ashish.jpeg" },
    { id: "p2", name: "Pulse", isPlaceholder: true, image: "/assets/amaal.jpeg" },
    ...fests,
    { id: "p3", name: "Vibe", isPlaceholder: true, image: "/assets/solanki.jpeg" },
    { id: "p4", name: "Spark", isPlaceholder: true, image: "/assets/amaal1.jpeg" },
  ];

  const handleCardClick = (i, fest) => {
    if (window.innerWidth < 768) {
      setTappedIdx(tappedIdx === i ? null : i);
    } else if (!fest.isPlaceholder) {
      document.querySelector("#events")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="fests" className="relative py-20 sm:py-32 lg:py-48 bg-[#0D0100] overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        .fest-wrapper {
          --card-trans-duration: 800ms;
          --card-trans-easing: cubic-bezier(0.2, 1, 0.3, 1);
          --card-width: 220px;
          --radius: 650px;
          --cards: 7;
          --arc-size: 0.45;
          --arc-center: 0.75;
          --arc-start: calc(var(--arc-center) - var(--arc-size) / 2);
          --arc-shift-delta: 0.02;
          position: relative;
          width: 100%;
          height: 550px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          perspective: 1200px;
          margin-top: 40px;
        }

        /* Tablet: adjusted arc */
        @media (min-width: 641px) and (max-width: 1024px) {
          .fest-wrapper {
            --card-width: 155px;
            --radius: 470px;
            --arc-size: 0.55;
            height: 420px;
            margin-top: 24px;
          }
        }

        /* Mobile: horizontal scroll */
        @media (max-width: 640px) {
          .fest-wrapper {
            height: auto;
            flex-direction: row;
            overflow-x: auto;
            overflow-y: visible;
            gap: 14px;
            padding: 0 20px 16px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            perspective: none;
            margin-top: 16px;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .fest-wrapper::-webkit-scrollbar { display: none; }
        }

        .fest-card {
          position: absolute;
          width: var(--card-width);
          aspect-ratio: 4/5.5;
          background: #1a1a1a;
          border-radius: 20px;
          overflow: hidden;
          offset-path: circle(var(--radius) at 50% 110%);
          offset-rotate: auto;
          offset-anchor: 50% 0%;
          transition: all var(--card-trans-duration) var(--card-trans-easing);
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        /* Mobile card overrides */
        @media (max-width: 640px) {
          .fest-card {
            position: relative;
            flex-shrink: 0;
            width: 200px;
            border-radius: 16px;
            offset-path: none;
            scroll-snap-align: center;
          }
        }
        @media (max-width: 400px) {
          .fest-card { width: 170px; }
        }

        /* Desktop/Tablet hover */
        @media (hover: hover) and (min-width: 641px) {
          .fest-card:hover {
            z-index: 50 !important;
            offset-anchor: 50% 12%;
            transform: scale(1.1) translateY(-30px);
            border-color: rgba(255, 255, 255, 0.25);
            box-shadow: 0 25px 60px rgba(0,0,0,0.9);
          }
        }

        /* Mobile tapped state */
        .fest-card.is-tapped {
          z-index: 50 !important;
          transform: scale(1.04);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 50px rgba(129, 24, 17, 0.3), 0 10px 30px rgba(0,0,0,0.7);
        }

        /* Arc Position Calculation */
        ${displayFests.map((_, i) => `
          .fest-card:nth-child(${i + 1}) {
            --card-i: ${i + 1};
            --arc-step: calc(var(--arc-size) / (var(--cards) - 1));
            offset-distance: calc((var(--arc-start) + ${i} * var(--arc-step) + var(--arc-shift, 0)) * 100%);
            z-index: ${i < 3 ? i : 6 - i};
          }
        `).join('\n')}

        /* Sibling Shifts on Hover - Desktop only */
        @media (hover: hover) and (min-width: 641px) {
          .fest-card:hover + .fest-card { --arc-shift: calc(var(--arc-shift-delta) * 3.5); }
          .fest-card:hover + .fest-card + .fest-card { --arc-shift: calc(var(--arc-shift-delta) * 2); }
          .fest-card:has(+ .fest-card:hover) { --arc-shift: calc(var(--arc-shift-delta) * -3.5); }
          .fest-card:has(+ .fest-card + .fest-card:hover) { --arc-shift: calc(var(--arc-shift-delta) * -2); }
        }
      ` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-16 lg:mb-20">
          <p className="text-ember text-[10px] sm:text-xs tracking-[0.4em] sm:tracking-[0.5em] uppercase font-body mb-2 sm:mb-3">Experience The Magic</p>
          <h2 className="font-heading text-3xl sm:text-5xl lg:text-7xl text-white">Festival <span className="italic text-white/30">Arc</span></h2>
        </motion.div>

        <div className="fest-wrapper">
          {displayFests.map((fest, i) => {
            const isActive = tappedIdx === i;
            return (
              <div
                key={fest.id}
                className={`fest-card group ${isActive ? 'is-tapped' : ''}`}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => handleCardClick(i, fest)}
              >
                <img
                  src={fest.coverImage || fest.image}
                  alt={fest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: "brightness(0.8) contrast(1.1)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Card Content - Visible on Hover or Tap */}
                <div className={`absolute inset-0 p-4 sm:p-6 flex flex-col justify-end transition-all duration-500 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} group-hover:translate-y-0 group-hover:opacity-100`}>
                  {!fest.isPlaceholder ? (
                    <>
                      <span className="inline-block self-start px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] tracking-widest uppercase font-body font-bold text-white mb-2 sm:mb-3" style={{ background: fest.color }}>
                        {fest.badge}
                      </span>
                      <h3 className="font-display text-xl sm:text-3xl text-white tracking-widest mb-1 sm:mb-2">{fest.name}</h3>
                      <p className="text-white/60 text-[10px] sm:text-xs font-body leading-relaxed mb-2 sm:mb-4 line-clamp-2">
                        {fest.tagline}
                      </p>
                      <div className="flex items-center justify-between pt-2 sm:pt-4 border-t border-white/10">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-white/40 text-[9px] sm:text-[10px] font-body">
                          <CalendarDays size={10} />
                          <span>{fest.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-ember text-[9px] sm:text-[10px] font-body tracking-widest uppercase font-bold">
                          <span>Join</span>
                          <ArrowRight size={10} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center pb-2 sm:pb-4">
                      <p className="text-white/40 text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-body mb-1 sm:mb-2">Coming Soon</p>
                      <h3 className="font-display text-lg sm:text-2xl text-white/60 tracking-widest">{fest.name}</h3>
                    </div>
                  )}
                </div>

                {/* Minimalist Title - Hidden on Hover/Tap */}
                <div className={`absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-300 ${isActive ? 'opacity-0' : ''} group-hover:opacity-0`}>
                  <h3 className="font-display text-sm sm:text-xl text-white/80 tracking-[0.15em] sm:tracking-[0.2em] uppercase whitespace-nowrap">{fest.name}</h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile swipe hint */}
        <div className="flex sm:hidden justify-center items-center mt-5 gap-3">
          <div className="flex gap-1.5">
            {displayFests.map((_, i) => (
              <div key={i} className={`rounded-full transition-all duration-300 ${tappedIdx === i ? 'w-5 h-1.5 bg-ember' : 'w-1.5 h-1.5 bg-white/20'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MagneticCard({ event, festData, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [6, -6]);
  const rotateY = useTransform(x, [-60, 60], [-6, 6]);
  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect(); if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2); y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };
  const colors = festColorMap[festData?.color] || festColorMap["#811811"];
  return (
    <motion.div ref={cardRef} layout initial={{ opacity: 0, y: 60, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -30, scale: 0.9 }} transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }} style={{ rotateX, rotateY, transformPerspective: 800 }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="group relative cursor-pointer select-none" whileHover={{ z: 20 }}>
      <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" style={{ background: `linear-gradient(135deg, ${colors.border}, transparent)` }} />
      <div className="relative rounded-2xl overflow-hidden border transition-all duration-500 group-hover:shadow-2xl" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
        <motion.div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${colors.text}, transparent)` }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.06 + 0.3 }} />
        <div className="p-6">
          <div className="flex items-start justify-between mb-5">
            <motion.div className="text-4xl" whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }} transition={{ duration: 0.4 }}>{event.icon}</motion.div>
            <div className="flex flex-col items-end gap-1.5"><span className="text-[9px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full font-body font-semibold border" style={{ color: colors.text, borderColor: colors.border, background: `${colors.glow}` }}>{event.category}</span><span className="text-[9px] text-white/20 font-body tracking-widest uppercase">{festData?.name}</span></div>
          </div>
          <h3 className="font-heading text-xl text-white mb-4 leading-snug group-hover:text-white transition-colors">{event.title}</h3>
          <div className="h-[1px] bg-white/[0.05] mb-4" />
          <div className="space-y-2 mb-5">
            <div className="flex items-center gap-2.5 text-white/35 text-xs font-body"><div className="w-5 h-5 rounded-md bg-white/[0.05] flex items-center justify-center shrink-0"><Clock size={10} /></div><span>{event.date} · {event.time}</span></div>
            <div className="flex items-center gap-2.5 text-white/35 text-xs font-body"><div className="w-5 h-5 rounded-md bg-white/[0.05] flex items-center justify-center shrink-0"><MapPin size={10} /></div><span>{event.venue}</span></div>
            <div className="flex items-center gap-2.5 text-white/35 text-xs font-body"><div className="w-5 h-5 rounded-md bg-white/[0.05] flex items-center justify-center shrink-0"><Users size={10} /></div><span>{event.seats} seats</span></div>
          </div>
          <div className="h-[3px] rounded-full bg-white/[0.05] overflow-hidden mb-4"><motion.div className="h-full rounded-full" style={{ background: colors.text }} initial={{ width: 0 }} whileInView={{ width: `${Math.min(100, (event.seats / 1000) * 100)}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: index * 0.05 + 0.5, ease: "easeOut" }} /></div>
          <div className="flex items-center gap-1.5 text-xs font-body tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" style={{ color: colors.text }}><span>View Details</span><ArrowRight size={12} /></div>
        </div>
      </div>
    </motion.div>
  );
}

function FestRow({ fest, events }) {
  const scrollRef = useRef(null);
  const scroll = (dir) => { scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" }); };
  const colors = festColorMap[fest.color] || festColorMap["#811811"];
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} className="mb-14 last:mb-0">
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-4">
          <div className="h-8 w-[3px] rounded-full" style={{ background: colors.text }} />
          <div><h3 className="font-display text-2xl text-white tracking-widest">{fest.name}</h3><p className="text-white/30 text-xs font-body tracking-widest">{fest.tagline}</p></div>
          <span className="ml-2 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-body font-semibold hidden sm:inline-flex" style={{ background: `${colors.glow}`, color: colors.text, border: `1px solid ${colors.border}` }}>{events.length} events</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all"><ChevronLeft size={14} /></button>
          <button onClick={() => scroll(1)} className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all"><ChevronRight size={14} /></button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-3 scroll-smooth" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {events.map((event, i) => { const festData = fests.find((f) => f.id === event.fest); return (<div key={event.id} className="shrink-0 w-64 sm:w-72"><MagneticCard event={event} festData={festData} index={i} /></div>); })}
      </div>
    </motion.div>
  );
}

function EventsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...new Set(allEvents.map((e) => e.category))];
  return (
    <section id="events" className="relative py-24 sm:py-32 bg-[#0D0100] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-maroon/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div><p className="text-ember text-xs tracking-[0.5em] uppercase font-body mb-3">Browse All</p><h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white leading-tight">Events <span className="italic text-white/30">Lineup</span></h2></div>
            <div className="overflow-hidden w-full sm:w-72 h-8 relative"><div className="flex gap-4 animate-marquee whitespace-nowrap absolute">{[...categories, ...categories].map((c, i) => (<span key={i} className="text-[10px] text-white/20 tracking-widest uppercase font-body shrink-0">{c} ·</span>))}</div></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-2 mb-14">{categories.map((c) => (<motion.button key={c} onClick={() => setActiveCategory(c)} whileTap={{ scale: 0.93 }} className={`px-4 py-2 rounded-full text-xs tracking-wider uppercase font-body font-medium transition-all duration-300 ${activeCategory === c ? "bg-maroon text-white shadow-[0_0_20px_rgba(129,24,17,0.5)]" : "bg-white/[0.04] text-white/40 border border-white/[0.06] hover:bg-white/[0.08] hover:text-white/70"}`}>{c}</motion.button>))}</motion.div>
        <AnimatePresence mode="wait">{activeCategory === "All" ? (<motion.div key="rows" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>{fests.map((fest) => { const festEvents = allEvents.filter((e) => e.fest === fest.id); return <FestRow key={fest.id} fest={fest} events={festEvents} />; })}</motion.div>) : (<motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">{allEvents.filter((e) => e.category === activeCategory).map((event, i) => { const festData = fests.find((f) => f.id === event.fest); return (<MagneticCard key={event.id} event={event} festData={festData} index={i} />); })}</motion.div>)}</AnimatePresence>
      </div>
    </section>
  );
}

function ArtistsSection() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="artists" className="relative py-24 sm:py-32 bg-[#0D0100]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#811811]/8 to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14"><p className="text-ember text-xs tracking-[0.4em] uppercase font-body mb-3">Performing At</p><h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white">Featured <span className="italic text-white/40">Artists</span></h2></motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {artists.filter((a) => a.highlight).map((artist, i) => (
            <motion.div key={artist.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} onMouseEnter={() => setHovered(artist.id)} onMouseLeave={() => setHovered(null)} className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 ${hovered !== null && hovered !== artist.id ? "opacity-50 scale-[0.98]" : ""}`}>
              <div className="h-64 sm:h-80 relative overflow-hidden">
                <img src={artist.image} alt={artist.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-gradient-to-t from-[#0D0100] via-[#0D0100]/40 to-transparent" /><div className="absolute inset-0 bg-maroon/10 group-hover:bg-maroon/20 transition-colors duration-500" />
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-maroon rounded-full"><Star size={11} className="text-yellow-400 fill-yellow-400" /><span className="text-white text-[10px] tracking-widest font-body uppercase">Headline</span></div>
                <div className="absolute bottom-0 left-0 right-0 p-6"><p className="text-white/50 text-xs font-body tracking-widest uppercase mb-1">{artist.type}</p><h3 className="font-heading text-2xl sm:text-3xl text-white mb-1">{artist.name}</h3><div className="flex items-center gap-2 text-ember text-xs font-body"><Music size={11} /><span>{artist.performing}</span></div><p className="text-white/40 text-sm font-body mt-3 leading-relaxed">{artist.bio}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {artists.filter((a) => !a.highlight).map((artist, i) => (
            <motion.div key={artist.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} onMouseEnter={() => setHovered(artist.id)} onMouseLeave={() => setHovered(null)} className={`group flex gap-4 items-center bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.06] transition-all duration-400 cursor-pointer ${hovered !== null && hovered !== artist.id ? "opacity-50" : ""}`}>
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0"><img src={artist.image} alt={artist.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /></div>
              <div className="flex-1 min-w-0"><h3 className="font-heading text-lg text-white mb-0.5">{artist.name}</h3><p className="text-white/40 text-xs font-body mb-1">{artist.type}</p><div className="flex items-center gap-1.5 text-white/30 text-xs font-body"><Music size={10} /><span>{artist.performing}</span></div></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({ photo, index, onOpen }) {
  const rotations = [-4, 3, -1, -5, -2, 2, 4];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={() => onOpen(photo)}
      className="gallery-card group relative"
      style={{ "--rotation": `${rotation}deg` }}
    >
      <div className="card-inner relative w-full h-full rounded-lg overflow-hidden transition-all duration-500">
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

        {/* Caption revealed on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white text-[10px] tracking-widest uppercase font-body">{photo.fest}</p>
          <p className="text-white/80 text-xs font-body mt-1">{photo.caption}</p>
        </div>
      </div>

      {/* Decorative outline that reacts to hover */}
      <div className="absolute -inset-2 border-2 border-white/10 rounded-xl pointer-events-none group-hover:border-ember/40 group-hover:-inset-3 transition-all duration-500" />
    </motion.div>
  );
}

function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const filtered = galleryPhotos.filter((p) => activeFilter === "All" || p.fest === activeFilter);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-[#0D0100] overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        .gallery-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          padding: 2rem;
          transition: all 0.5s ease;
        }

        .gallery-container:has(.gallery-card:hover) .gallery-card:not(:hover) {
          opacity: 0.4;
          filter: blur(2px) grayscale(100%);
          scale: 0.95;
        }

        .gallery-card {
          width: 280px;
          height: 420px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          rotate: var(--rotation);
          z-index: 1;
        }

        @media (max-width: 640px) {
          .gallery-card {
            width: 140px;
            height: 210px;
          }
          .gallery-container {
            gap: 1rem;
            padding: 1rem;
          }
        }

        .gallery-card:hover {
          rotate: 0deg;
          scale: 1.1;
          z-index: 10;
          opacity: 1 !important;
          filter: none !important;
        }

        .card-inner {
          box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 0 8px rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .gallery-card:hover .card-inner {
          box-shadow: 0 20px 60px rgba(129, 24, 17, 0.4), 0 0 0 4px white;
        }
      ` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-ember text-xs tracking-[0.5em] uppercase font-body mb-3">Captured Moments</p>
          <h2 className="font-heading text-4xl sm:text-6xl text-white">Visual <span className="italic text-white/30">Archive</span></h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["All", "IGNUS", "SPANDAN", "VORTEX"].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-xs tracking-wider uppercase font-body transition-all duration-300 ${activeFilter === f ? "bg-maroon text-white shadow-lg shadow-maroon/20" : "bg-white/5 text-white/40 hover:bg-white/10"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="gallery-container">
          <AnimatePresence mode="popLayout">
            {filtered.map((photo, i) => (
              <GalleryCard key={photo.id} photo={photo} index={i} onOpen={setLightbox} />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox logic remains the same */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          >
            <motion.button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white"
              onClick={() => setLightbox(null)}
            >
              <X size={16} />
            </motion.button>
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img src={lightbox.src} alt={lightbox.caption} className="w-full" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white font-body text-sm">{lightbox.caption}</p>
                  <p className="text-white/40 text-xs mt-1 tracking-widest uppercase font-body">{lightbox.fest}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function LeaderboardSection() {
  const [tab, setTab] = useState("students");
  const rankColor = (rank) => rank === 1 ? "text-yellow-400" : rank === 2 ? "text-gray-300" : rank === 3 ? "text-amber-600" : "text-white/30";
  const rankBg = (rank) => rank === 1 ? "bg-yellow-500/10 border-yellow-500/20" : rank === 2 ? "bg-gray-500/10 border-gray-500/20" : rank === 3 ? "bg-amber-700/10 border-amber-700/20" : "bg-white/[0.02] border-white/[0.05]";
  return (
    <section id="leaderboard" className="relative py-24 sm:py-32 bg-[#0D0100]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12"><p className="text-ember text-xs tracking-[0.4em] uppercase font-body mb-3">Hall of Fame</p><h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white">Leader<span className="italic text-white/40">board</span></h2></motion.div>
        <div className="flex justify-center gap-3 mb-10">{["students", "departments"].map((t) => (<button key={t} onClick={() => setTab(t)} className={`px-6 py-2.5 rounded-full text-xs tracking-widest uppercase font-body font-medium transition-all duration-300 capitalize ${tab === t ? "bg-maroon text-white" : "bg-white/5 text-white/40 hover:bg-white/10"}`}>{t}</button>))}</div>
        <div className="space-y-2">
          {tab === "students" ? leaderboard.map((p, i) => (
            <motion.div key={p.rank} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:bg-white/[0.04] ${rankBg(p.rank)}`}><div className={`w-8 text-center font-display text-xl ${rankColor(p.rank)}`}>{p.badge}</div><div className="flex-1 min-w-0"><p className="text-white text-sm font-body font-medium truncate">{p.name}</p><p className="text-white/35 text-xs font-body">{p.dept}</p></div><div className="text-right shrink-0"><p className="text-white text-sm font-body font-semibold">{p.points.toLocaleString()}</p><p className="text-white/30 text-xs font-body">{p.events} events</p></div></motion.div>
          )) : deptLeaderboard.map((d, i) => (
            <motion.div key={d.dept} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 hover:bg-white/[0.04] ${rankBg(d.rank)}`}><div className={`w-8 text-center font-display text-xl ${rankColor(d.rank)}`}>{d.rank}</div><div className="flex-1 min-w-0"><p className="text-white text-sm font-body font-medium">{d.dept}</p><p className="text-white/35 text-xs font-body">{d.members} members</p></div><div className="text-right shrink-0"><p className="text-white text-sm font-body font-semibold">{d.points.toLocaleString()}</p></div></motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const values = [
    { icon: Heart, title: "Passion-Driven", desc: "Every event is crafted with love by students, for students." },
    { icon: Users, title: "Inclusive Community", desc: "We celebrate every talent, from every branch and background." },
    { icon: Sparkles, title: "Unforgettable Moments", desc: "We create memories that last long after the final curtain." },
    { icon: Globe, title: "Beyond Campus", desc: "We invite colleges from across the region to compete and collaborate." },
  ];
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#0D0100]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14"><p className="text-ember text-xs tracking-[0.4em] uppercase font-body mb-3">Our Story</p><h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white mb-6">About <span className="italic text-white/40">Campus Pulse</span></h2><p className="text-white/45 font-body text-base sm:text-lg leading-[1.8] max-w-2xl mx-auto">Campus Pulse is the heartbeat of our college's vibrant event culture. Born from the desire to create a single, immersive platform that captures every laugh, performance, competition, and memory — we are built entirely by students who believe that college life is where the best stories begin.</p></motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-all duration-300"><div className="w-10 h-10 rounded-lg bg-maroon/20 flex items-center justify-center shrink-0"><v.icon size={18} className="text-maroon" /></div><div><h3 className="text-white font-heading text-lg mb-1">{v.title}</h3><p className="text-white/40 font-body text-sm leading-relaxed">{v.desc}</p></div></motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortalFooter() {
  return (
    <footer className="bg-[#0D0100] border-t border-white/[0.04] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-maroon flex items-center justify-center"><Flame size={16} className="text-white" /></div><span className="font-display text-white text-xl tracking-widest">CAMPUS PULSE</span></div>
          <div className="flex items-center gap-4">{[Camera, Video, MessageSquare].map((SocialIcon, i) => (<button key={i} className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all duration-300"><SocialIcon size={15} /></button>))}</div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3"><p className="text-white/20 text-xs font-body">© 2026 EAZYNITI.</p></div>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE COMPONENT ───

export default function CollegePortal() {
  return (
    <div className="bg-[#0D0100] min-h-screen">
      <PortalNavbar />
      <HeroPortal />
      <FestsSection />
      <EventsSection />
      <ArtistsSection />
      <GallerySection />
      {/* <LeaderboardSection /> */}
      <AboutSection />
      <PortalFooter />
    </div>
  );
}