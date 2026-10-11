import { type ReactNode, useMemo, useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ChevronRight, CircleDot, Database, ExternalLink, Github, Linkedin, Mail, Menu, MonitorPlay, Network, ShieldCheck, X } from 'lucide-react';
import { architecture, clinicalCaseStudyContent, githubProfileUrl, linkedInUrl, milestones, type Project, projects, skills, voiceCaseStudyContent } from './content';
import NotFound from '@/pages/not-found';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const navigation = [
  ['Home', '#home'],
  ['Work', '#work'],
  ['Journey', '#journey'],
  ['Projects', '#projects'],
  ['Skills & Approach', '#skills-approach'],
  ['About', '#about'],
  ['Contact', '#contact'],
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap flex min-h-[68px] items-center justify-between gap-6">
        <a href="#home" className="flex items-center gap-3" aria-label="Devansh Raina home" data-testid="link-home">
          <span className="grid h-8 w-8 place-items-center border border-primary text-xs font-semibold text-primary">DR</span>
          <span className="text-sm font-semibold tracking-tight">Devansh Raina<span className="ml-2 hidden font-normal text-muted-foreground sm:inline">/ Software Engineer</span></span>
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {navigation.map(([label, href]) => <a className="nav-link text-[12px]" href={href} key={href} data-testid={`link-nav-${label.toLowerCase()}`}>{label}</a>)}
        </nav>
        <div className="hidden md:block">
          <a href={githubProfileUrl} target="_blank" rel="noreferrer noopener" className="button !px-3 !py-2 text-xs" aria-label="GitHub profile (opens in a new tab)" data-testid="link-header-github"><Github size={14} /> GitHub</a>
        </div>
        <button aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="grid h-10 w-10 place-items-center border border-border md:hidden" data-testid="button-mobile-menu">
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {menuOpen && <nav aria-label="Mobile navigation" className="wrap grid gap-1 border-t border-border pb-4 pt-3 md:hidden">
        {navigation.map(([label, href]) => <a key={href} onClick={() => setMenuOpen(false)} className="nav-link py-2 text-sm" href={href}>{label}</a>)}
        <a onClick={() => setMenuOpen(false)} className="nav-link py-2 text-sm" href={githubProfileUrl} target="_blank" rel="noreferrer noopener" data-testid="link-mobile-github">GitHub</a>
        <a onClick={() => setMenuOpen(false)} className="nav-link py-2 text-sm" href={linkedInUrl} target="_blank" rel="noreferrer noopener" data-testid="link-mobile-linkedin">LinkedIn</a>
      </nav>}
    </header>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="section-label">{children}</div>;
}

// Deterministic pseudo-random numbers so the illustration is identical on every load.
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

