import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    CalendarDays, MapPin, Clock, ArrowDown,
    Menu, X, Mic2, Lightbulb, Users, Rocket,
    Shield, Zap, CheckCircle2, Car
} from "lucide-react";
import { Badge } from "@/component/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/component/ui/sheet";
import { Input } from "@/component/ui/input";
import { Button } from "@/component/ui/button";
import { Label } from "@/component/ui/label";
import { toast } from "sonner";

// ─── COMPONENTS FOR EVENT LANDING PAGE ───

const HERO_IMG = "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop";
const VENUE_IMG = "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop";

const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Highlights", href: "#highlights" },
    { label: "Agenda", href: "#agenda" },
    { label: "Speakers", href: "#speakers" },
    { label: "Venue", href: "#venue" },
];

const highlights = [
    {
        icon: Mic2,
        title: "Keynote Sessions",
        description: "Provocative talks from industry titans who are rewriting the rules of innovation and leadership.",
    },
    {
        icon: Lightbulb,
        title: "Immersive Workshops",
        description: "Hands-on sessions where you'll prototype ideas, learn cutting-edge tools, and build alongside experts.",
    },
    {
        icon: Users,
        title: "Curated Networking",
        description: "Intentionally designed encounters with decision-makers, founders, and creative minds from around the globe.",
    },
    {
        icon: Rocket,
        title: "Live Demonstrations",
        description: "Witness breakthrough products and technologies unveiled for the first time on the Sovereign Stage.",
    },
];

const days = [
    {
        day: "Day 1",
        date: "Sept 15",
        sessions: [
            { time: "9:00 AM", title: "Opening Ceremony", desc: "Welcome address and event kick-off", keynote: true },
            { time: "10:30 AM", title: "The Future of AI in Design", desc: "Exploring generative systems and creative intelligence", keynote: true },
            { time: "12:00 PM", title: "Networking Lunch", desc: "Curated round-table conversations" },
            { time: "2:00 PM", title: "Workshop: Prototyping at Scale", desc: "Hands-on session with industry-leading tools" },
            { time: "4:30 PM", title: "Panel: Ethics in Technology", desc: "A candid discussion on responsible innovation" },
        ],
    },
    {
        day: "Day 2",
        date: "Sept 16",
        sessions: [
            { time: "9:00 AM", title: "Keynote: Building the Invisible", desc: "How ambient technology is reshaping our world", keynote: true },
            { time: "11:00 AM", title: "Workshop: Leadership in Chaos", desc: "Frameworks for navigating uncertainty" },
            { time: "1:00 PM", title: "Live Demo Showcase", desc: "Five startups unveil breakthrough products" },
            { time: "3:30 PM", title: "Fireside Chat: Creativity & Code", desc: "An intimate conversation about art and algorithms", keynote: true },
            { time: "5:00 PM", title: "Evening Reception", desc: "Cocktails and conversation at the Grand Atrium" },
        ],
    },
    {
        day: "Day 3",
        date: "Sept 17",
        sessions: [
            { time: "9:00 AM", title: "Masterclass: Storytelling for Impact", desc: "Craft narratives that move people to action" },
            { time: "11:00 AM", title: "The Next Decade of Design", desc: "Predictions and provocations from leading thinkers", keynote: true },
            { time: "1:00 PM", title: "Workshop: From Idea to IPO", desc: "The accelerated path for modern ventures" },
            { time: "3:00 PM", title: "Closing Keynote", desc: "A final word on the future we're building together", keynote: true },
            { time: "4:30 PM", title: "Farewell Gathering", desc: "Celebrate connections made over three unforgettable days" },
        ],
    },
];

