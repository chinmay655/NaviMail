import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail, Menu, X, ArrowRight, ShieldCheck, Search, Users, Zap,
  Inbox, Send, Star, FileText, Archive, Trash2, Check, Globe2,
  SlidersHorizontal, Layers3, CheckCircle2, Building2, CalendarDays,
  ArrowUpRight, Headphones, Sparkles, MessageSquareText, ServerCog,
  ChevronDown, ChevronUp, Cloud, Plus, MailCheck,
} from "lucide-react";
import "./style.css";

gsap.registerPlugin(ScrollTrigger);

const CONFIG = {
  brand: "NaviMail",
  company: "Navicent",
  contactEmail: "sales@navicentsolutions.com",
};

const NAV_ITEMS = [
  ["#why", "Why NaviMail"],
  ["#features", "Features"],
  ["#how", "How It Works"],
  ["#experience", "Product"],
  ["#security", "Security"],
  ["#hybrid", "Hybrid Email"],
];

const FEATURES = [
  { icon: Mail, title: "Professional Domain Email", desc: "Create business email addresses using your own company domain." },
  { icon: Globe2, title: "Webmail Access Anywhere", desc: "Access your mailbox through a web browser on your preferred devices." },
  { icon: Inbox, title: "POP3 & IMAP Support", desc: "Connect your mailbox to compatible desktop and mobile email applications." },
  { icon: CalendarDays, title: "Calendars, Contacts & Tasks", desc: "Manage meetings, contacts and everyday tasks alongside your email." },
  { icon: ShieldCheck, title: "Antivirus & Spam Filtering", desc: "Protect your inbox with built-in, configurable antivirus and spam filtering." },
  { icon: ServerCog, title: "Flexible Mailbox Options", desc: "Choose between 2 GB, 5 GB and 10 GB mailbox storage options." },
  { icon: Layers3, title: "Email Aliases", desc: "Configure multiple email aliases for your business communication." },
  { icon: MessageSquareText, title: "Threaded Conversations", desc: "Keep related email messages organized in conversations." },
  { icon: Users, title: "Hybrid Email Coexistence", desc: "Use NaviMail alongside Microsoft 365 or Google Workspace." },
];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="NaviMail home">
      <img
        src="/navimail.in.png"
        alt="NaviMail"
        className="navimail-brand-image"
      />
    </a>
  );
}

function CTA({ children = "Request Demo", secondary = false }) {
  return (
    <a className={`btn ${secondary ? "btn-outline" : "btn-primary"} orbit-magnetic`}
      href={secondary ? "#features" : "#demo"}>
      {children} {!secondary && <ArrowRight size={17} />}
    </a>
  );
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="section-title" data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </div>
  );
}