// Panel 1: two groups of points separated by a learned decision boundary.
const boundaryY = (x: number) => 172 - 58 * ((x - 40) / 350) - 26 * Math.sin(((x - 40) / 350) * Math.PI);
const scatterPoints = (() => {
  const random = seeded(7);
  const points: { x: number; y: number; above: boolean }[] = [];
  while (points.length < 46) {
    const x = 48 + random() * 336;
    const y = 92 + random() * 88;
    const gap = y - boundaryY(x);
    if (Math.abs(gap) < 9) continue;
    points.push({ x, y, above: gap < 0 });
  }
  return points;
})();
const boundaryPath = Array.from({ length: 36 }, (_, i) => {
  const x = 40 + (i * 350) / 35;
  return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${boundaryY(x).toFixed(1)}`;
}).join(' ');

// Panel 2: a small feed-forward network with one highlighted path.
const networkLayers = [4, 5, 5, 3].map((count, layer) => Array.from({ length: count }, (_, i) => ({
  x: 70 + layer * 93,
  y: 262 + (i - (count - 1) / 2) * 21,
})));
const highlighted = [1, 3, 2, 1];

// Panel 3: a speech-like signal with two bursts.
const wavePath = Array.from({ length: 118 }, (_, i) => {
  const x = 40 + i * 3;
  const envelope = 2 + 13 * Math.exp(-(((x - 130) / 42) ** 2)) + 16 * Math.exp(-(((x - 290) / 50) ** 2));
  const y = 370 + envelope * Math.sin(x * 0.42) * Math.cos(x * 0.09);
  return `${i === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)}`;
}).join(' ');

function HeroVisual() {
  return (
    <div className="hero-art relative min-h-[320px] overflow-hidden border border-border sm:min-h-[390px]" role="img" aria-label="Abstract illustration of applied machine learning: data points separated by a learned decision boundary, a small neural network, and a speech-like signal waveform.">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 420" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs>
          <pattern id="hero-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M 28 0 L 0 0 0 28" fill="none" stroke="hsl(var(--foreground))" strokeOpacity=".08" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="420" height="420" fill="hsl(var(--secondary))" />
        <rect width="420" height="420" fill="url(#hero-grid)" />
        <g fontFamily="var(--app-font-mono)" fontSize="9" letterSpacing="1.1">
          <text x="24" y="34" fill="hsl(var(--primary))">APPLIED MACHINE LEARNING</text>
        </g>
        <path d="M24 50 H396" stroke="hsl(var(--border))" strokeWidth="1" />

        <g fontFamily="var(--app-font-mono)" fontSize="8" letterSpacing=".6">
          <text x="24" y="74" fill="hsl(var(--primary))">01 / DATA</text>
          <text x="396" y="74" textAnchor="end" fill="hsl(var(--muted-foreground))">LEARNED BOUNDARY</text>
        </g>
        <path d="M40 184 H392 M40 184 V86" stroke="hsl(var(--border))" strokeWidth="1" />
        {scatterPoints.map((point, i) => point.above
          ? <circle key={i} cx={point.x} cy={point.y} r="2.6" fill="hsl(var(--primary))" fillOpacity=".9" />
          : <circle key={i} cx={point.x} cy={point.y} r="2.6" fill="none" stroke="hsl(var(--foreground))" strokeOpacity=".45" />)}
        <path d={boundaryPath} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.4" strokeDasharray="5 3" />

        <path d="M24 200 H396" stroke="hsl(var(--border))" strokeWidth="1" />
        <g fontFamily="var(--app-font-mono)" fontSize="8" letterSpacing=".6">
          <text x="24" y="222" fill="hsl(var(--primary))">02 / MODEL</text>
          <text x="396" y="222" textAnchor="end" fill="hsl(var(--muted-foreground))">INPUT → OUTPUT</text>
        </g>
        <g strokeWidth=".8">
          {networkLayers.slice(1).map((layer, l) => layer.map((to, j) => networkLayers[l].map((from, i) => {
            const on = highlighted[l] === i && highlighted[l + 1] === j;
            return <line key={`${l}-${i}-${j}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={on ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'} strokeOpacity={on ? 0.95 : 0.13} strokeWidth={on ? 1.4 : 0.8} />;
          })))}
        </g>
        {networkLayers.map((layer, l) => layer.map((node, i) => (
          <circle key={`${l}-${i}`} cx={node.x} cy={node.y} r="5" fill="hsl(var(--background))" stroke={highlighted[l] === i ? 'hsl(var(--primary))' : 'hsl(var(--border))'} strokeWidth="1.2" />
        )))}

        <path d="M24 324 H396" stroke="hsl(var(--border))" strokeWidth="1" />
        <g fontFamily="var(--app-font-mono)" fontSize="8" letterSpacing=".6">
          <text x="24" y="345" fill="hsl(var(--primary))">03 / SIGNAL</text>
          <text x="396" y="345" textAnchor="end" fill="hsl(var(--muted-foreground))">AUDIO → TEXT → ACTION</text>
        </g>
        <path d="M40 370 H392" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2 4" />
        <path d={wavePath} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinejoin="round" />

        <path d="M24 401 H396" stroke="hsl(var(--border))" strokeWidth="1" />
        <g fontFamily="var(--app-font-mono)" fontSize="8" letterSpacing=".6" fill="hsl(var(--muted-foreground))">
          <text x="24" y="413">DATA → DECISIONS</text>
          <text x="396" y="413" textAnchor="end">SPEECH → SYSTEMS</text>
        </g>
      </svg>
    </div>
  );
}
function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="hero-grid absolute inset-x-0 top-0 h-[640px]" aria-hidden="true" />
      <div className="wrap relative">
        <div className="mb-8 flex items-center gap-3 reveal">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">Software engineer</span>
        </div>
        <h1 className="display hero-title reveal">From data to <em>decisions.</em><br />From speech to systems.</h1>
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_390px] md:items-end">
          <div className="max-w-[580px] reveal reveal-delay">
            <p className="text-lg leading-relaxed text-foreground/75 sm:text-xl">I build practical AI systems across clinical machine learning and real-time conversational AI—then work through what it takes to evaluate, deliver, and keep them reliable.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="button button-primary" href="#work" data-testid="link-explore-work">Explore my work <ArrowDownRight size={15} /></a>
              <a className="button" href="#journey" data-testid="link-follow-journey">Follow my journey <ArrowDown size={15} /></a>
            </div>
          </div>
          <HeroVisual />
        </div>
        <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5">
          <a className="mono text-[10px] uppercase text-muted-foreground hover:text-primary" href="#clinical-ml" data-testid="link-hero-clinical">01 · Clinical ML case study <ArrowRight className="ml-1 inline" size={11} /></a>
          <a className="mono text-[10px] uppercase text-muted-foreground hover:text-primary" href="#voice-ai" data-testid="link-hero-voice">02 · Voice AI case study <ArrowRight className="ml-1 inline" size={11} /></a>
          <a className="mono text-[10px] uppercase text-muted-foreground hover:text-primary" href="#projects" data-testid="link-hero-projects">03 · Open-source projects <ArrowRight className="ml-1 inline" size={11} /></a>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const [selected, setSelected] = useState(1);
  const item = milestones[selected];
  return (
    <section id="journey" className="section">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <Eyebrow>02 / Career journey</Eyebrow>
            <h2 className="display mt-5 max-w-[440px] text-4xl leading-[1.06] sm:text-5xl">My <em className="text-primary">engineering journey.</em></h2>
            <p className="mt-5 max-w-[440px] leading-relaxed text-muted-foreground">I completed a B.Tech in Computer Engineering with a specialization in Data Science. I now work on machine learning and real-time conversational voice systems.</p>
            <div className="mt-9 space-y-3" role="group" aria-label="Career milestones">
              {milestones.map((milestone, index) => <button key={milestone.index} aria-pressed={selected === index} onClick={() => setSelected(index)} className="timeline-node flex w-full items-center gap-4 py-3 text-left" data-testid={`button-milestone-${index}`}>
                <span className="node-dot grid h-5 w-5 shrink-0 place-items-center rounded-full border border-border bg-background"><span className="h-1.5 w-1.5 rounded-full bg-current" /></span>
                <span><span className="mono block text-[10px] text-muted-foreground">{milestone.period}</span><span className="text-sm font-semibold">{milestone.title}</span></span>
              </button>)}
            </div>
          </div>
          <article className="relative min-h-[310px] border-l border-border pl-6 sm:pl-10" aria-live="polite">
            <div className="absolute -left-px top-0 h-14 w-px bg-primary" />
            <span className="mono text-[10px] uppercase tracking-[.14em] text-primary">Milestone {item.index}</span>
            <h3 className="display mt-7 text-3xl">{item.organization}</h3>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground"><span>{item.title}</span><span aria-hidden="true">/</span><span>{item.period}</span></div>
            <p className="mt-7 max-w-[560px] leading-[1.8] text-foreground/75">{item.detail}</p>
            <div className="mt-9 border-t border-border pt-5">
              <div className="mono mb-2 text-[9px] uppercase text-muted-foreground">Milestone details</div>
              <div className="flex flex-wrap items-center gap-3 text-xs"><span>{item.evidence}</span><span className="text-muted-foreground">· {item.location}</span></div>
              {item.related.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{item.related.map((related) => <a className="button !px-3 !py-2 text-[10px]" href={related.href} key={related.href}>{related.label} <ArrowRight size={12} /></a>)}</div>}
            </div>
          </article>
        </div>
        <div className="mt-14 grid grid-cols-1 border-y border-border sm:grid-cols-3">
          <div className="py-5 sm:border-r sm:border-border sm:pr-6"><div className="mono text-[9px] uppercase text-muted-foreground">Education</div><div className="mt-2 text-sm">B.Tech · Computer Engineering</div></div>
          <div className="border-t border-border py-5 sm:border-t-0 sm:px-6 sm:border-r"><div className="mono text-[9px] uppercase text-muted-foreground">Specialization</div><div className="mt-2 text-sm">Data Science</div></div>
          <div className="border-t border-border py-5 sm:border-t-0 sm:pl-6"><div className="mono text-[9px] uppercase text-muted-foreground">Current focus</div><div className="mt-2 text-sm">Production AI systems</div></div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="section">
      <div className="wrap">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div><Eyebrow>01 / Professional work</Eyebrow><h2 className="display mt-5 max-w-[680px] text-4xl leading-[1.06] sm:text-6xl">Professional AI systems I've <em className="text-primary">worked on.</em></h2></div>
          <p className="max-w-[340px] pb-1 text-sm leading-relaxed text-muted-foreground">One project focuses on clinical prediction; the other focuses on reliable, real-time conversations. Both require careful evaluation and thoughtful engineering.</p>
        </div>
        <div className="mt-12 grid gap-5">
          <ClinicalCase />
          <VoiceCase />
        </div>
        <div className="mt-6 flex gap-3 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground"><ShieldCheck className="mt-0.5 shrink-0 text-primary" size={15} /> Professional work is described at a high level. No patient information, confidential application details, or internal links are shown.</div>
      </div>
    </section>
  );
}