const speakers = [
    {
        name: "Marcus Voss",
        role: "CEO, NovaTech Industries",
        bio: "A pioneer in quantum computing applications, Marcus has spent two decades pushing the boundaries of what's computationally possible. His keynote will explore how invisible technologies are reshaping industries from healthcare to finance.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
    },
    {
        name: "Elena Richter",
        role: "VP Design, Meridian Studio",
        bio: "Elena leads one of the most influential design teams in the world. Her work bridges the gap between human emotion and digital experience, creating products that people don't just use—they feel.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    },
    {
        name: "Julian Park",
        role: "Creative Director, Atelier Flux",
        bio: "Julian's vision for the intersection of art and technology has earned him acclaim from MoMA to MIT. He'll share frameworks for thinking creatively in an age dominated by algorithms.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
    },
    {
        name: "Dr. Amara Chen",
        role: "Research Lead, Future Ethics Institute",
        bio: "Dr. Chen's groundbreaking research on AI ethics and societal impact has shaped policy across three continents. She brings a rare combination of scientific rigor and philosophical depth.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    },
];

const trustCues = [
    { icon: Shield, text: "256-bit encrypted" },
    { icon: Users, text: "Limited to 500 seats" },
    { icon: Zap, text: "Early access perks" },
];

// ─── HELPER COMPONENTS ───

function CountdownUnit({ value, label }) {
    return (
        <div className="flex flex-col items-center">
            <span className="font-heading text-3xl sm:text-5xl md:text-6xl font-light text-white">
                {String(value).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/50 font-body mt-1">
                {label}
            </span>
        </div>
    );
}

function HighlightCard({ item, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
            className="group relative"
        >
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm p-8 sm:p-10 transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.06] hover:shadow-[0_20px_60px_-20px_rgba(129,24,17,0.3)]">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-6 group-hover:bg-white/[0.1] transition-colors duration-500">
                        <item.icon size={22} className="text-white/70 group-hover:text-white transition-colors duration-500" />
                    </div>
                    <h3 className="font-heading text-xl sm:text-2xl text-white font-medium mb-3 tracking-wide">
                        {item.title}
                    </h3>
                    <p className="font-body text-white/45 text-sm leading-[1.7] group-hover:text-white/60 transition-colors duration-500">
                        {item.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

function SessionRow({ session, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className={`group flex gap-6 py-5 border-b border-white/[0.06] last:border-0 transition-all duration-500 ${session.keynote ? "hover:bg-[#0D0100]/40" : "hover:bg-white/[0.02]"
                } px-4 -mx-4 rounded-lg`}
        >
            <div className="w-24 sm:w-28 shrink-0 pt-0.5">
                <span className="font-body text-white/40 text-sm tracking-wide">{session.time}</span>
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-heading text-lg sm:text-xl text-white font-medium">{session.title}</h4>
                    {session.keynote && (
                        <Badge className="bg-[#FF4D4D]/15 text-[#FF4D4D] border-[#FF4D4D]/20 text-[10px] tracking-widest uppercase font-body">
                            Keynote
                        </Badge>
                    )}
                </div>
                <p className="font-body text-white/40 text-sm">{session.desc}</p>
            </div>
        </motion.div>
    );
}

function SpeakerCard({ speaker, index, onSelect, hoveredIdx, setHoveredIdx }) {
    const isOtherHovered = hoveredIdx !== null && hoveredIdx !== index;
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            onMouseEnter={() => setHoveredIdx(index)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => onSelect(speaker)}
            className="group cursor-pointer"
        >
            <div className={`relative overflow-hidden rounded-2xl transition-all duration-700 ${isOtherHovered ? "blur-[2px] scale-[0.97] opacity-60" : "blur-0 scale-100 opacity-100"
                }`}>
                <div className="aspect-[3/4] overflow-hidden rounded-2xl relative">
                    <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter: "saturate(0.3) contrast(1.1)" }} />
                    <div className="absolute inset-0 bg-maroon/30 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0100] via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-heading text-xl sm:text-2xl text-white font-medium mb-1">{speaker.name}</h3>
                        <p className="font-body text-white/50 text-sm">{speaker.role}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// ─── MAIN PAGE SECTIONS ───

function EventNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    const scrollTo = (href) => {
        setMobileOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <motion.nav
            initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm" : "bg-transparent"}`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <span className={`font-heading text-2xl font-semibold tracking-wide transition-colors ${scrolled ? "text-[#811811]" : "text-white"}`}>SOVEREIGN</span>
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button key={link.href} onClick={() => scrollTo(link.href)} className={`text-sm font-body tracking-widest uppercase transition-colors duration-300 ${scrolled ? "text-gray-500 hover:text-[#811811]" : "text-white/70 hover:text-white"}`}>
                            {link.label}
                        </button>
                    ))}
                    <button onClick={() => scrollTo("#register")} className={`ml-4 px-6 py-2.5 font-semibold font-body tracking-wider uppercase rounded-full transition-all duration-300 ${scrolled ? "bg-[#811811] text-white" : "bg-white text-maroon"}`}>
                        Register
                    </button>
                </div>
                <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden p-1 ${scrolled ? "text-[#811811]" : "text-white"}`}>
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100">
                        <div className="px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <button key={link.href} onClick={() => scrollTo(link.href)} className="text-gray-600 hover:text-[#811811] text-sm font-body tracking-widest uppercase text-left transition-colors">
                                    {link.label}
                                </button>
                            ))}
                            <button onClick={() => scrollTo("#register")} className="mt-2 px-6 py-3 bg-[#811811] text-white text-sm font-semibold font-body tracking-wider uppercase rounded-full">
                                Register Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

function ScrollProgress() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <div className="fixed right-0 top-0 w-[2px] h-full z-50 hidden lg:block">
            <motion.div className="w-full bg-white/80 origin-top" style={{ height: `${progress * 100}%` }} transition={{ duration: 0.1 }} />
        </div>
    );
}

function HeroSection() {
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const eventDate = useRef(new Date(Date.now() + 60 * 24 * 60 * 60 * 1000));

    useEffect(() => {
        const tick = () => {
            const diff = eventDate.current - new Date();
            if (diff <= 0) return;
            setCountdown({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
    };

    return (
        <section ref={containerRef} onMouseMove={handleMouseMove} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
            <div className="absolute inset-0 bg-maroon" />
            <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-multiply" style={{ backgroundImage: `url(${HERO_IMG})` }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D0100]/60 via-transparent to-[#0D0100]/80" />
            <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-700 ease-out opacity-30" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)", left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: "translate(-50%, -50%)" }} />
            <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
                    <p className="text-white/50 text-xs sm:text-sm tracking-[0.4em] uppercase font-body mb-6 sm:mb-8">The Definitive Innovation Summit</p>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="font-heading leading-[0.85] mb-6 sm:mb-8">
                    <span className="block text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-light text-white">SOVEREIGN</span>
                    <span className="block text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-light text-transparent bg-clip-text" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>STAGE</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} className="text-white/60 font-body text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 font-light leading-relaxed">
                    Where visionary minds converge to redefine the boundaries of technology, design, and human experience.
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10 sm:mb-14">
                    <div className="flex items-center gap-2 text-white/60"><CalendarDays size={16} className="text-white/40" /> <span className="font-body text-sm tracking-wide">September 15–17, 2026</span></div>
                    <div className="flex items-center gap-2 text-white/60"><Clock size={16} className="text-white/40" /> <span className="font-body text-sm tracking-wide">9:00 AM — 6:00 PM</span></div>
                    <div className="flex items-center gap-2 text-white/60"><MapPin size={16} className="text-white/40" /> <span className="font-body text-sm tracking-wide">The Meridian Hall, New York</span></div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} className="flex justify-center gap-6 sm:gap-10 mb-10 sm:mb-14">
                    <CountdownUnit value={countdown.days} label="Days" />
                    <div className="text-white/20 font-heading text-3xl sm:text-5xl self-start mt-1">:</div>
                    <CountdownUnit value={countdown.hours} label="Hours" />
                    <div className="text-white/20 font-heading text-3xl sm:text-5xl self-start mt-1">:</div>
                    <CountdownUnit value={countdown.minutes} label="Minutes" />
                    <div className="text-white/20 font-heading text-3xl sm:text-5xl self-start mt-1">:</div>
                    <CountdownUnit value={countdown.seconds} label="Seconds" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}>
                    <button onClick={() => document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" })} className="group relative inline-flex items-center gap-3 px-10 py-4 bg-white text-maroon font-body font-semibold text-sm tracking-widest uppercase rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105">
                        <span className="relative z-10">Get Your Pass</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                </motion.div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}><ArrowDown size={20} className="text-white/30" /></motion.div>
            </motion.div>
        </section>
    );
}

function EventOverview() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <section id="overview" ref={ref} className="relative py-28 sm:py-40 bg-white">
            <div className="absolute inset-0 bg-gradient-to-b from-[#811811]/5 to-transparent" />
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 60 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }}>
                    <p className="text-[#811811] text-xs tracking-[0.5em] uppercase font-body mb-6 font-bold">About the Event</p>
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 mb-10 leading-tight">Three Days That Will<br /><span className="italic text-[#811811]/30">Reshape Your Vision</span></h2>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.3 }}>
                    <p className="font-body text-gray-600 text-base sm:text-lg leading-[1.8] max-w-3xl mx-auto mb-8">Sovereign Stage brings together the world's most forward-thinking leaders, creators, and innovators under one roof. This isn't a conference—it's a crucible for ideas that will shape the next decade of technology, design, and culture.</p>
                    <p className="font-body text-gray-400 text-base sm:text-lg leading-[1.8] max-w-3xl mx-auto">Expect intimate keynotes, hands-on workshops, curated networking moments, and live demonstrations that blur the line between imagination and reality. Every detail has been designed to ignite your curiosity and accelerate your impact.</p>
                </motion.div>
                <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 1.5, delay: 0.5 }} className="mt-16 h-[1px] w-32 bg-gradient-to-r from-transparent via-[#811811]/20 to-transparent mx-auto" />
            </div>
        </section>
    );
}

function HighlightsGrid() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <section id="highlights" ref={ref} className="relative py-28 sm:py-40 bg-maroon">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D0100]/40 via-transparent to-[#0D0100]/40" />
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16 sm:mb-20">
                    <p className="text-white/40 text-xs tracking-[0.5em] uppercase font-body mb-6">What to Expect</p>
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight">The <span className="italic text-white/70">Experience</span></h2>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {highlights.map((item, i) => <HighlightCard key={item.title} item={item} index={i} />)}
                </div>
            </div>
        </section>
    );
}

function AgendaTimeline() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [activeDay, setActiveDay] = useState(0);
    return (
        <section id="agenda" ref={ref} className="relative py-28 sm:py-40 bg-white">
            <div className="absolute inset-0 bg-gradient-to-b from-[#811811]/5 to-transparent" />
            <div className="relative z-10 max-w-5xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
                    <p className="text-[#811811] text-xs tracking-[0.5em] uppercase font-body mb-6 font-bold">The Journey</p>
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 leading-tight">Event <span className="italic text-[#811811]/30">Agenda</span></h2>
                </motion.div>
                <div className="flex justify-center gap-3 sm:gap-4 mb-14">
                    {days.map((d, i) => (
                        <button key={d.day} onClick={() => setActiveDay(i)} className={`px-5 sm:px-8 py-3 rounded-full font-body text-sm tracking-wider transition-all duration-400 ${activeDay === i ? "bg-[#811811] text-white font-semibold shadow-lg shadow-[#811811]/20" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                            <span className="hidden sm:inline">{d.day} — </span>{d.date}
                        </button>
                    ))}
                </div>
                <div className="relative">
                    <div className="absolute left-[4.5rem] sm:left-[6.5rem] top-0 bottom-0 w-[1px] bg-gray-100 hidden sm:block" />
                    <div>{days[activeDay].sessions.map((session, i) => (
                        <motion.div
                            key={session.title}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className={`group flex gap-6 py-6 border-b border-gray-100 last:border-0 transition-all duration-500 hover:bg-gray-50 px-4 -mx-4 rounded-xl`}
                        >
                            <div className="w-24 sm:w-28 shrink-0 pt-0.5">
                                <span className="font-body text-gray-400 text-sm tracking-wide">{session.time}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h4 className="font-heading text-lg sm:text-xl text-gray-900 font-medium group-hover:text-[#811811] transition-colors">{session.title}</h4>
                                    {session.keynote && (
                                        <Badge className="bg-[#811811]/10 text-[#811811] border-[#811811]/20 text-[10px] tracking-widest uppercase font-body">
                                            Keynote
                                        </Badge>
                                    )}
                                </div>
                                <p className="font-body text-gray-500 text-sm">{session.desc}</p>
                            </div>
                        </motion.div>
                    ))}</div>
                </div>
            </div>
        </section>
    );
}

