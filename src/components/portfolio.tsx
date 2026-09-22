import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Binary,
  BrainCircuit,
  Braces,
  Check,
  ChevronRight,
  CircleUserRound,
  Code2,
  Cpu,
  Github,
  Globe2,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Linkedin,
  LockKeyhole,
  Mail,
  Menu,
  Network,
  Radio,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  Trophy,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import portraitAsset from "@/assets/preethi-portrait.png.asset.json";
import { ActionButton, ActionLink } from "@/components/ui/action";

const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["skills", "Skills"],
  ["cybersecurity", "Security"],
  ["journey", "Journey"],
  ["contact", "Contact"],
] as const;

const securityTopics = [
  ["Network Security", Network, "Understanding secure architectures, traffic, protocols, and resilient network design."],
  ["Ethical Hacking", Terminal, "Learning responsible testing techniques to identify and communicate vulnerabilities."],
  ["Web Security", Globe2, "Exploring common web risks, secure development patterns, and application defense."],
  ["Cryptography", LockKeyhole, "Studying the principles that protect confidentiality, integrity, and trust."],
  ["Digital Forensics", Binary, "Following evidence trails through systems with careful, methodical analysis."],
  ["Threat Intelligence", Radio, "Connecting signals and context to better understand emerging cyber threats."],
  ["Linux & Security", Cpu, "Building confidence with Linux systems, permissions, tooling, and hardening."],
  ["Security Operations", ShieldCheck, "Learning the monitoring, triage, and response workflows used by defenders."],
] as const;

const timeline = [
  ["Computer Science Engineering", GraduationCap],
  ["Learning Programming & Technology", Code2],
  ["Business Symposium", Trophy],
  ["Hackathons & SIH", Braces],
  ["VTU Habba Volunteer", HeartHandshake],
  ["Exploring Cybersecurity", ShieldCheck],
  ["Building My Future in Technology", Sparkles],
] as const;

const interests = [
  ["Technology", Cpu], ["Cybersecurity", ShieldCheck], ["Networking", Network],
  ["Problem Solving", Target], ["Innovation", Lightbulb], ["Teamwork", Users],
  ["Creativity", Sparkles], ["Continuous Learning", BrainCircuit],
] as const;

function AmbientCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const count = reduce ? 18 : mobile ? 28 : 56;
    let frame = 0;
    let width = 0;
    let height = 0;
    const dots = Array.from({ length: count }, () => ({
      x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.00012,
      vy: (Math.random() - 0.5) * 0.00012, r: Math.random() * 1.3 + 0.5,
    }));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      dots.forEach((dot, index) => {
        if (!reduce) {
          dot.x = (dot.x + dot.vx + 1) % 1;
          dot.y = (dot.y + dot.vy + 1) % 1;
        }
        const x = dot.x * width;
        const y = dot.y * height;
        ctx.beginPath(); ctx.arc(x, y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(50, 214, 255, .56)"; ctx.fill();
        for (let j = index + 1; j < dots.length; j += 1) {
          const other = dots[j];
          if (!other) continue;
          const ox = other.x * width; const oy = other.y * height;
          const distance = Math.hypot(x - ox, y - oy);
          if (distance < 135) {
            ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(ox, oy);
            ctx.strokeStyle = `rgba(46, 170, 255, ${0.12 * (1 - distance / 135)})`;
            ctx.lineWidth = 0.7; ctx.stroke();
          }
        }
      });
      if (!reduce) frame = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener("resize", resize, { passive: true });
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(frame); };
  }, []);
  return <canvas ref={ref} className="ambient-canvas" aria-hidden="true" />;
}

function Loader({ done }: { done: () => void }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    let value = 0;
    const id = window.setInterval(() => {
      value += 5;
      if (value >= 100) {
        value = 100; window.clearInterval(id); setLeaving(true);
        window.setTimeout(done, 420);
      }
      setProgress(value);
    }, 45);
    return () => window.clearInterval(id);
  }, [done]);
  return (
    <div className={`loader ${leaving ? "loader-leaving" : ""}`}>
      <div className="loader-grid" />
      <div className="loader-orbit"><span>PA</span><i /><i /><i /></div>
      <p className="loader-name">PREETHI AWARADI</p>
      <div className="loader-progress"><span style={{ width: `${progress}%` }} /></div>
      <p className="loader-count">SYSTEM STARTUP · {String(progress).padStart(3, "0")}%</p>
    </div>
  );
}