function ClinicalCase() {
  return (
    <article id="clinical-ml" className="case-panel grid gap-7 p-5 sm:p-8 lg:grid-cols-[.86fr_1.14fr] lg:p-10">
      <div className="flex flex-col">
        <div className="flex items-center gap-3"><span className="case-number mono text-xs text-muted-foreground">01</span><span className="mono text-[9px] uppercase tracking-[.14em] text-primary">Clinical machine learning</span></div>
        <h3 className="display mt-7 text-3xl leading-tight sm:text-4xl">Clinical acuity<br className="hidden sm:block" /> prediction</h3>
        <div className="mono mt-5 text-[9px] uppercase tracking-[.12em] text-muted-foreground">Problem & context</div>
        <p className="mt-2 max-w-md text-sm leading-[1.8] text-muted-foreground">{clinicalCaseStudyContent.problem}</p>
        <div className="mt-7 grid grid-cols-2 gap-3">
          <div className="technical-card p-4"><span className="mono block text-[9px] uppercase text-muted-foreground">Signals</span><strong className="mt-2 block text-2xl font-medium">2</strong><span className="text-[10px] text-muted-foreground">clinical rules + learned outcomes</span></div>
          <div className="technical-card p-4"><span className="mono block text-[9px] uppercase text-muted-foreground">Output</span><strong className="mt-2 block text-2xl font-medium">Tiers 1–5</strong><span className="text-[10px] text-muted-foreground">critical to very low risk</span></div>
        </div>
      </div>
      <div>
        <div className="technical-card mb-5 p-5 sm:p-6">
          <div className="mono mb-5 text-[9px] uppercase tracking-[.12em] text-muted-foreground">How the system fits together</div>
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-center">
            <div className="border border-border px-2 py-4"><Database className="mx-auto mb-2 text-primary" size={17} /><span className="block text-[10px] sm:text-xs">EHR data</span></div><ArrowRight className="architecture-arrow" size={14} />
            <div className="border border-border px-2 py-4"><CircleDot className="mx-auto mb-2 text-primary" size={17} /><span className="block text-[10px] sm:text-xs">Model & review</span></div><ArrowRight className="architecture-arrow" size={14} />
            <div className="border border-border px-2 py-4"><ShieldCheck className="mx-auto mb-2 text-primary" size={17} /><span className="block text-[10px] sm:text-xs">Secure app</span></div>
          </div>
          <div className="mt-3 flex justify-center gap-2"><span className="rounded-sm border border-border px-2 py-1 text-[9px] text-muted-foreground">Docker</span><span className="rounded-sm border border-border px-2 py-1 text-[9px] text-muted-foreground">Azure</span><span className="rounded-sm border border-border px-2 py-1 text-[9px] text-muted-foreground">Entra ID + RBAC</span></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border-t border-border pt-4"><span className="mono text-[9px] uppercase text-primary">Model design</span><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{clinicalCaseStudyContent.modelDesign}</p></div>
          <div className="border-t border-border pt-4"><span className="mono text-[9px] uppercase text-primary">My contribution</span><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{clinicalCaseStudyContent.contribution}</p></div>
          <div className="border-t border-border pt-4"><span className="mono text-[9px] uppercase text-primary">Deployment & access control</span><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{clinicalCaseStudyContent.verifiedDelivery}</p></div>
          <div className="border-t border-border pt-4"><span className="mono text-[9px] uppercase text-primary">How it is validated</span><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{clinicalCaseStudyContent.validation}</p></div>
        </div>
        <details className="chapter mt-5 border-t border-border pt-4">
          <summary className="text-xs font-semibold" data-testid="toggle-clinical-details">Features, explanations & access control</summary>
          <div className="grid gap-5 pt-5 sm:grid-cols-2">
            <div><h4 className="mono text-[9px] uppercase text-muted-foreground">Features & missing data</h4><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{clinicalCaseStudyContent.featureEngineering}</p></div>
            <div><h4 className="mono text-[9px] uppercase text-muted-foreground">Explanations & clinical review</h4><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{clinicalCaseStudyContent.explainability}</p></div>
            <div><h4 className="mono text-[9px] uppercase text-muted-foreground">Safeguards & access</h4><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{clinicalCaseStudyContent.safeguards}</p></div>
          </div>
        </details>
      </div>
    </article>
  );
}