function SpeakersGallery() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedSpeaker, setSelectedSpeaker] = useState(null);
    const [hoveredIdx, setHoveredIdx] = useState(null);
    return (
        <section id="speakers" ref={ref} className="relative py-28 sm:py-40 bg-maroon">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D0100]/30 via-transparent to-[#0D0100]/30" />
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16 sm:mb-20">
                    <p className="text-white/40 text-xs tracking-[0.5em] uppercase font-body mb-6">The Luminaries</p>
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight">Featured <span className="italic text-white/70">Speakers</span></h2>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {speakers.map((speaker, i) => <SpeakerCard key={speaker.name} speaker={speaker} index={i} onSelect={setSelectedSpeaker} hoveredIdx={hoveredIdx} setHoveredIdx={setHoveredIdx} />)}
                </div>
            </div>
            <Sheet open={!!selectedSpeaker} onOpenChange={() => setSelectedSpeaker(null)}>
                <SheetContent className="bg-[#0D0100] border-l border-white/[0.06] text-white overflow-y-auto">
                    {selectedSpeaker && (
                        <>
                            <SheetHeader className="mb-6">
                                <SheetTitle className="font-heading text-3xl text-white font-light">{selectedSpeaker.name}</SheetTitle>
                                <SheetDescription className="font-body text-white/50 text-sm">{selectedSpeaker.role}</SheetDescription>
                            </SheetHeader>
                            <div className="aspect-[3/4] rounded-xl overflow-hidden mb-8">
                                <img src={selectedSpeaker.image} alt={selectedSpeaker.name} className="w-full h-full object-cover" style={{ filter: "saturate(0.3) contrast(1.1)" }} />
                            </div>
                            <p className="font-body text-white/60 text-base leading-[1.8]">{selectedSpeaker.bio}</p>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </section>
    );
}

function VenueSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <section id="venue" ref={ref} className="relative py-28 sm:py-40 bg-[#0D0100]">
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16 sm:mb-20">
                    <p className="text-white/40 text-xs tracking-[0.5em] uppercase font-body mb-6">The Stage</p>
                    <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light text-white leading-tight">The <span className="italic text-white/70">Venue</span></h2>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="rounded-2xl overflow-hidden">
                        <img src={VENUE_IMG} alt="The Meridian Hall venue" className="w-full h-64 sm:h-80 lg:h-[400px] object-cover" style={{ filter: "saturate(0.6) contrast(1.1)" }} />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <h3 className="font-heading text-3xl sm:text-4xl text-white font-light mb-6">The Meridian Hall</h3>
                        <p className="font-body text-white/50 text-base leading-[1.8] mb-8">Nestled in the heart of New York City, The Meridian Hall is an architectural masterpiece designed for gatherings that matter. With state-of-the-art acoustics, intimate breakout spaces, and panoramic views of the skyline, every moment here feels significant.</p>
                        <div className="space-y-5">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0"><MapPin size={18} className="text-white/60" /></div>
                                <div><p className="font-body text-white text-sm font-medium mb-0.5">Address</p><p className="font-body text-white/40 text-sm">1250 Broadway, New York, NY 10001</p></div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0"><Clock size={18} className="text-white/60" /></div>
                                <div><p className="font-body text-white text-sm font-medium mb-0.5">Event Hours</p><p className="font-body text-white/40 text-sm">Doors open at 8:30 AM daily</p></div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0"><Car size={18} className="text-white/60" /></div>
                                <div><p className="font-body text-white text-sm font-medium mb-0.5">Parking</p><p className="font-body text-white/40 text-sm">Complimentary valet available for all attendees</p></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function RegistrationForm() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [form, setForm] = useState({ name: "", email: "", organization: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email) { toast.error("Please fill in all required fields."); return; }
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false); setSubmitted(true);
        toast.success("Registration confirmed!");
    };
    const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
    return (
        <section id="register" ref={ref} className="relative py-28 sm:py-40 bg-maroon">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D0100]/40 via-transparent to-[#0D0100]/60" />
            <div className="relative z-10 max-w-xl mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-12">
                    <p className="text-white/40 text-xs tracking-[0.5em] uppercase font-body mb-6">Secure Your Seat</p>
                    <h2 className="font-heading text-4xl sm:text-5xl font-light text-white leading-tight mb-4">Register <span className="italic text-white/70">Now</span></h2>
                    <p className="font-body text-white/40 text-sm">Spaces are limited. Secure your pass before they're gone.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
                    <div className="bg-[#0D0100]/60 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 sm:p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)]">
                        {submitted ? (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                                <CheckCircle2 size={48} className="text-[#FF4D4D] mx-auto mb-4" />
                                <h3 className="font-heading text-2xl text-white mb-2">You're In</h3>
                                <p className="font-body text-white/50 text-sm">Check your email for confirmation details.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div><Label className="font-body text-white/50 text-xs tracking-widest uppercase mb-2 block">Full Name *</Label><Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Your full name" className="bg-transparent border-0 border-b border-white/[0.15] rounded-none text-white placeholder:text-white/20 font-body focus:border-[#FF4D4D] transition-colors duration-500 px-0 h-12" /></div>
                                <div><Label className="font-body text-white/50 text-xs tracking-widest uppercase mb-2 block">Email Address *</Label><Input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="you@company.com" className="bg-transparent border-0 border-b border-white/[0.15] rounded-none text-white placeholder:text-white/20 font-body focus:border-[#FF4D4D] transition-colors duration-500 px-0 h-12" /></div>
                                <div><Label className="font-body text-white/50 text-xs tracking-widest uppercase mb-2 block">Organization</Label><Input value={form.organization} onChange={(e) => handleChange("organization", e.target.value)} placeholder="Company or institution" className="bg-transparent border-0 border-b border-white/[0.15] rounded-none text-white placeholder:text-white/20 font-body focus:border-[#FF4D4D] transition-colors duration-500 px-0 h-12" /></div>
                                <Button type="submit" disabled={loading} className="w-full bg-white text-maroon hover:bg-white/90 font-body font-semibold text-sm tracking-widest uppercase py-6 rounded-full mt-4 transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">{loading ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-[#811811]/30 border-t-[#811811] rounded-full animate-spin" />Processing...</span> : "Get Your Pass"}</Button>
                            </form>
                        )}
                        {!submitted && (
                            <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-white/[0.06]">
                                {trustCues.map((cue) => (<div key={cue.text} className="flex items-center gap-2 text-white/30"><cue.icon size={14} /> <span className="font-body text-xs">{cue.text}</span></div>))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function FinalCTA() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    return (
        <section ref={ref} className="relative py-32 sm:py-44 bg-[#0D0100] overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-maroon/30 rounded-full blur-[120px]" />
            <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1 }}>
                    <p className="text-white/40 text-xs tracking-[0.5em] uppercase font-body mb-8">Don't Miss This</p>
                    <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-light text-white leading-[1.1] mb-8">The Future Won't<br /><span className="italic text-white/60">Wait for You</span></h2>
                    <p className="font-body text-white/40 text-base sm:text-lg leading-[1.8] max-w-xl mx-auto mb-12">Three days. One stage. Unlimited possibility. Join the minds that are shaping what comes next.</p>
                    <button onClick={() => document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" })} className="group relative inline-flex items-center gap-3 px-12 py-5 bg-white text-maroon font-body font-semibold text-sm tracking-widest uppercase rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] hover:scale-105"><span className="relative z-10">Secure Your Spot</span></button>
                </motion.div>
            </div>
            <div className="relative z-10 mt-28 sm:mt-36 pt-8 border-t border-white/[0.05]">
                <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="font-heading text-white/30 text-lg">SOVEREIGN STAGE</span>
                    <p className="font-body text-white/20 text-xs tracking-wider">© 2026 Sovereign Stage. All rights reserved.</p>
                </div>
            </div>
        </section>
    );
}

// ─── FINAL PAGE COMPONENT ───

export default function EventLanding() {
    return (
        <div className="bg-gradient-to-br from-white via-slate-50 to-white min-h-screen text-slate-900 selection:bg-[#811811] selection:text-white">
            <EventNavbar />
            <ScrollProgress />
            <HeroSection />
            <EventOverview />
            <HighlightsGrid />
            <AgendaTimeline />
            <SpeakersGallery />
            <VenueSection />
            <RegistrationForm />
            <FinalCTA />
        </div>
    );
}