function MailPreview() {
  const mails = [
    ["CS", "Client Success", "Project update & next steps", "10:24 AM"],
    ["MT", "Marketing Team", "Creative assets for review", "9:37 AM"],
    ["NA", "Accounts Team", "Your monthly statement", "8:11 AM"],
    ["PT", "Product Team", "Updates from the team", "Yesterday"],
  ];
  return (
    <div className="mail-window">
      <div className="mail-top">
        <span className="mini-logo"><Mail size={14} /> NaviMail</span>
        <span className="fake-search"><Search size={12} /> Search messages</span>
        <span className="user-dot">JD</span>
      </div>
      <div className="mail-body">
        <div className="mail-sidebar">
          <span className="compose"><Mail size={13} /> Compose</span>
          {[[Inbox, "Inbox"], [Star, "Starred"], [Send, "Sent"], [FileText, "Drafts"], [Archive, "Archive"], [Trash2, "Trash"]]
            .map(([Icon, label], index) => (
              <div className={`side-item ${index === 0 ? "selected" : ""}`} key={label}>
                <Icon size={14} /> {label} {index === 0 && <span>12</span>}
              </div>
            ))}
        </div>
        <div className="inbox-pane">
          <div className="inbox-title"><strong>Inbox <span>(12)</span></strong><SlidersHorizontal size={15} /></div>
          {mails.map((mail, index) => (
            <div className="email-row" key={mail[1]}>
              <span className={`avatar a${index}`}>{mail[0]}</span>
              <div className="email-info">
                <div className="email-meta"><strong>{mail[1]}</strong><small>{mail[3]}</small></div>
                <p>{mail[2]}</p>
                <span>Here is the latest update for your team…</span>
              </div>
              <Star size={13} className="email-star" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* NAVIMAIL COOKIE CONSENT */

const COOKIE_STORAGE_KEY = "navimail-cookie-consent-v1";

const COOKIE_CATEGORIES = [
  {
    id: "functional",
    label: "Functional",
    description:
      "Necessary for essential website functions, including remembering your cookie preferences.",
  },
  {
    id: "statistics",
    label: "Statistics",
    description:
      "Optional cookies used to understand how visitors interact with our website.",
  },
  {
    id: "marketing",
    label: "Marketing",
    description:
      "Optional cookies used for advertising, campaign measurement and related services.",
  },
];

function CookieConsent() {
  const [visible, setVisible] = useState(() => {
    try {
      return !localStorage.getItem(COOKIE_STORAGE_KEY);
    } catch {
      return true;
    }
  });

  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(COOKIE_STORAGE_KEY) || "null");
      return {
        functional: true,
        statistics: Boolean(saved?.statistics),
        marketing: Boolean(saved?.marketing),
      };
    } catch {
      return { functional: true, statistics: false, marketing: false };
    }
  });

  const [expanded, setExpanded] = useState("");

  useEffect(() => {
    const openPreferences = () => setVisible(true);

    window.addEventListener(
      "navimail:open-cookie-settings",
      openPreferences
    );

    return () => {
      window.removeEventListener(
        "navimail:open-cookie-settings",
        openPreferences
      );
    };
  }, []);

  const saveConsent = (choice, values) => {
    const consent = {
      choice,
      functional: true,
      statistics: Boolean(values.statistics),
      marketing: Boolean(values.marketing),
      updatedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(
        COOKIE_STORAGE_KEY,
        JSON.stringify(consent)
      );
    } catch {
      // Continue without persistence if storage is unavailable.
    }


    window.dispatchEvent(
      new CustomEvent("navimail:consent-changed", {
        detail: consent,
      })
    );

    // Send cookie decision to the Hostinger PHP endpoint
    if (import.meta.env.PROD) {
      fetch("/api/consent.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        keepalive: true,
        body: JSON.stringify({
          choice: consent.choice,
          statistics: consent.statistics,
          marketing: consent.marketing,
        }),
      })
        .then(async (response) => {
          const result = await response.json();

          if (!response.ok || result.saved !== true) {
            throw new Error("Consent logging failed");
          }
        })
        .catch((error) => {
          console.error("Could not record cookie consent:", error);
        });
    }

    setPreferences(consent);
    setVisible(false);
    };

    if (!visible) return null;

    return (
      <div
        className="navimail-consent-overlay"
        role="presentation"
      >
        <section
          className="navimail-consent"
          role="dialog"
          aria-modal="false"
          aria-labelledby="navimail-consent-title"
          aria-describedby="navimail-consent-description"
        >
          <div className="navimail-consent-header">
            <h2 id="navimail-consent-title">
              Manage Consent
            </h2>

            <button
              type="button"
              className="navimail-consent-close"
              aria-label="Close cookie preferences"
              onClick={() => setVisible(false)}
            >
              <X size={21} />
            </button>
          </div>

          <p id="navimail-consent-description">
            We use cookies to support essential website
            functionality and, with your permission, to
            understand how visitors use our website and
            improve our services. You can accept, deny
            or customize optional cookies.
          </p>

          <div className="navimail-consent-categories">
            {COOKIE_CATEGORIES.map((category) => {
              const isFunctional =
                category.id === "functional";

              const isExpanded =
                expanded === category.id;

              return (
                <div
                  className="navimail-consent-category"
                  key={category.id}
                >
                  <div className="navimail-consent-category-row">
                    <span className="navimail-consent-category-name">
                      {category.label}
                    </span>

                    {isFunctional ? (
                      <span className="navimail-always-active">
                        Always active
                      </span>
                    ) : (
                      <label className="navimail-consent-switch">
                        <input
                          type="checkbox"
                          checked={preferences[category.id]}
                          onChange={(event) =>
                            setPreferences((previous) => ({
                              ...previous,
                              [category.id]:
                                event.target.checked,
                            }))
                          }
                          aria-label={`Enable ${category.label} cookies`}
                        />
                        <span className="navimail-consent-slider" />
                      </label>
                    )}

                    <button
                      type="button"
                      className="navimail-consent-expand"
                      aria-label={`Details about ${category.label}`}
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpanded(
                          isExpanded ? "" : category.id
                        )
                      }
                    >
                      {isExpanded ? (
                        <ChevronUp size={19} />
                      ) : (
                        <ChevronDown size={19} />
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <p className="navimail-consent-detail">
                      {category.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="navimail-consent-actions">
            <button
              type="button"
              className="navimail-consent-accept"
              onClick={() =>
                saveConsent("accepted", {
                  statistics: true,
                  marketing: true,
                })
              }
            >
              Accept
            </button>

            <button
              type="button"
              className="navimail-consent-deny"
              onClick={() =>
                saveConsent("denied", {
                  statistics: false,
                  marketing: false,
                })
              }
            >
              Deny
            </button>

            <button
              type="button"
              className="navimail-consent-save"
              onClick={() =>
                saveConsent("customized", preferences)
              }
            >
              Save Preferences
            </button>
          </div>

          <div className="navimail-consent-links">
            <a
              href="https://navicentsolutions.com/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </div>
        </section>
      </div>
    );
  }


  function App() {
    const [menu, setMenu] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
    const [notice, setNotice] = useState("");
    const [privacyAgreed, setPrivacyAgreed] = useState(false);
    const heroRef = useRef(null);
    const dashboardRef = useRef(null);
    const appRef = useRef(null);

    useEffect(() => {
      const root = appRef.current;
      const hero = heroRef.current;
      const dashboard = dashboardRef.current;
      if (!root || !hero || !dashboard) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (reducedMotion) return;

      const ctx = gsap.context(() => {
        // ORBIT — Hybrid section scroll reveal
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          gsap.fromTo(
            ".orbit-hybrid-copy",
            {
              opacity: 0,
              x: -45,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".orbit-hybrid",
                start: "top 80%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".orbit-hybrid-stage",
            {
              opacity: 0,
              x: 45,
              scale: 0.96,
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 1,
              delay: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".orbit-hybrid",
                start: "top 80%",
                once: true,
              },
            }
          );
        }



        const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        timeline
          .from(".hero-pill", { opacity: 0, y: 20, duration: 0.6 })
          .from(".hero-copy h1", { opacity: 0, y: 42, duration: 0.85 }, "-=0.3")
          .from(".hero-copy > p", { opacity: 0, y: 24, duration: 0.65 }, "-=0.45")
          .from(".hero-buttons, .hero-points", { opacity: 0, y: 20, duration: 0.6, stagger: 0.12 }, "-=0.3")
          .from(".hero-visual", { opacity: 0, y: 35, duration: 0.95 }, "-=0.75");

        gsap.utils.toArray("[data-reveal], .info-card, .feature-card, .step, .benefit, .security-card, .experience-app-card, .hybrid-platform, .hybrid-visual, .demo-panel", root)
          .forEach((element) => {

            gsap.fromTo(
              element,
              {
                opacity: 0,
                y: isMobile ? 12 : 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: isMobile ? 0.45 : 0.75,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 94%",
                  once: true,
                },
              }
            );
          });
      }, root);

      const onHeroMove = (event) => {
        if (!finePointer) return;
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
        hero.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
      };
      const onDashboardMove = (event) => {
        if (!finePointer) return;
        const rect = dashboard.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        gsap.to(dashboard, { rotateY: x * 10, rotateX: -y * 8, duration: 0.55, ease: "power2.out", overwrite: true });
      };
      const onDashboardLeave = () => {
        gsap.to(dashboard, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power2.out", overwrite: true });
      };

      const buttons = finePointer ? Array.from(root.querySelectorAll(".orbit-magnetic")) : [];

      // ORBIT interactive feature cards
      const featureCards = finePointer
        ? Array.from(root.querySelectorAll(".feature-card"))
        : [];

      const cleanupFeatureCards = featureCards.map((card) => {
        const onMove = (event) => {
          const rect = card.getBoundingClientRect();

          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;

          const rotateY = (x / rect.width - 0.5) * 8;
          const rotateX = -(y / rect.height - 0.5) * 8;

          card.style.setProperty("--spot-x", `${x}px`);
          card.style.setProperty("--spot-y", `${y}px`);
          card.style.setProperty("--spot-opacity", "1");

          gsap.to(card, {
            rotateX,
            rotateY,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        const onLeave = () => {
          card.style.setProperty("--spot-opacity", "0");

          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);

        return () => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
          gsap.killTweensOf(card, "rotateX,rotateY");
        };
      });

      const cleanupButtons = buttons.map((button) => {
        const onMove = (event) => {
          const rect = button.getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;
          gsap.to(button, { x: x * 0.12, y: y * 0.15, duration: 0.3, ease: "power2.out", overwrite: true });
        };
        const onLeave = () => gsap.to(button, { x: 0, y: 0, duration: 0.45, ease: "power2.out", overwrite: true });
        button.addEventListener("pointermove", onMove);
        button.addEventListener("pointerleave", onLeave);
        return () => {
          button.removeEventListener("pointermove", onMove);
          button.removeEventListener("pointerleave", onLeave);
          gsap.killTweensOf(button);
        };
      });

      hero.addEventListener("pointermove", onHeroMove);
      dashboard.addEventListener("pointermove", onDashboardMove);
      dashboard.addEventListener("pointerleave", onDashboardLeave);
      return () => {
        hero.removeEventListener("pointermove", onHeroMove);
        dashboard.removeEventListener("pointermove", onDashboardMove);
        dashboard.removeEventListener("pointerleave", onDashboardLeave);
        cleanupButtons.forEach((fn) => fn());
        cleanupFeatureCards.forEach((fn) => fn());
        ctx.revert();
        gsap.killTweensOf(dashboard);
      };
    }, []);



    function submit(event) {
      event.preventDefault();

      if (!privacyAgreed) {
        setNotice("Please agree to the Privacy Policy before continuing.");
        return;
      }

      if (!CONFIG.contactEmail) {
        setNotice(
          "Demo requests are currently unavailable. Please try again later."
        );
        return;
      }

      const subject = encodeURIComponent(
        `NaviMail demo request — ${form.company}`
      );

      const body = encodeURIComponent(
        `Name: ${form.name}
Work email: ${form.email}
Company: ${form.company}

Requirements:
${form.message}`
      );

      // Open Outlook on the web directly
      const outlookUrl =
        `https://outlook.office.com/mail/deeplink/compose` +
        `?to=${encodeURIComponent(CONFIG.contactEmail)}` +
        `&subject=${subject}` +
        `&body=${body}`;

      const outlookTab = window.open(
        outlookUrl,
        "_blank"
      );

      if (outlookTab) {
        outlookTab.opener = null;
        setNotice(
          "Outlook has been opened. Please review your prepared demo request and click Send."
        );
      } else {
        setNotice(
          "Your browser blocked the Outlook tab. Please allow pop-ups and try again."
        );
      }
    }

    return (
      <div ref={appRef} className="orbit-site">
        <header className="site-header">
          <div className="container header-inner">
            <Logo />
            <nav className={`nav ${menu ? "open" : ""}`} aria-label="Main navigation" id="main-navigation">
              {NAV_ITEMS.map(([href, label]) => (
                <a href={href} key={href} onClick={() => setMenu(false)}>{label}</a>
              ))}
            </nav>
            <div className="header-actions">
              <CTA />
              <button type="button" className="mobile-menu" onClick={() => setMenu((prev) => !prev)}
                aria-label={menu ? "Close navigation" : "Open navigation"}
                aria-expanded={menu} aria-controls="main-navigation">
                {menu ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </header>

        <main id="top">
          <section className="hero orbit-hero" ref={heroRef} aria-labelledby="orbit-title">
            <div className="hero-glow one" aria-hidden="true" />
            <div className="hero-glow two" aria-hidden="true" />
            <div className="container hero-grid">
              <div className="hero-copy">
                <span className="hero-pill"><Sparkles size={14} /> BUSINESS EMAIL BY NAVICENT</span>
                <h1 id="orbit-title">
                  <span className="hero-first-line">One Complete Email Solution.</span>
                  <span className="hero-second-line">Built for Every Business.</span>
                </h1>
                <p>Experience secure, reliable and cost-effective business email powered by Zimbra. With hosting in India, professional domain email, calendars, contacts and productivity tools, NaviMail keeps your business connected.</p>
                <div className="hero-buttons"><CTA /><CTA secondary>Explore Features</CTA></div>
                <div className="hero-points">
                  <span><CheckCircle2 size={16} /> Professional email</span>
                  <span><CheckCircle2 size={16} /> Hosted in Indian Data centers</span>
                  <span><CheckCircle2 size={16} /> Zimbra-powered</span>
                </div>
              </div>
              <div className="hero-visual orbit-dashboard" ref={dashboardRef}>
                <div className="float-chip chip-one">
                  <span className="chip-icon"><Mail size={16} /></span>
                  <span><strong>One place for email</strong><small>Stay on top of conversations</small></span>
                </div>
                <MailPreview />
                <div className="float-chip chip-two">
                  <span className="chip-icon green"><Check size={16} /></span>
                  <span><strong>Ready for your team</strong><small>Explore NaviMail together</small></span>
                </div>
              </div>
            </div>
          </section>

          <section className="trust-strip" aria-label="NaviMail highlights">
            <div className="container trust-inner">
              <span>BUILT AROUND THE WAY BUSINESSES COMMUNICATE</span>
              <div>
                <span><Building2 size={19} /> Professional teams</span>
                <span><MessageSquareText size={19} /> Everyday communication</span>
                <span><Globe2 size={19} /> Business-first approach</span>
              </div>
            </div>
          </section>

          <section className="section why-section" id="why">
            <div className="container">
              <SectionTitle eyebrow="WHY NAVIMAIL" title="Business email built around your needs." desc="A reliable, cost-effective email platform designed for businesses of all sizes." />
              <div className="three-grid">
                {[
                  { icon: Mail, title: "Professional Business Email", desc: "Build your business identity with professional email addresses using your own company domain.", color: "blue" },
                  { icon: Globe2, title: "Hosted in Indian Data centers", desc: "Keep your business email hosted in Indian data centres with improved control over data residency.", color: "purple" },
                  { icon: Zap, title: "Cost-Effective & Ad-Free", desc: "Experience professional email with flexible mailbox options and no advertising distractions.", color: "pink" },
                ].map(({ icon: Icon, title, desc, color }) => (
                  <article className="info-card" key={title}>
                    <span className={`feature-icon ${color}`}><Icon size={24} /></span>
                    <h3>{title}</h3><p>{desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section features-section" id="features">
            <div className="container">
              <SectionTitle eyebrow="POWERFUL FEATURES" title="Everything your business email needs." desc="From secure messaging to everyday collaboration, NaviMail brings essential productivity tools together." />
              <div className="feature-grid">
                {FEATURES.map(({ icon: Icon, title, desc }, index) => (
                  <article className="feature-card" key={title}>
                    <span className={`feature-icon ${["purple", "blue", "pink"][index % 3]}`}><Icon size={22} /></span>
                    <h3>{title}</h3><p>{desc}</p>
                    <span className="feature-arrow"><ArrowUpRight size={18} /></span>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section how-section" id="how">
            <div className="container">
              <SectionTitle eyebrow="GETTING STARTED" title="Getting started with NaviMail is simple." desc="From your business domain to your daily inbox, NaviMail makes professional email accessible." />
              <div className="steps">
                {[
                  { icon: MessageSquareText, title: "Discuss Your Requirements", desc: "Connect with the Navicent team to discuss your business domain, number of users and email requirements." },
                  { icon: Globe2, title: "Set Up Your Business Email", desc: "Configure NaviMail with your existing business domain and create professional email accounts for your team." },
                  { icon: Mail, title: "Stay Connected Anywhere", desc: "Access your email, calendars, contacts and tasks through Webmail or compatible email applications." },
                ].map(({ icon: Icon, title, desc }, index) => (
                  <div className="step" key={title}>
                    <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="step-icon"><Icon size={27} /></span>
                    <h3>{title}</h3><p>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section product-experience" id="experience">
            <div className="container experience-layout">
              <div className="experience-content" data-reveal>
                <span className="eyebrow">PRODUCT EXPERIENCE</span>
                <h2>More than just email.<br /><span>Everything in one place.</span></h2>
                <p>NaviMail brings professional business email, calendars, contacts and tasks into one convenient workspace powered by Zimbra.</p>
                <div className="experience-benefits">
                  <span><CheckCircle2 size={17} /> Professional business email</span>
                  <span><CheckCircle2 size={17} /> Integrated productivity tools</span>
                  <span><CheckCircle2 size={17} /> Webmail access from anywhere</span>
                </div>
                <a href="#demo" className="btn btn-primary orbit-magnetic">Request Demo <ArrowRight size={17} /></a>
              </div>
              <div className="experience-preview" data-reveal>
                <div className="experience-topbar">
                  <div className="experience-topbar-brand"><span className="experience-app-icon"><Mail size={17} /></span><strong>NaviMail Workspace</strong></div>
                  <span className="experience-preview-label">Concept Preview</span>
                </div>
                <div className="experience-app-grid">
                  <div className="experience-app-card">
                    <div className="experience-app-heading"><span className="experience-tile-icon blue"><Mail size={20} /></span><div><h3>Email</h3><p>Professional communication</p></div></div>
                    <div className="experience-email-list">
                      {["A", "B", "C"].map((letter, index) => (
                        <div key={letter}><span className={`experience-avatar ${index === 1 ? "purple" : index === 2 ? "pink" : ""}`}>{letter}</span><span className="experience-lines"><i /><i /></span></div>
                      ))}
                    </div>
                  </div>
                  <div className="experience-app-card">
                    <div className="experience-app-heading"><span className="experience-tile-icon purple"><CalendarDays size={20} /></span><div><h3>Calendar</h3><p>Manage your schedule</p></div></div>
                    <div className="experience-calendar">{["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <span key={index} className={index === 2 ? "active" : ""}>{day}</span>)}</div>
                    <div className="experience-event"><span className="experience-event-dot" /> Meeting schedule</div>
                  </div>
                  <div className="experience-app-card">
                    <div className="experience-app-heading"><span className="experience-tile-icon green"><Users size={20} /></span><div><h3>Contacts</h3><p>Stay connected</p></div></div>
                    <div className="experience-contact-avatars"><span>RK</span><span>AM</span><span>PS</span><span>+3</span></div>
                    <p className="experience-helper">Keep your business contacts organized.</p>
                  </div>
                  <div className="experience-app-card">
                    <div className="experience-app-heading"><span className="experience-tile-icon orange"><CheckCircle2 size={20} /></span><div><h3>Tasks</h3><p>Organize daily work</p></div></div>
                    <div className="experience-task-list">
                      <div><CheckCircle2 size={15} /> Review messages</div>
                      <div><CheckCircle2 size={15} /> Update contacts</div>
                      <div><span className="experience-task-circle" /> Plan next meeting</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section" id="benefits">
            <div className="container">
              <SectionTitle eyebrow="WHY NAVIMAIL" title="Made for your business conversations." desc="Keep the focus on clarity, professionalism and the people behind every message." />
              <div className="benefits-grid">
                {[
                  { icon: Mail, title: "Professional presence", desc: "A business-focused email experience for your organization." },
                  { icon: Users, title: "People first", desc: "A familiar way to stay connected with colleagues and clients." },
                  { icon: Zap, title: "Less friction", desc: "A cleaner approach to day-to-day communication." },
                  { icon: Headphones, title: "Talk to a real team", desc: "Explore product suitability directly with Navicent." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div className="benefit" key={title}><span><Icon size={22} /></span><h3>{title}</h3><p>{desc}</p></div>
                ))}
              </div>
            </div>
          </section>

          {/* ORBIT SECURITY & RELIABILITY */}
          <section className="section security-section orbit-security" id="security">
            <div className="container">
              <div className="orbit-security-heading">
                <span className="eyebrow">SECURITY & RELIABILITY</span>
                <h2>
                  Your business communication.
                  <br />
                  <span>Protected at every layer.</span>
                </h2>
                <p>
                  NaviMail combines Zimbra-powered collaboration with
                  enterprise-grade email protection and India-hosted
                  infrastructure.
                </p>
              </div>

              <div className="orbit-security-layout security-three-column">

                {/* LEFT: FOUR SECURITY FEATURES */}
                <div className="security-feature-column security-left">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Advanced Threat Protection",
                      desc: "Enterprise-grade email protection powered by Cisco IronPort."
                    },
                    {
                      icon: Mail,
                      title: "Antispam & Email Authentication",
                      desc: "Antispam protection alongside DKIM and DMARC support."
                    },
                    {
                      icon: CheckCircle2,
                      title: "Secure Communication",
                      desc: "SSL and TLS support for email access and data in transit."
                    },
                    {
                      icon: ServerCog,
                      title: "Hosted in Indian Data Centers",
                      desc: "Business email hosted in redundant data centres within India."
                    }
                  ].map(({ icon: Icon, title, desc }) => (
                    <article className="orbit-security-feature" key={title}>
                      <div className="orbit-security-feature-icon">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                      </div>
                    </article>
                  ))}
                </div>

                {/* CENTER: ORIGINAL PROTECTED EMAIL DIAGRAM */}
                <div className="orbit-security-stage">
                  <div className="orbit-security-ring ring-one" />
                  <div className="orbit-security-ring ring-two" />

                  <div className="orbit-security-core">
                    <div className="orbit-security-shield">
                      <ShieldCheck size={48} strokeWidth={1.5} />
                    </div>
                    <strong>Protected Email</strong>
                    <small>Multi-layer email security</small>
                  </div>

                  <div className="orbit-security-satellite satellite-one">
                    <ShieldCheck size={18} />
                    <span>Threat Protection</span>
                  </div>

                  <div className="orbit-security-satellite satellite-two">
                    <Mail size={18} />
                    <span>Antispam</span>
                  </div>

                  <div className="orbit-security-satellite satellite-three">
                    <Globe2 size={18} />
                    <span>India Hosting</span>
                  </div>

                  <div className="orbit-security-satellite satellite-four">
                    <CheckCircle2 size={18} />
                    <span>DKIM & DMARC</span>
                  </div>

                  <div className="orbit-security-satellite satellite-five">
                    <ShieldCheck size={18} />
                    <span>Cisco IronPort ATP</span>
                  </div>

                  <div className="orbit-security-satellite satellite-six">
                    <CheckCircle2 size={18} />
                    <span>SSL / TLS</span>
                  </div>
                </div>

                {/* RIGHT: FOUR MORE SECURITY FEATURES */}
                <div className="security-feature-column security-right">
                  {[
                    {
                      icon: CheckCircle2,
                      title: "Reliable Email Service",
                      desc: "99.9% uptime and 100% email delivery SLA, as stated in the product flyer."
                    },
                    {
                      icon: ShieldCheck,
                      title: "100% Ad-Free Email",
                      desc: "Professional business communication without advertising distractions."
                    },
                    {
                      icon: Globe2,
                      title: "Flexible Email Access",
                      desc: "Supports POP, IMAP, SMTP and Webmail for convenient email access."
                    },
                    {
                      icon: Users,
                      title: "ActiveSync Mobile Support",
                      desc: "Synchronize mailbox items with supported mobile devices."
                    }
                  ].map(({ icon: Icon, title, desc }) => (
                    <article className="orbit-security-feature" key={title}>
                      <div className="orbit-security-feature-icon">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3>{title}</h3>
                        <p>{desc}</p>
                      </div>
                    </article>
                  ))}
                </div>

              </div>
            </div>
          </section>


          {/* WHY CHOOSE NAVIMAIL — EMAIL EXPERTISE */}
          <section className="section nm-expertise">
            <div className="container nm-expertise-layout">

              <div className="nm-expertise-content">
                <span className="nm-expertise-eyebrow">
                  WHY CHOOSE NAVIMAIL
                </span>

                <h2>
                  Built by Those Who
                  <br />
                  <span>Understand Email.</span>
                </h2>

                <p className="nm-expertise-intro">
                  NaviMail brings together professional business email,
                  reliable communication, and everyday collaboration
                  in one solution designed for growing organizations.
                </p>

                <div className="nm-expertise-benefits">
                  <div className="nm-expertise-benefit">
                    <span className="nm-expertise-icon">
                      <ShieldCheck size={23} />
                    </span>
                    <div>
                      <h3>Enterprise-Grade Security</h3>
                      <p>
                        Protect business communication with spam filtering,
                        antivirus protection, and email authentication.
                      </p>
                    </div>
                  </div>

                  <div className="nm-expertise-benefit">
                    <span className="nm-expertise-icon">
                      <ServerCog size={23} />
                    </span>
                    <div>
                      <h3>India-Hosted Email</h3>
                      <p>
                        Keep your business email hosted in Indian data
                        centres with a focus on reliability.
                      </p>
                    </div>
                  </div>

                  <div className="nm-expertise-benefit wide">
                    <span className="nm-expertise-icon">
                      <Users size={23} />
                    </span>
                    <div>
                      <h3>Built for Business Productivity</h3>
                      <p>
                        Bring email, calendars, contacts, and tasks together
                        to help teams stay connected and organized.
                      </p>
                    </div>
                  </div>
                </div>
              </div>



              {/* NAVIMAIL — ANIMATED EMAIL JOURNEY */}
              <div className="nm-journey">

                <div className="nm-journey-scene">
                  <div className="nm-journey-halo nm-halo-one" />
                  <div className="nm-journey-halo nm-halo-two" />

                  {/* Animated curved delivery path */}
                  <svg
                    className="nm-journey-path"
                    viewBox="0 0 600 320"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 65 205 C 145 45, 455 45, 535 205"
                      className="nm-journey-curve"
                    />
                    <path
                      d="M 65 205 C 145 45, 455 45, 535 205"
                      className="nm-journey-moving-line"
                    />
                  </svg>

                  {/* Moving envelope */}
                  <div className="nm-journey-flying-mail">
                    <div className="nm-journey-speed-lines">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="nm-journey-envelope">
                      <Mail size={39} strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Four journey stages */}
                  <div className="nm-journey-stages">
                    <div className="nm-journey-card">
                      <div className="nm-journey-icon">
                        <Send size={30} />
                      </div>
                      <strong>Send<br />Email</strong>
                    </div>

                    <div className="nm-journey-card">
                      <div className="nm-journey-icon">
                        <ShieldCheck size={30} />
                      </div>
                      <strong>Security<br />Check</strong>
                    </div>

                    <div className="nm-journey-card">
                      <div className="nm-journey-icon">
                        <Cloud size={30} />
                      </div>
                      <strong>NaviMail<br />Hosting</strong>
                    </div>

                    <div className="nm-journey-card">
                      <div className="nm-journey-icon">
                        <MailCheck size={30} />
                      </div>
                      <strong>Delivered</strong>
                    </div>
                  </div>

                  <div className="nm-journey-status">
                    <span className="nm-journey-status-dot" />
                    A Secure and Reliable Email Journey
                  </div>
                </div>
              </div>


            </div>
          </section>


          {/* ORBIT HYBRID EMAIL */}
          <section className="section hybrid-section orbit-hybrid" id="hybrid">
            <div className="container orbit-hybrid-layout">
              <div className="orbit-hybrid-copy">
                <span className="eyebrow">HYBRID EMAIL</span>

                <h2>
                  One domain.
                  <br />
                  <span>More flexibility.</span>
                </h2>

                <p>
                  Combine NaviMail with Microsoft 365 or Google
                  Workspace on the same business domain, giving
                  your organization more flexibility in how
                  it manages business email.
                </p>

                <div className="orbit-hybrid-benefits">
                  <span>
                    <CheckCircle2 size={17} />
                    Same-domain coexistence
                  </span>
                  <span>
                    <CheckCircle2 size={17} />
                    Flexible email deployment
                  </span>
                  <span>
                    <CheckCircle2 size={17} />
                    Options for different business needs
                  </span>
                </div>

                <a href="#demo" className="btn btn-primary">
                  Explore Hybrid Email
                </a>
              </div>

              <div className="hybrid-visual connected-ecosystem">
                <div className="ecosystem-frame">
                  <div className="ecosystem-badge ecosystem-top">
                    Connected Cloud Ecosystem
                  </div>

                  <div className="ecosystem-badge ecosystem-left">
                    Same Domain
                  </div>

                  <div className="ecosystem-badge ecosystem-right-top">
                    Flexible Setup
                  </div>

                  <div className="ecosystem-badge ecosystem-right-bottom">
                    Enterprise Ready
                  </div>

                  <div className="ecosystem-domain-wrap">
                    <div className="ecosystem-orbit orbit-one"></div>
                    <div className="ecosystem-orbit orbit-two"></div>

                    <div className="ecosystem-domain">
                      <span className="domain-icon">🌐</span>
                      <span>yourcompany.com</span>
                    </div>
                  </div>

                  {/* Two-branch connection */}
                  <div className="ecosystem-lines hybrid-two-branches">
                    <span className="hybrid-branch-stem" />
                    <span className="hybrid-branch-horizontal" />
                    <span className="hybrid-branch-left" />
                    <span className="hybrid-branch-right" />
                    <span className="hybrid-branch-node node-left" />
                    <span className="hybrid-branch-node node-right" />
                  </div>

                  {/* Two platform cards */}
                  <div className="ecosystem-cards hybrid-two-cards">
                    <div className="eco-card eco-card-navimail">
                      <div className="eco-icon">✉</div>
                      <h4>NaviMail</h4>
                      <p>Business Email</p>
                    </div>

                    <div className="eco-card eco-card-combined">
                      <div className="eco-icon">☁</div>
                      <h4>Microsoft 365/
                        <br />
                        Google Workspace/
                        <br />
                        Others
                      </h4>
                      <p>Coexistence Options</p>
                    </div>
                  </div>

                  <div className="ecosystem-wave"></div>
                </div>
              </div>
            </div>
          </section>


          <section className="section demo-section" id="demo">
            <div className="container">
              <div className="demo-panel">
                <div className="demo-copy">
                  <span className="eyebrow">GET STARTED WITH NAVIMAIL</span>
                  <h2>Let's bring better email<br />to your business.</h2>
                  <p>Looking for professional business email? Connect with the Navicent team to explore NaviMail and discuss your requirements.</p>

                  {/* DIRECT SALES CONTACT */}
                  <div className="orbit-demo-contact">
                    <span>Prefer to speak with our team?</span>

                    <a href="tel:+919076094917">
                      <Headphones size={18} />
                      <strong>+91 9076094917</strong>
                      <ArrowUpRight size={16} />
                    </a>
                  </div>

                </div>
                <form className="demo-form" onSubmit={submit}>
                  <div className="demo-form-header"><h3>Request a Demo</h3><p>Share your details and tell us about your email requirements.</p></div>
                  <div className="demo-form-fields">
                    <label>Full Name *<input type="text" required autoComplete="name" placeholder="Enter your full name" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} /></label>
                    <label>Work Email *<input type="email" required autoComplete="email" placeholder="you@company.com" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} /></label>
                    <label>Company Name *<input type="text" required autoComplete="organization" placeholder="Your organization" value={form.company} onChange={(event) => setForm((prev) => ({ ...prev, company: event.target.value }))} /></label>
                    <label>Your Requirements<textarea rows="3" placeholder="Tell us about your email requirements..." value={form.message} onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))} /></label>
                  </div>

                  <div className="navimail-privacy-agreement">
                    <input
                      type="checkbox"
                      id="privacy-agreement"
                      checked={privacyAgreed}
                      onChange={(e) => setPrivacyAgreed(e.target.checked)}
                      required
                    />

                    <label htmlFor="privacy-agreement">
                      By submitting this form, you agree to the{" "}
                      <a
                        href="https://navicentsolutions.com/privacy-policy/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </a>{" "}
                      of Navicent Solutions.
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary demo-submit orbit-magnetic" disabled={!privacyAgreed} aria-disabled={!privacyAgreed}>Prepare Demo Email <ArrowRight size={17} /></button>
                  {notice && <p className="form-notice" role="status">{notice}</p>}
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="container">
            <div className="footer-main">
              <div className="footer-brand">
                <Logo />
                <p>Professional, reliable and secure business email powered by Zimbra. A business email solution from Navicent Solutions.</p>
                <span className="footer-tagline">One Email Solution. Every Business.</span>
              </div>
              <div className="footer-links"><strong>Product</strong><a href="#why">Why NaviMail</a><a href="#features">Features</a><a href="#experience">Product Experience</a><a href="#security">Security</a><a href="#hybrid">Hybrid Email</a></div>
              <div className="footer-links"><strong>Explore</strong><a href="#how">How It Works</a><a href="#demo">Request Demo</a><a href="https://webmail.navimail.in/" target="_blank" rel="noopener noreferrer">Webmail Login</a><a href="https://admin.navimail.in/" target="_blank" rel="noopener noreferrer">Admin Login</a><a href="https://status.navimail.in/" target="_blank" rel="noopener noreferrer">System status</a></div>
              <div className="footer-links"><strong>Company</strong><a href="https://navicentsolutions.com/" target="_blank" rel="noopener noreferrer">Navicent Solutions</a><a href="https://navicentsolutions.com/navimail/" target="_blank" rel="noopener noreferrer">About NaviMail</a><a href="#demo">Contact Sales</a></div>
            </div>
            <div className="footer-bottom"><span>© {new Date().getFullYear()} Navicent Solutions. All rights reserved.</span><span>NaviMail by Navicent Solutions</span><span className="navimail-footer-legal"><a href="https://navicentsolutions.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy Policy</a><button type="button" className="navimail-cookie-settings-link" onClick={() => window.dispatchEvent(new Event("navimail:open-cookie-settings"))}>Cookie Settings</button></span></div>
          </div>
        </footer>
      </div>
    );
  }

  createRoot(document.getElementById("root")).render(
    <>
      <App />
      <CookieConsent />
    </>
  );