function VoiceCase() {
  const [active, setActive] = useState(architecture[0]);
  const activeNode = architecture.find((node) => node.id === active.id) ?? architecture[0];
  return (
    <article id="voice-ai" className="case-panel grid gap-7 p-5 sm:p-8 lg:grid-cols-[.86fr_1.14fr] lg:p-10">
      <div className="flex flex-col">
        <div className="flex items-center gap-3"><span className="case-number mono text-xs text-muted-foreground">02</span><span className="mono text-[9px] uppercase tracking-[.14em] text-primary">Real-time conversational AI</span></div>
        <h3 className="display mt-7 text-3xl leading-tight sm:text-4xl">Voice systems<br className="hidden sm:block" /> in real time</h3>
        <div className="mono mt-5 text-[9px] uppercase tracking-[.12em] text-muted-foreground">Problem & system objective</div>
        <p className="mt-2 max-w-md text-sm leading-[1.8] text-muted-foreground">{voiceCaseStudyContent.problem}</p>
        <div className="mt-7 flex flex-wrap gap-2">
          {['ASR → LLM → TTS', 'LiveKit', 'Pipecat', 'Twilio + Genesys', 'WebSocket audio'].map((tag) => <span className="border border-border px-2.5 py-1.5 text-[10px] text-muted-foreground" key={tag}>{tag}</span>)}
        </div>
      </div>
      <div>
        <div className="mb-3 flex items-center justify-between"><span className="mono text-[9px] uppercase tracking-[.12em] text-muted-foreground">Select a system component</span><Network size={15} className="text-primary" /></div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {architecture.map((node, index) => <button key={node.id} className="architecture-node min-h-[72px] p-3 text-left" aria-pressed={active.id === node.id} onClick={() => setActive(node)} data-testid={`button-architecture-${node.id}`}>
            <span className="mono block text-[9px] text-primary">0{index + 1} · {node.sub}</span><span className="mt-2 block text-xs font-medium">{node.label}</span>
          </button>)}
        </div>
        <div className="technical-card mt-3 min-h-[166px] p-4 sm:p-5" aria-live="polite">
          <h4 className="text-sm font-semibold">{activeNode.label}</h4>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{activeNode.detail}</p>
          <div className="mt-4 grid gap-3 border-t border-border pt-3 sm:grid-cols-3">
            <div><span className="mono text-[8px] uppercase text-muted-foreground">Input</span><p className="mt-1 text-[10px] leading-relaxed">{activeNode.input}</p></div>
            <div><span className="mono text-[8px] uppercase text-muted-foreground">Output</span><p className="mt-1 text-[10px] leading-relaxed">{activeNode.output}</p></div>
            <div><span className="mono text-[8px] uppercase text-muted-foreground">What can go wrong</span><p className="mt-1 text-[10px] leading-relaxed">{activeNode.risk}</p></div>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="border-t border-border pt-4"><span className="mono text-[9px] uppercase text-primary">Evaluation approach</span><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{voiceCaseStudyContent.evaluationApproach}</p></div>
          <div className="border-t border-border pt-4"><span className="mono text-[9px] uppercase text-primary">API comparison approach</span><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{voiceCaseStudyContent.tradeoffsBoundary}</p></div>
        </div>
        <details className="chapter mt-5 border-t border-border pt-4">
          <summary className="text-xs font-semibold" data-testid="toggle-voice-details">How a voice turn moves through the system</summary>
          <div className="space-y-5 pt-5">
            <div className="flex flex-wrap items-center gap-2 text-[9px] sm:gap-3"><span className="border border-border px-2 py-2">Caller audio</span><ArrowRight size={13} className="text-primary" /><span className="border border-border px-2 py-2">VAD / endpoint</span><ArrowRight size={13} className="text-primary" /><span className="border border-border px-2 py-2">ASR</span><ArrowRight size={13} className="text-primary" /><span className="border border-border px-2 py-2">LLM</span><ArrowRight size={13} className="text-primary" /><span className="border border-border px-2 py-2">TTS / playback</span></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><h4 className="mono text-[9px] uppercase text-primary">Engineering challenges & investigation</h4><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{voiceCaseStudyContent.engineeringChallenges}</p></div>
              <div><h4 className="mono text-[9px] uppercase text-primary">Latency & quality evaluation</h4><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{voiceCaseStudyContent.evaluationDetail}</p></div>
              <div><h4 className="mono text-[9px] uppercase text-primary">Reliability, barge-in & recovery</h4><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{voiceCaseStudyContent.reliability}</p></div>
              <div><h4 className="mono text-[9px] uppercase text-primary">Architecture note</h4><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{voiceCaseStudyContent.architectureNote}</p></div>
            </div>
            <LatencyBreakdown />
          </div>
        </details>
      </div>
    </article>
  );
}

