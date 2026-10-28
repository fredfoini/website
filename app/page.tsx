"use client";

/* eslint-disable @next/next/no-img-element */

import {
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code,
  Download,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";

const career = [
  {
    period: "2026 — Present",
    dates: "September 2026 — Present",
    role: "Project / Growth Specialist",
    qualifier: "Data Analytics responsibilities",
    company: "Sandbox Group",
    location: "São Paulo, Brazil",
    accent: true,
    achievements: [
      "I own the Web and Marketing Analytics initiative, building a centralized warehouse that connects Meta Ads, Google Ads, Google Analytics, and first-party data.",
      "I use SQL and Google BigQuery to analyze the acquisition and conversion funnel hourly, with New Buyers as the North Star metric.",
      "My cart-abandonment analysis and cross-platform data integration contributed to a 50% reduction in CAC and doubled daily sales.",
    ],
  },
  {
    period: "2022 — Present",
    dates: "May 2022 — Present",
    role: "Marketing Coordinator",
    qualifier: "Data Analytics responsibilities",
    company: "Coca-Cola FEMSA",
    location: "São Paulo, Brazil",
    achievements: [
      "I analyzed promotions, customer behavior, campaign performance, and conversion for Juntos+, increasing promotion conversion by 15% while managing more than R$5 million in budget.",
      "I led Brazil’s rollout of Braze and Amplitude across Brazil, Mexico, Deloitte, and Coca-Cola FEMSA, delivering both platforms within one month.",
      "I used partner performance analytics across iFood, Amazon, Daki, Rappi, and PedidosYa to drive B2C growth, including increasing Monster Energy’s share of sales from 35% to 49%.",
    ],
  },
  {
    period: "2021 — 2022",
    dates: "November 2021 — May 2022",
    role: "Senior Growth Analyst",
    company: "Clube do Valor",
    location: "Porto Alegre, Brazil",
    achievements: [
      "I built the foundation of the Wealth Management growth strategy as the company’s first dedicated Growth professional.",
      "I launched the first chatbot MVP as Growth Team Lead, using customer interviews and UX writing to increase sales by 5%.",
    ],
  },
  {
    period: "2020 — 2021",
    dates: "February 2020 — November 2021",
    role: "Product Analyst",
    company: "Company Hero",
    location: "São Paulo, Brazil",
    achievements: [
      "I owned a content platform that achieved 15+ first-place long-tail rankings, 5,000+ organic impressions, and a 5% conversion rate.",
      "I led discovery and development for a Marketing Consulting MVP that generated its first R$50,000 in revenue from scratch.",
    ],
  },
  {
    period: "2019 — 2020",
    dates: "December 2019 — February 2020",
    role: "Developer",
    company: "Foini Consultores",
    location: "São Paulo, Brazil",
    achievements: [
      "I led the first training portal from concept to delivery in a single one-week sprint; it reached 500+ users in its first week.",
      "I launched the B2B training program Knowing the Needs of Your Clients, attracting 30+ participants against an OKR target of 15.",
    ],
  },
  {
    period: "2019 — 2020",
    dates: "July 2019 — February 2020",
    role: "Growth Analyst",
    company: "RedaWeb",
    location: "São Paulo, Brazil",
    achievements: [
      "I applied a Growth Marketing methodology to improve organic acquisition funnels across varied industries, reaching an average 10% conversion rate.",
    ],
  },
];

const metrics = [
  { value: 50, prefix: "−", suffix: "%", label: "CAC at Sandbox Group" },
  { value: 2, prefix: "", suffix: "×", label: "daily sales at Sandbox Group" },
  { value: 10, prefix: "+", suffix: " pp", label: "Crystal Water repurchase" },
  { value: 14, prefix: "+", suffix: " pp", label: "Monster share of sales" },
];

const projects = [
  {
    slug: "product-pulse",
    name: "Product Pulse",
    category: "Product intelligence",
    headline: "Product intelligence that compounds.",
    description:
      "I’m building a personalized, source-first daily briefing for Product Owners, Product Managers, and Business Analysts. I’m bringing a tailored feed, market signals, a grounded AI assistant, and saved intelligence into one focused workspace.",
    features: [
      "Role, market, and goal personalization",
      "Source-linked analysis and confidence signals",
      "ChatGPT sign-in with account-synced saves",
    ],
    stack: ["Next.js", "TypeScript", "D1 + Drizzle", "Framer Motion"],
    signal: "Brief · signals · assistant · library",
    image: "/website/media/project-product-pulse.webp",
    imageAlt: "Product Pulse product-intelligence identity",
    imageHeight: 788,
  },
  {
    slug: "infinita",
    name: "Infinita",
    category: "AI-native game engine",
    headline: "I’m building an emergent world that remembers.",
    description:
      "I’m creating a text RPG where a deterministic TypeScript engine remains the authority over state, tests, combat, economy, and progression—while AI providers narrate inside validated boundaries.",
    features: [
      "Persistent canon, NPC, objective, and session memory",
      "Dynamic d20 skills with five result grades",
      "Provider failover and a local pixel-art scene system",
    ],
    stack: ["Next.js", "TypeScript", "Narrative AI", "Persistent memory"],
    signal: "89.4% less narrative context in my current benchmark",
    image: "/website/media/project-infinita.webp",
    imageAlt: "Pixel-art village scene from Infinita",
    imageHeight: 844,
  },
];

const gallery = [
  {
    src: "/website/media/coca-cola-portrait.webp",
    alt: "Me presenting a Coca-Cola bottle",
    caption: "Data-informed brand and customer performance",
    tag: "Coca-Cola FEMSA",
    className: "gallery-tall",
  },
  {
    src: "/website/media/coca-cola-team.webp",
    alt: "Me with colleagues at a Coca-Cola FEMSA event",
    caption: "Cross-functional analytics in the field",
    tag: "Juntos+",
    className: "gallery-wide",
  },
  {
    src: "/website/media/product-presentation.webp",
    alt: "Me presenting a product roadmap to colleagues",
    caption: "Turning analysis into an aligned roadmap",
    tag: "Data storytelling",
    className: "gallery-standard",
  },
  {
    src: "/website/media/ifood-event.webp",
    alt: "Me at an iFood event",
    caption: "Commerce partner performance and growth",
    tag: "B2C commerce",
    className: "gallery-tall",
  },
  {
    src: "/website/media/monster-team.webp",
    alt: "Me with a product team holding Monster Energy cans",
    caption: "Turning paid media into measurable share",
    tag: "Monster Energy",
    className: "gallery-tall",
  },
  {
    src: "/website/media/product-event.webp",
    alt: "Me in conversation with colleagues at a product event",
    caption: "Customer insight before the model",
    tag: "Research",
    className: "gallery-tall",
  },
];

const capabilities = [
  "SQL & BigQuery",
  "Web & marketing analytics",
  "Growth analytics",
  "Funnel & customer journey analysis",
  "BI & dashboarding",
  "Acquisition & conversion analytics",
  "Experimentation",
  "Business analysis",
  "Product analytics",
  "Stakeholder management",
  "Data storytelling",
  "Agile delivery",
  "Project management",
  "Communication",
];

const tools = [
  "SQL",
  "Google BigQuery",
  "Power BI",
  "Looker Studio",
  "Google Analytics",
  "Google Ads",
  "Meta Ads",
  "Amplitude",
  "Braze",
  "Jira",
  "Confluence",
  "OKRs",
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  function handleMove(event: ReactMouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left - bounds.width / 2) * 0.16);
    y.set((event.clientY - bounds.top - bounds.height / 2) * 0.16);
  }

  return (
    <motion.div
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

function Counter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const duration = 1300;
    const started = performance.now();

    const update = (now: number) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function SectionHeading({
  index,
  eyebrow,
  title,
  copy,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <Reveal className="section-heading-meta">
        <span>{index}</span>
        <span>{eyebrow}</span>
      </Reveal>
      <Reveal className="section-heading-main" delay={0.08}>
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </Reveal>
    </div>
  );
}

function Cursor() {
  const x = useMotionValue(-50);
  const y = useMotionValue(-50);
  const smoothX = useSpring(x, { stiffness: 500, damping: 32, mass: 0.2 });
  const smoothY = useSpring(y, { stiffness: 500, damping: 32, mass: 0.2 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX - 6);
      y.set(event.clientY - 6);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return <motion.div aria-hidden="true" className="custom-cursor" style={{ x: smoothX, y: smoothY }} />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32, mass: 0.35 });
  const heroImageY = useTransform(scrollY, [0, 1000], [0, 150]);
  const heroTextY = useTransform(scrollY, [0, 800], [0, 70]);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell">
        <motion.div className="scroll-progress" style={{ scaleX: progress }} />
        <Cursor />

        <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
          <a className="brand" href="#top" aria-label="Back to top">
            <span className="brand-mark">FF</span>
            <span className="brand-copy">
              <strong>Frederico Foini</strong>
              <small>Data · Growth · Product</small>
            </span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#impact">Impact</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#stack">Stack</a>
            <a href="#about">About</a>
          </nav>

          <Magnetic className="header-resume-wrap">
            <a className="header-resume" href="/website/Frederico-Foini-Resume.pdf" download>
              Résumé <Download size={15} aria-hidden="true" />
            </a>
          </Magnetic>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </header>

        <AnimatePresence>
          {menuOpen ? (
            <motion.nav
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.24 }}
            >
              <a href="#impact" onClick={closeMenu}>Impact <span>01</span></a>
              <a href="#projects" onClick={closeMenu}>Projects <span>02</span></a>
              <a href="#experience" onClick={closeMenu}>Experience <span>03</span></a>
              <a href="#stack" onClick={closeMenu}>Stack <span>04</span></a>
              <a href="#about" onClick={closeMenu}>About <span>06</span></a>
              <a href="#contact" onClick={closeMenu}>Contact <span>07</span></a>
            </motion.nav>
          ) : null}
        </AnimatePresence>

        <main>
          <section id="top" className="hero" aria-labelledby="hero-title">
            <motion.div className="hero-texture" style={{ y: heroImageY }} aria-hidden="true" />
            <div className="hero-glow" aria-hidden="true" />
            <div className="hero-grid" aria-hidden="true" />

            <div className="hero-stage">
              <motion.div className="hero-content" style={{ y: heroTextY }}>
              <motion.div
                className="hero-kicker"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.7 }}
              >
                <span className="status-dot" />
                Data Analytics · Growth · Product · São Paulo, Brazil
              </motion.div>

              <div className="hero-title-wrap">
                <motion.h1
                  id="hero-title"
                  initial={{ opacity: 0, y: 52 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  Turning data into
                  <span>measurable growth.</span>
                </motion.h1>
                <motion.div
                  className="hero-orbit"
                  initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.75, duration: 0.85 }}
                  aria-hidden="true"
                >
                  <span>data</span>
                  <span>growth</span>
                  <span>product</span>
                </motion.div>
              </div>

              <motion.div
                className="hero-support"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.48, duration: 0.7 }}
              >
                <p>
                  I connect analytics, growth, and product to diagnose funnels, understand customer behavior,
                  and turn complex business questions into measurable action.
                </p>
                <div className="hero-actions">
                  <Magnetic>
                    <a className="button button-gold" href="#impact">
                      Explore the impact <ArrowDownRight size={18} aria-hidden="true" />
                    </a>
                  </Magnetic>
                  <a className="text-link" href="mailto:fredericofoini@gmail.com">
                    Start a conversation <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
              </motion.div>

              <motion.div
                className="hero-portrait-wrap"
                initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                transition={{ delay: 0.35, duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="portrait-frame">
                  <img
                    src="/website/media/portrait.webp"
                    alt="Portrait of me"
                    width="400"
                    height="400"
                    fetchPriority="high"
                  />
                  <span className="portrait-index">00 / FF</span>
                </div>
                <div className="portrait-caption">
                  <span>7+ years</span>
                  <p>Analytics, growth, and digital product</p>
                </div>
              </motion.div>
            </div>

            <div className="hero-foot">
              <div className="hero-foot-note">
                <span>Current focus</span>
                <strong>Growth analytics · SQL · BigQuery</strong>
              </div>
              <a className="scroll-cue" href="#impact" aria-label="Scroll to impact section">
                <span>Scroll</span>
                <i />
              </a>
            </div>
          </section>

          <section id="impact" className="impact-section section-pad">
            <div className="page-width">
              <SectionHeading
                index="01"
                eyebrow="Analytics in action"
                title={<>Data becomes valuable when it <em>moves the business.</em></>}
                copy="Across Sandbox Group and Coca-Cola FEMSA, I connect acquisition, customer, campaign, and product signals to decisions that improve conversion, efficiency, and revenue."
              />

              <div className="impact-story">
                <Reveal className="impact-image-main">
                  <div className="image-shell image-shell-red">
                    <img
                      src="/website/media/coca-cola-portrait.webp"
                      alt="Me holding a Coca-Cola bottle"
                      width="1050"
                      height="1400"
                      loading="lazy"
                    />
                    <span className="image-label">Coca-Cola FEMSA · São Paulo</span>
                  </div>
                </Reveal>

                <div className="impact-copy">
                  <Reveal>
                    <div className="impact-role">
                      <span>May 2022 — Present</span>
                      <h3>Marketing Coordinator</h3>
                      <p>with Data Analytics responsibilities</p>
                    </div>
                  </Reveal>

                  <span className="mini-label">Selected analytics outcomes</span>
                  <div className="metric-grid">
                    {metrics.map((metric, index) => (
                      <Reveal className="metric" delay={index * 0.07} key={metric.label}>
                        <strong>
                          <Counter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                        </strong>
                        <span>{metric.label}</span>
                      </Reveal>
                    ))}
                  </div>

                  <Reveal className="impact-narrative">
                    <span className="mini-label">The operating system</span>
                    <p>
                      At Coca-Cola FEMSA, I use promotion, customer, campaign, and conversion analysis to connect
                      product and marketing decisions to commercial performance. I improved promotion conversion by
                      15%, increased Crystal Water repurchase from 30% to 40%, and helped strategic partners grow
                      market share by more than 5%.
                    </p>
                  </Reveal>
                </div>
              </div>

              <div className="platform-story">
                <Reveal className="platform-copy">
                  <span className="mini-label">Current analytics foundation</span>
                  <h3>One source of truth for the acquisition funnel.</h3>
                  <p>
                    I’m building a centralized data warehouse that integrates Meta Ads, Google Ads, Google
                    Analytics, and first-party databases. The resulting dashboards make sales, CVR, CAC, channels,
                    and customer journeys visible in one operating view.
                  </p>
                  <div className="platform-tags" aria-label="Analytics tools and channels">
                    <span>SQL</span><span>BigQuery</span><span>Looker Studio</span><span>Google Analytics</span><span>Meta Ads</span>
                  </div>
                </Reveal>
                <Reveal className="platform-visual" delay={0.12}>
                  <div className="visual-rings" aria-hidden="true">
                    <div className="ring ring-one"><span>Acquire</span></div>
                    <div className="ring ring-two"><span>Convert</span></div>
                    <div className="ring ring-three"><span>Grow</span></div>
                    <strong>2×<br /><small>daily sales</small></strong>
                  </div>
                </Reveal>
              </div>

              <div className="commerce-story">
                <Reveal className="commerce-image">
                  <img
                    src="/website/media/monster-portrait-selective.webp"
                    alt="Me in front of a Monster Energy wall display"
                    width="1085"
                    height="1449"
                    loading="lazy"
                  />
                  <span>Monster Energy · B2C commerce</span>
                </Reveal>
                <Reveal className="commerce-copy" delay={0.08}>
                  <div className="metric-arrow" aria-hidden="true">35 <span>→</span> 49%</div>
                  <h3>Paid media translated into share.</h3>
                  <p>
                    I redesigned the in-app paid media strategy across B2C commerce partners, increasing Monster
                    Energy’s share of sales from 35% to 49% in 2025.
                  </p>
                  <div className="partner-line">
                    <span>iFood</span><span>Amazon</span><span>Daki</span><span>Rappi</span><span>PedidosYa</span>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="projects" className="projects-section section-pad">
            <div className="page-width">
              <SectionHeading
                index="02"
                eyebrow="Current builds"
                title={<>Ideas become useful when they become <em>systems.</em></>}
                copy="Product remains a core part of how I work. These two builds turn data, market signals, and complex systems into focused experiences people can actually use."
              />

              <div className="projects-list">
                {projects.map((project, index) => (
                  <motion.article
                    className={`project-card project-${project.slug}`}
                    key={project.slug}
                    initial={{ opacity: 0, y: 54 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-90px" }}
                    transition={{ duration: 0.82, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="project-media">
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        width={1500}
                        height={project.imageHeight}
                        loading="lazy"
                      />
                      <span className="project-number">0{index + 1}</span>
                      <span className="project-status"><i /> Current project</span>
                    </div>

                    <div className="project-content">
                      <div className="project-eyebrow">
                        <span>{project.category}</span>
                        <span>Built by me</span>
                      </div>
                      <h3>{project.name}</h3>
                      <p className="project-headline">{project.headline}</p>
                      <p className="project-description">{project.description}</p>

                      <ul className="project-features">
                        {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                      </ul>

                      <div className="project-signal">
                        <span>Inside the build</span>
                        <strong>{project.signal}</strong>
                      </div>

                      <div className="project-stack" aria-label={`${project.name} technology stack`}>
                        {project.stack.map((item) => <span key={item}>{item}</span>)}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section id="experience" className="timeline-section section-pad">
            <div className="page-width">
              <SectionHeading
                index="03"
                eyebrow="Career progression"
                title={<>A career built by <em>learning in motion.</em></>}
                copy="From SEO and rapid MVPs to regional commerce and full-funnel analytics, each chapter expanded how I connect evidence, customer behavior, and business outcomes."
              />

              <div className="timeline">
                <div className="timeline-line" aria-hidden="true">
                  <motion.i
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                {career.map((item, index) => (
                  <motion.article
                    className={`timeline-item ${item.accent ? "timeline-featured" : ""}`}
                    key={`${item.company}-${item.dates}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? 28 : -28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.72, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="timeline-dot" aria-hidden="true"><span /></div>
                    <div className="timeline-period">
                      <strong>{item.period}</strong>
                      <span>{item.dates}</span>
                    </div>
                    <div className="timeline-card">
                      <div className="timeline-card-head">
                        <div>
                          <h3>{item.role}</h3>
                          {item.qualifier ? <p className="timeline-qualifier">{item.qualifier}</p> : null}
                        </div>
                        <span className="timeline-number">0{career.length - index}</span>
                      </div>
                      <div className="timeline-company">
                        <strong>{item.company}</strong>
                        <span>{item.location}</span>
                      </div>
                      <ul>
                        {item.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
                      </ul>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section id="stack" className="stack-section section-pad">
            <div className="page-width">
              <SectionHeading
                index="04"
                eyebrow="Operating stack"
                title={<>From raw signals to <em>business action.</em></>}
                copy="I use analytics, growth, and product methods as one connected toolkit—from querying and validating data to explaining what it means and deciding what happens next."
              />

              <div className="capability-field">
                {capabilities.map((capability, index) => (
                  <motion.span
                    key={capability}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % 6) * 0.05, duration: 0.45 }}
                  >
                    {capability}
                  </motion.span>
                ))}
              </div>

              <div className="tool-marquee" aria-label="Tools and platforms">
                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                >
                  {[...tools, ...tools].map((tool, index) => (
                    <span key={`${tool}-${index}`}>{tool}<i>✦</i></span>
                  ))}
                </motion.div>
              </div>

              <div className="stack-columns">
                <Reveal className="stack-principle">
                  <span className="mini-label">Operating principle</span>
                  <blockquote>
                    “Simplicity is the discipline of making the next useful decision obvious.”
                  </blockquote>
                  <p>
                    That approach guides me from warehouse design and funnel diagnosis to experiments, dashboards,
                    and product decisions.
                  </p>
                </Reveal>
                <Reveal className="language-card" delay={0.1}>
                  <span className="mini-label">Languages</span>
                  <div><strong>English</strong><span>Full professional</span></div>
                  <div><strong>Spanish</strong><span>Full professional</span></div>
                  <div><strong>Italian</strong><span>Full professional</span></div>
                  <div><strong>Portuguese</strong><span>Native or bilingual</span></div>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="gallery-section section-pad" aria-labelledby="gallery-title">
            <div className="page-width">
              <div className="gallery-heading">
                <Reveal>
                  <span className="section-index">05</span>
                  <p>Selected moments</p>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 id="gallery-title">Insights become useful<br /><em>between people.</em></h2>
                </Reveal>
              </div>

              <div className="gallery-grid">
                {gallery.map((image, index) => (
                  <motion.figure
                    className={image.className}
                    key={image.src}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, delay: (index % 3) * 0.07 }}
                  >
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <figcaption>
                      <span>{image.tag}</span>
                      <strong>{image.caption}</strong>
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>
          </section>

          <section id="about" className="about-section section-pad">
            <div className="page-width about-grid">
              <Reveal className="about-visual">
                <div className="about-portrait">
                  <img
                    src="/website/media/portrait-profile.webp"
                    alt="A profile portrait of me"
                    width="341"
                    height="342"
                    loading="lazy"
                  />
                </div>
                <div className="about-signal">
                  <span>Based in</span>
                  <strong>São Paulo</strong>
                  <MapPin size={18} aria-hidden="true" />
                </div>
              </Reveal>

              <div className="about-copy">
                <SectionHeading
                  index="06"
                  eyebrow="About me"
                  title={<>Curious enough to ask. Rigorous enough to <em>measure.</em></>}
                />
                <Reveal>
                  <p className="about-lead">
                    I’m a Senior Data Analyst with 7+ years analyzing business performance, optimizing customer
                    journeys, and delivering measurable outcomes. My background connects Data Analytics, Growth,
                    Business Analysis, and Product so I can move from evidence to action without losing context.
                  </p>
                </Reveal>

                <div className="education-grid">
                  <Reveal className="education-column">
                    <span className="mini-label">Education</span>
                    <article>
                      <span>2026—27</span>
                      <div>
                        <strong>Data Engineering & Analytics</strong>
                        <p>DataCamp · Data Analytics & Business Intelligence</p>
                      </div>
                    </article>
                    <article>
                      <span>2024</span>
                      <div>
                        <strong>Master in Product Management</strong>
                        <p>Talent Garden · Business Administration & Management</p>
                      </div>
                    </article>
                    <article>
                      <span>2021</span>
                      <div>
                        <strong>Bachelor of Technology in Marketing</strong>
                        <p>Universidade Presbiteriana Mackenzie</p>
                      </div>
                    </article>
                    <article>
                      <span>2019</span>
                      <div>
                        <strong>Bachelor’s Degree in History</strong>
                        <p>Universidade Federal de São Paulo</p>
                      </div>
                    </article>
                  </Reveal>
                  <Reveal className="cert-column" delay={0.1}>
                    <span className="mini-label">Certifications</span>
                    <ul>
                      <li>How to Build Digital Products</li>
                      <li>Growth Hacking with Digital Marketing</li>
                      <li>Becoming a Product Manager</li>
                      <li>Identifying Your Customer’s Preferences</li>
                    </ul>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="contact-section">
            <div className="contact-texture" aria-hidden="true" />
            <div className="page-width contact-inner">
              <Reveal className="contact-kicker">
                <span className="status-dot" />
                Let’s make the next move useful
              </Reveal>
              <Reveal className="contact-title" delay={0.08}>
                <h2>Have a challenge in<br />data, growth, or <em>product?</em></h2>
              </Reveal>
              <Reveal className="contact-actions" delay={0.16}>
                <Magnetic>
                  <a className="contact-email" href="mailto:fredericofoini@gmail.com">
                    <span>Write to me</span>
                    <strong>fredericofoini@gmail.com</strong>
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </Magnetic>
                <div className="contact-links">
                  <a href="https://www.linkedin.com/in/fredericofoini" target="_blank" rel="noreferrer">
                    <BriefcaseBusiness size={17} aria-hidden="true" /> LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                  <a href="https://github.com/fredfoini" target="_blank" rel="noreferrer">
                    <Code size={17} aria-hidden="true" /> GitHub <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                  <a href="tel:+5511963215409">
                    <Phone size={17} aria-hidden="true" /> +55 11 96321 5409
                  </a>
                  <a href="/website/Frederico-Foini-Resume.pdf" download>
                    <Download size={17} aria-hidden="true" /> Download résumé
                  </a>
                </div>
              </Reveal>
              <div className="contact-footer">
                <span>© 2026 Frederico Foini</span>
                <span>Data Analytics · Growth · Product · São Paulo</span>
                <a href="#top">Back to top <ArrowUpRight size={13} aria-hidden="true" /></a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </MotionConfig>
  );
}