function SectionHeading({ index, eyebrow, children }: { index: string; eyebrow: string; children: ReactNode }) {
  return (
    <div className="section-heading reveal">
      <p><span>{index}</span>{eyebrow}</p>
      <h2>{children}</h2>
    </div>
  );
}

function IconCard({ icon: Icon, title, children, delay = 0 }: { icon: LucideIcon; title: string; children: ReactNode; delay?: number }) {
  return (
    <article className="glass-card reveal" style={{ "--delay": `${delay}ms` } as React.CSSProperties}>
      <div className="icon-box"><Icon size={21} strokeWidth={1.7} /></div>
      <h3>{title}</h3><p>{children}</p>
    </article>
  );
}

function NetworkVisual() {
  return (
    <div className="security-visual reveal" aria-hidden="true">
      <div className="scanner" />
      <div className="shield-core"><ShieldCheck size={56} strokeWidth={1.2} /></div>
      {[0, 1, 2, 3, 4, 5].map((n) => <i key={n} className={`orbit-node node-${n}`} />)}
      <svg viewBox="0 0 400 400"><circle cx="200" cy="200" r="128"/><circle cx="200" cy="200" r="78"/><path d="M200 72V122M200 278v50M72 200h50M278 200h50M110 110l55 55M290 110l-55 55M110 290l55-55M290 290l-55-55" /></svg>
    </div>
  );
}

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [journeyProgress, setJourneyProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("is-visible"); });
    }, { threshold: 0.14 });
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const marker = window.scrollY + window.innerHeight * 0.4;
      let current = "home";
      navItems.forEach(([id]) => { const el = document.getElementById(id); if (el && el.offsetTop <= marker) current = id; });
      setActive(current);
      const journey = document.getElementById("journey-line");
      if (journey) {
        const rect = journey.getBoundingClientRect();
        const value = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - rect.top) / Math.max(rect.height, 1)));
        setJourneyProgress(value);
      }
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (event: MouseEvent) => {
      cursorRef.current?.style.setProperty("transform", `translate3d(${event.clientX}px,${event.clientY}px,0)`);
      ringRef.current?.animate({ transform: `translate3d(${event.clientX}px,${event.clientY}px,0)` }, { duration: 320, fill: "forwards" });
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect && rect.bottom > 0) {
        const x = (event.clientX / window.innerWidth - 0.5) * 12;
        const y = (event.clientY / window.innerHeight - 0.5) * 12;
        heroRef.current?.style.setProperty("--mx", `${x}px`);
        heroRef.current?.style.setProperty("--my", `${y}px`);
      }
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(data.get("subject") || "Portfolio hello"));
    const body = encodeURIComponent(`${String(data.get("name") || "Visitor")} wrote:\n\n${String(data.get("message") || "")}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <main className="site-shell">
      {loading && <Loader done={() => setLoading(false)} />}
      <AmbientCanvas />
      <div ref={cursorRef} className="cursor-dot" /><div ref={ringRef} className="cursor-ring" />
      <nav className={`site-nav ${scrolled ? "nav-scrolled" : ""}`} aria-label="Primary navigation">
        <a className="brand-mark" href="#home" aria-label="Preethi Awaradi home">PA<span>.</span></a>
        <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          {navItems.map(([id, label]) => <a key={id} className={active === id ? "active" : ""} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </div>
        <button className="menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button>
      </nav>

      <section id="home" className="hero-section" ref={heroRef}>
        <div className="hero-grid" />
        <div className="hero-copy">
          <div className="status-pill"><span /> OPEN TO LEARNING & COLLABORATION</div>
          <p className="hero-kicker">COMPUTER SCIENCE ENGINEER · CYBERSECURITY EXPLORER</p>
          <h1 aria-label="Preethi Awaradi">{"Preethi".split("").map((letter, i) => <span key={i} style={{ "--i": i } as React.CSSProperties}>{letter}</span>)}<br/><strong>{"Awaradi".split("").map((letter, i) => <span key={i} style={{ "--i": i + 7 } as React.CSSProperties}>{letter}</span>)}</strong></h1>
          <p className="hero-summary">I explore how technology, secure systems, and thoughtful problem-solving can shape a safer digital future.</p>
          <div className="hero-actions">
            <ActionLink href="#journey">Explore my journey <ArrowDown size={17} /></ActionLink>
            <ActionLink href="#contact" variant="ghost">Let's connect <ArrowUpRight size={17} /></ActionLink>
          </div>
          <div className="hero-stats"><span><b>CS</b> Engineering</span><span><b>∞</b> Curiosity</span><span><b>01</b> Purpose</span></div>
        </div>
        <div className="portrait-stage">
          <div className="portrait-orbit"><i/><i/><i/></div>
          <div className="portrait-glow" />
          <div className="portrait-wrap"><div className="portrait-sheen"/><img src={portraitAsset.url} alt="Illustrated portrait of Preethi Awaradi holding a laptop" /></div>
          <div className="portrait-label label-a"><ShieldCheck size={15}/> SECURE BY DESIGN</div>
          <div className="portrait-label label-b"><Code2 size={15}/> BUILD · LEARN · GROW</div>
        </div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><i /></a>
      </section>

      <section id="about" className="content-section about-section">
        <SectionHeading index="01" eyebrow="A LITTLE ABOUT ME">Curious mind.<br/><em>Purposeful builder.</em></SectionHeading>
        <div className="about-layout">
          <div className="about-copy reveal"><p className="lead">I'm a Computer Science Engineering student driven by curiosity about technology and the systems that keep our digital world secure.</p><p>I enjoy breaking complex ideas into clear steps, working with people, and growing through every new challenge. For me, learning is not a phase—it's how I build momentum.</p></div>
          <div className="about-cards">
            <IconCard icon={BrainCircuit} title="Always learning" delay={0}>Turning new concepts into practical understanding.</IconCard>
            <IconCard icon={Target} title="Problem focused" delay={100}>Looking for clear, thoughtful paths through complexity.</IconCard>
            <IconCard icon={Users} title="Better together" delay={200}>Collaborating with empathy, ownership, and energy.</IconCard>
          </div>
        </div>
      </section>

      <section id="skills" className="content-section skills-section">
        <SectionHeading index="02" eyebrow="SKILLS & EXPLORATION">Growing my<br/><em>technical toolkit.</em></SectionHeading>
        <div className="skills-grid">
          <IconCard icon={Code2} title="Programming" delay={0}>Building foundations in logic, algorithms, and writing maintainable code.</IconCard>
          <IconCard icon={Globe2} title="Web Technology" delay={90}>Exploring responsive interfaces and how modern web experiences work.</IconCard>
          <IconCard icon={Network} title="Networks" delay={180}>Understanding protocols, connected systems, and the flow of information.</IconCard>
          <IconCard icon={ShieldCheck} title="Cybersecurity" delay={270}>Studying secure systems, risks, defensive thinking, and ethical practice.</IconCard>
        </div>
        <div className="learning-strip reveal"><span className="live-indicator"><i/> CURRENTLY LEARNING</span><div><b>Linux Security</b><b>Web Security</b><b>Network Fundamentals</b><b>Ethical Hacking</b></div></div>
      </section>

      <section id="cybersecurity" className="content-section cyber-section">
        <div className="cyber-intro">
          <SectionHeading index="03" eyebrow="CYBERSECURITY">Learning to defend<br/><em>what matters.</em></SectionHeading>
          <p className="reveal">Security is where technology meets responsibility. I'm exploring the concepts, tools, and mindsets behind safer systems.</p>
          <NetworkVisual />
        </div>
        <div className="security-grid">
          {securityTopics.map(([title, Icon, description], i) => <IconCard key={title} icon={Icon} title={title} delay={(i % 4) * 80}>{description}</IconCard>)}
        </div>
      </section>

      <section id="achievements" className="content-section achievements-section">
        <SectionHeading index="04" eyebrow="EXPERIENCE & MOMENTS">Learning beyond<br/><em>the classroom.</em></SectionHeading>
        <div className="achievement-grid">
          <article className="achievement hackathon reveal">
            <div className="achievement-icon"><Code2 /></div><p className="mono-label">HACKATHONS & SIH</p><h3>Ideas move faster<br/>when teams build.</h3><p>High-energy problem solving, rapid collaboration, and learning through making.</p>
            <div className="terminal-lines"><span>&gt; BUILD</span><span>&gt; COLLABORATE</span><span>&gt; SOLVE</span><span>&gt; LEARN</span></div>
          </article>
          <article className="achievement symposium reveal">
            <div className="trophy-wrap"><Trophy /><i/><i/><i/></div><p className="mono-label">VISIONARY MINDS</p><h3>Business<br/>Symposium</h3><strong>2nd Place</strong><p>A proud milestone in presenting with clarity, confidence, and purpose.</p>
          </article>
          <article className="achievement volunteering reveal">
            <div className="achievement-icon"><HeartHandshake /></div><p className="mono-label">VTU HABBA</p><h3>Showing up.<br/>Helping out.</h3>
            <div className="mini-timeline"><span><i/><b>Volunteer</b><small>Contributed with energy</small></span><span><i/><b>Collaborator</b><small>Worked across teams</small></span><span><i/><b>Leader</b><small>Took responsibility</small></span></div>
          </article>
        </div>
      </section>

      <section id="interests" className="content-section interests-section">
        <SectionHeading index="05" eyebrow="WHAT ENERGIZES ME">Interests that keep<br/><em>me moving.</em></SectionHeading>
        <div className="interest-cloud">{interests.map(([title, Icon], i) => <div className="interest-chip reveal" key={title} style={{ "--delay": `${i * 55}ms`, "--float-delay": `${-i * .43}s` } as React.CSSProperties}><Icon/><span>{title}</span></div>)}</div>
      </section>

      <section id="journey" className="content-section journey-section">
        <SectionHeading index="06" eyebrow="MY JOURNEY">Every step is<br/><em>building the next.</em></SectionHeading>
        <div id="journey-line" className="journey-line">
          <div className="journey-progress" style={{ transform: `scaleY(${journeyProgress})` }} />
          {timeline.map(([title, Icon], i) => <div className={`journey-stop reveal ${i % 2 ? "journey-right" : ""}`} key={title}><div className="journey-node"><Icon/></div><div className="journey-content"><span>{String(i + 1).padStart(2, "0")}</span><h3>{title}</h3></div></div>)}
        </div>
      </section>

      <section id="contact" className="content-section contact-section">
        <div className="contact-copy">
          <SectionHeading index="07" eyebrow="LET'S CONNECT">Let's build something<br/><em>meaningful.</em></SectionHeading>
          <p className="reveal">Have an opportunity, idea, or simply want to talk technology? I'd love to hear from you.</p>
          <div className="social-row reveal"><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a><a href="mailto:" aria-label="Email"><Mail/></a></div>
        </div>
        <form className="contact-form reveal" onSubmit={submitContact}>
          <label><span>Your name</span><input name="name" required placeholder="How should I address you?" /></label>
          <label><span>Subject</span><input name="subject" required placeholder="What would you like to discuss?" /></label>
          <label><span>Message</span><textarea name="message" required rows={5} placeholder="Write your message here..." /></label>
          <ActionButton type="submit">Open in email <Send size={17}/></ActionButton>
        </form>
      </section>

      <footer><div className="footer-line"><i/></div><a className="brand-mark" href="#home">PA<span>.</span></a><p>Designed with curiosity. Built for what comes next.</p><a href="#home" className="back-top" aria-label="Back to top"><ChevronRight/></a></footer>
    </main>
  );
}