function LatencyBreakdown() {
  const stages = [
    { title: 'Audio transport', detail: 'Move caller audio into the system.' },
    { title: 'Endpointing', detail: 'Determine when the caller has finished speaking.' },
    { title: 'Speech recognition', detail: 'Convert audio into text.' },
    { title: 'LLM response', detail: 'Generate the next response.' },
    { title: 'Speech synthesis', detail: 'Convert the response into audio.' },
  ];

  return (
    <section className="border border-border p-4 sm:p-5" aria-labelledby="latency-title">
      <h4 id="latency-title" className="mono text-[9px] uppercase tracking-[.12em] text-primary">Where response time can be spent</h4>
      <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground">To investigate latency, measure the complete turn and each stage separately. This is a system walkthrough, not a chart of measured timings.</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {stages.map((stage, index) => (
          <div key={stage.title} className="border border-border p-3">
            <span className="mono text-[9px] text-primary">0{index + 1}</span>
            <h5 className="mt-2 text-xs font-semibold">{stage.title}</h5>
            <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{stage.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];
  const filtered = filter === 'All' ? projects : projects.filter((project) => project.category === filter);
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div><Eyebrow>03 / Personal projects</Eyebrow><h2 className="display mt-5 max-w-[650px] text-4xl leading-tight sm:text-5xl">Personal projects I've built.</h2><p className="mt-4 max-w-[550px] text-sm leading-relaxed text-muted-foreground">Projects I designed and built on my own, outside my day job. Each one starts from a real engineering problem and ends with working code you can explore.</p></div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {categories.map((category) => <button key={category} className={`skill-pill px-3 py-2 text-[10px] ${filter === category ? '!bg-primary !text-primary-foreground !border-primary' : ''}`} aria-pressed={filter === category} onClick={() => setFilter(category)} data-testid={`filter-project-${category.toLowerCase().replaceAll(' ', '-')}`}>{category}</button>)}
          </div>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {filtered.map((project, index) => <ProjectCard project={project} index={index} key={project.title} />)}
        </div>
        <div className="mt-5 flex items-center justify-between border border-dashed border-border p-5 sm:px-7">
          <div><div className="mono text-[9px] uppercase tracking-[.12em] text-muted-foreground">More projects in progress</div><p className="mt-2 text-sm">I am working on further projects and will add them once their code is public on GitHub.</p></div>
          <span className="hidden shrink-0 sm:block"><a className="button text-xs" href={githubProfileUrl} target="_blank" rel="noreferrer noopener" aria-label="All repositories on GitHub (opens in a new tab)" data-testid="link-projects-github-profile"><Github size={14} /> All repositories</a></span>
        </div>
      </div>
    </section>
  );
}

function projectAnchor(title: string) {
  return `project-${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article id={projectAnchor(project.title)} className="project-panel flex min-h-[390px] scroll-mt-24 flex-col p-6 sm:p-8" data-testid={`card-project-${index}`}>
      <div className="flex items-center justify-between"><span className="mono text-[9px] uppercase tracking-[.12em] text-primary">{project.category}</span><span className="mono text-[10px] text-muted-foreground">{String(index + 1).padStart(2, '0')}</span></div>
      <div className="mt-8 border-y border-border py-5">
        <ol className="flex items-center justify-between gap-1 text-center" aria-label={`How ${project.title} works`}>
          {project.flow.map((step, i) => <li key={step} className="flex min-w-0 flex-1 items-center gap-1">{i > 0 && <ChevronRight size={13} className="shrink-0 text-primary" aria-hidden="true" />}<span className={`flex-1 border px-1 py-3 text-[8px] leading-tight sm:text-[10px] ${i === project.flow.length - 1 ? 'border-primary/50' : 'border-border'}`}>{step}</span></li>)}
        </ol>
      </div>
      <h3 className="display mt-6 text-3xl">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
      {project.highlights && <dl className="mt-5 grid grid-cols-3 gap-2">
        {project.highlights.map((highlight) => <div key={highlight.label} className="technical-card p-3"><dt className="sr-only">{highlight.label}</dt><dd className="text-base font-medium leading-tight sm:text-lg">{highlight.value}</dd><dd className="mt-1 text-[10px] leading-snug text-muted-foreground">{highlight.label}</dd></div>)}
      </dl>}
      <details className="chapter mt-5 border-t border-border pt-4">
        <summary className="text-xs font-semibold" data-testid={`toggle-project-details-${index}`}>How it works and what I built</summary>
        <div className="grid gap-4 pt-4 sm:grid-cols-2">
          {[['Problem', project.problem], ['Approach', project.approach], ['Contribution', project.contribution], ['Engineering consideration', project.challenge], ['Outcome', project.outcome]].map(([heading, copy]) => <div key={heading}><h4 className="mono text-[9px] uppercase text-primary">{heading}</h4><p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{copy}</p></div>)}
        </div>
      </details>
      <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
        <div className="flex flex-wrap gap-2">{project.technologies.map((technology) => <span className="border border-border px-2 py-1 text-[9px] text-muted-foreground" key={technology}>{technology}</span>)}</div>
        {(project.githubUrl || project.demoUrl) && <div className="flex flex-wrap gap-2">
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer noopener" className="button button-primary text-xs" aria-label={`Open the ${project.title} live demo (opens in a new tab)`} data-testid={`link-project-demo-${index}`}><MonitorPlay size={13} /> Live demo</a>}
          {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer noopener" className="button text-xs" aria-label={`View ${project.title} source code on GitHub (opens in a new tab)`} data-testid={`link-project-github-${index}`}><Github size={13} /> GitHub <ExternalLink size={12} /></a>}
        </div>}
      </div>
    </article>
  );
}

function SkillsExplorer() {
  const categories = useMemo(() => ['All areas', ...Array.from(new Set(skills.map((skill) => skill.category)))], []);
  const [category, setCategory] = useState('All areas');
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const available = category === 'All areas' ? skills : skills.filter((skill) => skill.category === category);
  const currentSkill = available.find((skill) => skill.name === selectedSkill.name) ?? available[0];
  const relatedProjects = currentSkill.projects ?? [];
  const hasProfessionalEvidence = ['Professional experience', 'Professional + project use', 'Professional + technical toolkit'].includes(currentSkill.type);
  return (
    <div id="skills" className="grid gap-8 lg:grid-cols-[.82fr_1.18fr]">
          <div><Eyebrow>Skills and technologies</Eyebrow><h3 className="display mt-5 text-3xl leading-tight sm:text-4xl">My technical skills and <em className="text-primary">how I use them.</em></h3><p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">Choose a technology to see how it relates to my professional work or personal projects. Skills are connected to examples, not arbitrary proficiency scores.</p>
            <div className="mt-7 flex flex-wrap gap-2">{categories.map((item) => <button className={`skill-pill px-3 py-2 text-[9px] ${category === item ? 'active' : ''}`} key={item} aria-pressed={category === item} onClick={() => setCategory(item)} data-testid={`filter-skill-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}</div>
            <div className="mt-5 flex flex-wrap gap-2">{available.map((skill) => <button className="skill-pill px-3 py-2 text-xs" key={skill.name} aria-pressed={currentSkill.name === skill.name} onClick={() => setSelectedSkill(skill)} data-testid={`select-skill-${skill.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}`}>{skill.name}</button>)}</div>
          </div>
          <div className="technical-card min-h-[280px] p-6 sm:p-8" aria-live="polite">
            <div className="flex items-start justify-between gap-4"><span className="mono text-[9px] uppercase tracking-[.12em] text-primary">{currentSkill.category}</span><span className="border border-border px-2 py-1 text-[9px] text-muted-foreground">{({ 'Professional experience': 'Professional work', 'Professional + project use': 'Professional and personal projects', 'Professional + technical toolkit': 'Professional work + toolkit', 'Personal project': 'Personal project', 'Technical toolkit': 'Technical toolkit' } as Record<string, string>)[currentSkill.type] ?? currentSkill.type}</span></div>
            <h3 className="display mt-7 text-3xl">{currentSkill.name}</h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">{currentSkill.evidence}</p>
            {(relatedProjects.length > 0 || hasProfessionalEvidence) && <div className="mt-8 border-t border-border pt-5"><span className="mono text-[9px] uppercase text-muted-foreground">Related work</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {relatedProjects.map((title) => <a className="button !px-3 !py-2 text-[10px]" href={`#${projectAnchor(title)}`} key={title}>{title} <ArrowRight size={12} /></a>)}
                {hasProfessionalEvidence && <a className="button !px-3 !py-2 text-[10px]" href="#work">Professional case studies <ArrowRight size={12} /></a>}
              </div>
            </div>}
          </div>
    </div>
  );
}

function DecisionRecords() {
  const steps = [
    { title: 'Understand the problem', detail: 'Clarify what needs to improve, who it affects, and what success should look like.' },
    { title: 'Compare possible approaches', detail: 'Consider constraints such as quality, latency, reliability, complexity, and maintenance.' },
    { title: 'Test the choice', detail: 'Use relevant measurements, tests, and error analysis instead of relying on assumptions.' },
    { title: 'Explain the trade-offs', detail: 'Document why an approach was chosen, what it improves, and what still needs work.' },
  ];

  return (
    <div id="decisions" className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Eyebrow>Engineering approach</Eyebrow>
        <h3 className="display mt-4 text-3xl leading-tight sm:text-4xl">Good engineering makes <em className="text-primary">the reasoning visible.</em></h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">A model or feature is only part of the work. The problem, evaluation, constraints, and trade-offs explain why a solution is useful.</p>
      </div>
      <div className="border-t border-border">
        {steps.map((step, index) => (
          <div key={step.title} className="grid gap-2 border-b border-border py-5 sm:grid-cols-[44px_1fr] sm:gap-4">
            <span className="mono text-[10px] text-primary">0{index + 1}</span>
            <div><h4 className="text-sm font-semibold">{step.title}</h4><p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">{step.detail}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Notebook() {
  return (
    <section id="skills-approach" className="section">
      <div className="wrap">
        <div className="grid gap-7 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
          <div>
            <Eyebrow>04 / Skills & engineering approach</Eyebrow>
            <h2 className="display mt-5 text-4xl leading-tight sm:text-5xl">Tools, decisions, <em className="text-primary">and how I work.</em></h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">Explore the technologies I’ve used and the engineering considerations behind building, evaluating, and improving AI systems.</p>
        </div>
        <div className="mt-12 border-t border-border pt-12">
          <SkillsExplorer />
        </div>
        <div className="mt-16 border-t border-border pt-12">
          <DecisionRecords />
        </div>
      </div>
    </section>
  );
}

function AboutAndContact() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-[.65fr_1.35fr]">
          <div><Eyebrow>05 / About</Eyebrow><h2 className="display mt-5 text-4xl sm:text-5xl">About <em className="text-primary">me.</em></h2></div>
          <div className="max-w-[710px]">
            <p className="text-lg leading-relaxed text-foreground/80">I’m Devansh Raina, a software engineer at Whilter.AI. My work spans clinical machine learning and real-time conversational voice systems—from feature engineering and model evaluation to streaming pipelines, access control, and application delivery.</p>
            <p className="mt-5 text-sm leading-[1.9] text-muted-foreground">I’m drawn to engineering problems where the model is only one part of the system: the data needs scrutiny, the quality needs a meaningful measure, and the product needs to behave when inputs are messy or a turn fails. My degree is in Computer Engineering with a Data Science specialization.</p>
            <p className="mt-5 text-sm leading-[1.9] text-muted-foreground">Outside work, I build open-source Python tools with the same habits: a PostgreSQL job queue with a crash test, evidence-backed log analysis, and statistics that tell whether an AI change is real. Each one documents its methods and limitations.</p>
            <div className="mt-8 flex flex-wrap gap-2"><span className="border border-border px-3 py-2 text-[10px]">Clinical ML</span><span className="border border-border px-3 py-2 text-[10px]">Conversational AI</span><span className="border border-border px-3 py-2 text-[10px]">Production systems</span><span className="border border-border px-3 py-2 text-[10px]">Open-source tools</span></div>
          </div>
        </div>
        <div id="contact" className="contact-panel relative mt-24 overflow-hidden border border-border bg-card">
          <div className="hero-grid pointer-events-none absolute inset-y-0 right-0 w-2/5 opacity-40" aria-hidden="true" />
          <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.12fr_.88fr] lg:gap-14 lg:p-12">
            <div className="max-w-2xl">
              <Eyebrow>06 / Get in touch</Eyebrow>
              <h3 className="display mt-6 text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">Have a problem worth <em className="text-primary">solving?</em></h3>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">For conversations about applied machine learning, real-time voice systems, software engineering opportunities, or a question about my work, email is the best place to start.</p>
              <div className="mt-7 flex flex-wrap gap-2">
                <span className="border border-border bg-background/40 px-3 py-2 text-[10px] text-muted-foreground">Applied ML</span>
                <span className="border border-border bg-background/40 px-3 py-2 text-[10px] text-muted-foreground">Voice AI</span>
                <span className="border border-border bg-background/40 px-3 py-2 text-[10px] text-muted-foreground">Software engineering</span>
              </div>
            </div>
            <div className="technical-card flex flex-col justify-between gap-8 p-6 sm:p-7">
              <div>
                <div className="flex items-center gap-3 text-primary">
                  <span className="grid h-10 w-10 place-items-center border border-border"><Mail size={17} /></span>
                  <span className="mono text-[10px] uppercase tracking-[.14em]">Preferred contact</span>
                </div>
                <p className="mono mt-7 text-[9px] uppercase tracking-[.12em] text-muted-foreground">Email</p>
                <a className="mt-2 inline-block break-all text-base font-medium hover:text-primary sm:text-lg" href="mailto:devansh.raina38@gmail.com" data-testid="link-contact-email-address">devansh.raina38@gmail.com</a>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">A direct email is the simplest way to get in touch.</p>
              </div>
              <div className="grid gap-2 border-t border-border pt-5">
                <a className="button button-primary w-full" href="mailto:devansh.raina38@gmail.com?subject=Portfolio%20enquiry" data-testid="link-email-contact"><Mail size={15} /> Start a conversation <ArrowRight size={15} /></a>
                <a className="button w-full" href={linkedInUrl} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn profile (opens in a new tab)" data-testid="link-contact-linkedin"><Linkedin size={14} /> LinkedIn <ExternalLink size={12} /></a>
                <a className="button w-full" href={githubProfileUrl} target="_blank" rel="noreferrer noopener" aria-label="GitHub profile dcoding0308 (opens in a new tab)" data-testid="link-contact-github"><Github size={14} /> GitHub · dcoding0308 <ExternalLink size={12} /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5 text-[10px] text-muted-foreground"><span>Devansh Raina · Software Engineer</span></div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="portfolio grain min-h-[100dvh]">
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Work />
        <Journey />
        <Projects />
        <Notebook />
        <AboutAndContact />
      </main>
      <footer className="border-t border-border py-5">
        <div className="wrap flex flex-col justify-between gap-2 text-[9px] text-muted-foreground sm:flex-row"><span>© {new Date().getFullYear()} Devansh Raina</span><a href="#home" className="mono uppercase tracking-[.12em] hover:text-foreground">Back to top ↑</a><span>Measure first, then make the claim.</span></div>
      </footer>
    </div>
  );
}

function Router() {
  return <RouteBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></RouteBoundary>;
}

function RouteBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider>;
}

export default App;
