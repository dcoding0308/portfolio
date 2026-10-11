export type ProjectCategory = 'AI systems' | 'Backend systems';

export type Project = {
  title: string;
  category: ProjectCategory;
  summary: string;
  contribution: string;
  technologies: string[];
  problem: string;
  approach: string;
  challenge: string;
  outcome: string;
  /** Steps shown in the card's small flow diagram. */
  flow: string[];
  /** Verified, published results only: each one must appear in the project's own repository. */
  highlights?: { value: string; label: string }[];
  githubUrl?: string;
  /** Only a real, working demo URL that the owner has approved. */
  demoUrl?: string;
  status?: 'completed' | 'in-progress' | 'planned';
  architectureAssets?: string[];
  confidentialityNote?: string;
};

export const githubProfileUrl = 'https://github.com/dcoding0308';
export const linkedInUrl = 'https://www.linkedin.com/in/devanshraina';

export const projects: Project[] = [
  {
    title: 'EvalSignal',
    category: 'AI systems',
    summary: 'Tells you whether a change to a prompt or model is a real improvement or just noise, by comparing two evaluation runs case by case.',
    problem: 'Teams compare two pass rates by eye. Small test sets mislead, an unchanged average can hide a broken category, and "no significant change" is easily mistaken for "no change".',
    approach: 'Paired statistics on per-item results: McNemar exact test and Agresti–Min intervals for pass/fail, bootstrap and permutation tests for scores, Holm and Benjamini–Hochberg correction across categories, and exact power for sample-size advice. Every comparison ends in one of four plain-English verdicts, including "not enough evidence".',
    contribution: 'Built the statistics library, command-line tool, HTML and pull-request reports, a GitHub Actions example, and a static demo page. Validated the methods by simulation and ran case studies on public data: Mistral-7B base vs Instruct, and how often GPT-4 as a judge agrees with expert humans (MT-Bench).',
    challenge: 'Simulation showed that the textbook sample-size formula under-delivers (77–80% real power when 80% is promised) and that simple intervals are too narrow on small test sets. Both were replaced, and the corrections are logged in the repository.',
    outcome: 'False alarms stayed at or below 5% in all 30 simulated settings. On 50-question subsets, "higher score wins" pointed the wrong way 7.2% of the time; EvalSignal was wrong in 1 of 2,000 draws, made the correct call 15.6% of the time, and otherwise said "not enough evidence". GPT-4 agreed with experts 66.2% of the time, close to expert-to-expert agreement (65.5%).',
    technologies: ['Python', 'NumPy', 'SciPy', 'Statistics', 'GitHub Actions'],
    flow: ['Two runs', 'Pair by item', 'Paired test', 'Verdict'],
    highlights: [
      { value: '≤ 5%', label: 'false alarms across 30 simulated settings' },
      { value: '7.2% → 0.05%', label: 'wrong calls on 50-question test sets' },
      { value: '66.2%', label: 'LLM judge agreement with experts (experts: 65.5%)' },
    ],
    githubUrl: 'https://github.com/dcoding0308/evalsignal',
    demoUrl: 'https://dcoding0308.github.io/evalsignal/',
  },
  {
    title: 'EvidentLog',
    category: 'AI systems',
    summary: 'Finds incidents in large system logs and explains the likely cause, quoting the exact lines that prove each claim and checking every citation.',
    problem: 'When something breaks, engineers search millions of log lines. An AI summary of logs is easy to build and hard to trust: it can name a cause the logs never mention.',
    approach: 'Detect time windows where severe activity is not routine, group them into incidents, and collect the message types that rose far above their usual rate with their exact lines. Explanations separate facts from hypotheses and cite evidence ids; a verifier checks every quote against the source and drops claims that fail.',
    contribution: 'Built log parsing and template mining (Drain), detectors and baselines, incident grouping, evidence collection, a rules explainer and a local-model explainer (Qwen 2.5 7B via Ollama), the citation verifier, and an escaped HTML report. Evaluated on public LogHub datasets with chronological train, validation and test splits.',
    challenge: 'Published detectors that learn "normal" behaviour failed on the BGL supercomputer logs, because its failures recur constantly. The measured result was reported as it was: a simpler routine-filtered severity detector won.',
    outcome: 'On BGL (4.7M lines), F1 0.848 vs 0.783 for alarming on every FATAL line, with 40% fewer false alarms and 45% fewer false incidents while catching 180 of 183 incidents. The verifier rejected 11 local-model claims, and none of them reached a report.',
    technologies: ['Python', 'NumPy', 'Ollama', 'Local LLMs', 'LogHub'],
    flow: ['Parse logs', 'Detect', 'Group incidents', 'Cite + verify'],
    highlights: [
      { value: '0.848', label: 'F1 on BGL vs 0.783 baseline' },
      { value: '−40%', label: 'false alarms per day' },
      { value: '180 / 183', label: 'incidents caught' },
    ],
    githubUrl: 'https://github.com/dcoding0308/evidentlog',
  },
  {
    title: 'pgjobs',
    category: 'Backend systems',
    summary: 'A background job queue built on PostgreSQL, with written-down delivery guarantees and a crash test that proves them.',
    problem: 'Many applications run Redis and a separate broker only to send emails or process uploads in the background, although they already have PostgreSQL. At-least-once delivery is also easy to get subtly wrong.',
    approach: 'Jobs live in PostgreSQL, so a job can be enqueued in the same transaction as the data it belongs to. Workers claim jobs with FOR UPDATE SKIP LOCKED, hold leases with heartbeats, and use fencing tokens so a paused worker cannot overwrite the new owner\'s result. LISTEN/NOTIFY wakes workers, with polling as a fallback.',
    contribution: 'Designed and built the queue and worker, retries with exponential backoff and jitter, dead-lettering, priorities, delayed and deduplicated jobs, graceful shutdown, a web dashboard, and a chaos test that kills workers mid-run. Written as a learning-oriented implementation; the README points to mature alternatives for production use.',
    challenge: 'A worker can crash or pause at any moment, so every state change had to be safe to repeat or detectable as stale.',
    outcome: 'Crash test: 2,000 jobs with about 20 workers killed by SIGKILL mid-run, and 0 jobs lost. About 7,300–8,200 no-op jobs per second with 4 processes; median pickup latency 7.4–7.8 ms with LISTEN/NOTIFY.',
    technologies: ['Python', 'PostgreSQL', 'asyncio', 'psycopg', 'Docker'],
    flow: ['Enqueue in transaction', 'Claim (SKIP LOCKED)', 'Run + heartbeat', 'Done / retry'],
    highlights: [
      { value: '0', label: 'jobs lost with ~20 workers killed mid-run' },
      { value: '7.3–8.2K/s', label: 'no-op jobs, 4 processes' },
      { value: '7.4–7.8 ms', label: 'median pickup latency' },
    ],
    githubUrl: 'https://github.com/dcoding0308/pgjobs',
  },
  {
    title: 'AI Interview Mocker',
    category: 'AI systems',
    summary: 'A structured practice loop: role-specific prompts, free-text answers, criteria-based scoring, and useful feedback.',
    contribution: 'Built an interview simulator that generates 10–15 role- and topic-specific questions per session and evaluates responses against structured criteria.',
    technologies: ['LLMs', 'Prompt engineering', 'PostgreSQL'],
    problem: 'Interview practice needs more than a question list: candidates need feedback they can act on and a record they can revisit.',
    approach: 'Generate a focused set of questions, assess free-text responses against defined criteria, return feedback, and store full sessions in PostgreSQL.',
    challenge: 'Question quality and evaluation consistency are important design concerns for an open-ended practice tool.',
    outcome: 'Interview sessions are stored in PostgreSQL for later access.',
    flow: ['Role + topic', 'Question / answer', 'Structured feedback'],
  },
];

export const clinicalCaseStudyContent = {
  problem: 'Assigning each patient in a primary-care population one of five acuity tiers, from Tier 1 (critical) to Tier 5 (very low risk), using only information already in the electronic health record, so care teams can see who needs attention first.',
  modelDesign: 'Two complementary signals are blended into one score: a transparent rule-based score in which every point traces to a clinical threshold, and gradient-boosted models trained on what actually happened to past patients, such as care escalations and unplanned returns. Each outcome model must pass a held-out AUC check before it contributes.',
  contribution: 'Feature engineering from EHR data, model evaluation and explanation, and the serving application with containerized deployment and access control.',
  verifiedDelivery: 'A web-serving application was deployed on Azure, containerized with Docker, and protected with Microsoft Entra ID single sign-on and role-based access control.',
  validation: 'The score is validated against real outcomes, like a clinical trial run backwards: patients are scored using only what was known at a fixed date, the tiers are frozen, and the following year\'s outcomes are checked. Bad outcomes must become steadily more common from the lowest to the highest tier, with a clear gap between the two ends.',
  featureEngineering: 'Features come from data already in the record: vitals, labs, diagnoses, medications, visit history, and social factors. Trend features (slopes, change from a personal baseline, recency, and rate of change) show whether a patient is stable or getting worse. Missing values are not imputed: an absent measurement often carries meaning, so the tree models learn how to treat it.',
  explainability: 'Per-patient explanations (SHAP) show how much each clinical area contributed to a score. Clinicians review the tier distribution and flagged patients; every adjustment is version-controlled, and any change that breaks the outcome ordering is rolled back.',
  safeguards: 'No new tests or data entry are needed. The deployed web application used Docker, Azure, automated deployment, Entra ID single sign-on, and role-based access control to restrict access to authorised users.',
};

export const voiceCaseStudyContent = {
  problem: 'Conversational voice over live PSTN calls: the experience depends on how audio flows, when turns end, and what happens when the conversation goes off-script.',
  evaluationApproach: 'Evaluation focused on turn latency, interruption accuracy, task completion, and speech-recognition quality.',
  tradeoffsBoundary: 'The work included repeatable comparisons between commercial APIs and in-house components. This overview does not claim a winning configuration or publish unverified performance figures.',
  engineeringChallenges: 'Work considered endpointing, codec handling, jitter, buffering, concurrent sessions, and recovery. Commercial APIs and in-house components were compared in reproducible studies.',
  evaluationDetail: 'These measures help separate speed from conversational quality. Results should be reported with the test setup and sample size so that comparisons remain meaningful.',
  reliability: 'Interruptions, partial or failed turns, and turn recovery are part of the conversation lifecycle. Turn-level observability helps locate issues across recognition, dialogue, and synthesis.',
  architectureNote: 'This diagram is intentionally high-level. It shows the flow between common components without exposing customer-specific systems or infrastructure.',
};

export const milestones = [
  {
    period: '2021 — 2025',
    title: 'Computer Engineering · Data Science',
    organization: 'JC Bose University of Science and Technology (YMCA)',
    location: 'Faridabad, India',
    detail: 'B.Tech in Computer Engineering with a specialization in Data Science. This built the foundation for my later work in machine learning and production software systems.',
    evidence: 'B.Tech, Computer Engineering · GPA 7.38/10',
    index: '01',
    related: [],
  },
  {
    period: 'Jul 2025 — now',
    title: 'Software Engineer',
    organization: 'Whilter.AI',
    location: 'Gurugram, India',
    detail: 'Working across patient acuity prediction and real-time conversational voice systems. The scope includes model evaluation and delivery, plus streaming audio, turn handling, observability, and trade-off studies.',
    evidence: 'Clinical ML · Voice AI · Azure delivery',
    index: '02',
    related: [{ label: 'Clinical acuity prediction', href: '#clinical-ml' }, { label: 'Conversational voice AI', href: '#voice-ai' }],
  },
];

export type Skill = {
  category: string;
  name: string;
  evidence: string;
  type: 'Professional experience' | 'Professional + project use' | 'Professional + technical toolkit' | 'Personal project' | 'Technical toolkit';
  /** Titles of entries in `projects` that demonstrate this skill. */
  projects?: string[];
};

export const skills: Skill[] = [
  { category: 'Programming', name: 'Python', evidence: 'Used across feature engineering, data workflows, and ML systems at work, and as the main language of pgjobs, EvidentLog, and EvalSignal.', type: 'Professional + project use', projects: ['EvalSignal', 'EvidentLog', 'pgjobs'] },
  { category: 'Programming', name: 'SQL', evidence: 'Used with Azure SQL and PostgreSQL for querying and data systems, including the queue design in pgjobs.', type: 'Professional + project use', projects: ['pgjobs'] },
  { category: 'Programming', name: 'C++', evidence: 'Part of my programming toolkit.', type: 'Technical toolkit' },
  { category: 'Machine learning', name: 'XGBoost', evidence: 'Gradient-boosted outcome models in the clinical acuity score, using their built-in handling of missing values.', type: 'Professional experience' },
  { category: 'Machine learning', name: 'PyTorch', evidence: 'Part of my machine-learning toolkit.', type: 'Technical toolkit' },
  { category: 'Machine learning', name: 'Feature engineering', evidence: 'Trend features (slopes, change from baseline, recency) built from vitals, labs, medications, and visit history.', type: 'Professional experience' },
  { category: 'Evaluation & statistics', name: 'Statistical testing', evidence: 'Paired tests, confidence intervals, power analysis, and multiple-testing correction in EvalSignal, each checked by simulation before use.', type: 'Personal project', projects: ['EvalSignal'] },
  { category: 'Evaluation & statistics', name: 'LLM evaluation', evidence: 'Measured how often an LLM judge agrees with expert humans in EvalSignal, and verified every quote a local model cites in EvidentLog.', type: 'Personal project', projects: ['EvalSignal', 'EvidentLog'] },
  { category: 'Evaluation & statistics', name: 'Model evaluation', evidence: 'Outcome-based validation, held-out AUC checks, and SHAP explanations at work; baselines and chronological test splits in EvidentLog.', type: 'Professional + project use', projects: ['EvidentLog'] },
  { category: 'Speech & language', name: 'Hugging Face Transformers', evidence: 'Part of my speech and language toolkit.', type: 'Technical toolkit' },
  { category: 'Speech & language', name: 'Whisper / ASR', evidence: 'ASR is one stage in the streaming voice pipeline; Whisper is part of my speech-recognition toolkit.', type: 'Professional + technical toolkit' },
  { category: 'Speech & language', name: 'LiveKit', evidence: 'Used to orchestrate the ASR → LLM → TTS streaming stack.', type: 'Professional experience' },
  { category: 'Speech & language', name: 'Pipecat', evidence: 'Used to orchestrate the ASR → LLM → TTS streaming stack.', type: 'Professional experience' },
  { category: 'Speech & language', name: 'Ollama / local LLMs', evidence: 'Ran Qwen 2.5 7B locally in EvidentLog with JSON-schema output and cached, repeatable results.', type: 'Personal project', projects: ['EvidentLog'] },
  { category: 'Data & analysis', name: 'Pandas', evidence: 'Part of my data toolkit for cleaning, transforming, and exploring datasets.', type: 'Technical toolkit' },
  { category: 'Data & analysis', name: 'NumPy', evidence: 'Whole log files held as arrays in EvidentLog; vectorised exact power calculations in EvalSignal.', type: 'Personal project', projects: ['EvidentLog', 'EvalSignal'] },
  { category: 'Cloud & delivery', name: 'Azure', evidence: 'Serving application hosted on Azure with automated deployment.', type: 'Professional experience' },
  { category: 'Cloud & delivery', name: 'Azure Machine Learning', evidence: 'Part of my cloud and machine-learning toolkit.', type: 'Technical toolkit' },
  { category: 'Cloud & delivery', name: 'Docker', evidence: 'Serving application containerized for deployment at work; PostgreSQL for pgjobs runs in Docker Compose.', type: 'Professional + project use', projects: ['pgjobs'] },
  { category: 'Cloud & delivery', name: 'GitHub Actions', evidence: 'Continuous integration for pgjobs; demo-page deployment and a pull-request comment workflow for EvalSignal.', type: 'Personal project', projects: ['pgjobs', 'EvalSignal'] },
  { category: 'Databases & integration', name: 'Azure SQL', evidence: 'Part of my data and database toolkit.', type: 'Technical toolkit' },
  { category: 'Databases & integration', name: 'PostgreSQL', evidence: 'The foundation of pgjobs (row locking, LISTEN/NOTIFY, transactional enqueue); also stores complete AI Interview Mocker sessions.', type: 'Personal project', projects: ['pgjobs', 'AI Interview Mocker'] },
  { category: 'Databases & integration', name: 'MySQL', evidence: 'Part of my database toolkit.', type: 'Technical toolkit' },
  { category: 'Databases & integration', name: 'Twilio + Genesys', evidence: 'Used in SIP telephony integrations for PSTN calls.', type: 'Professional experience' },
];

export const architecture = [
  { id: 'transport', label: 'Caller & transport', sub: 'PSTN · SIP · WebSocket', detail: 'Connects callers to the voice system through SIP telephony and WebSocket audio streaming, with Twilio and Genesys used for telephony integration.', input: 'Caller audio over a telephony or streaming connection', output: 'Audio frames and session events', risk: 'Codec mismatch, jitter, buffering, or a broken connection can interrupt audio flow.' },
  { id: 'vad', label: 'Voice activity', sub: 'VAD · endpointing', detail: 'Voice activity detection and endpointing help determine when speech is present and when a turn may be complete.', input: 'Streaming audio frames', output: 'Speech segments and endpoint signals', risk: 'A missed or premature endpoint can clip speech or add avoidable waiting.' },
  { id: 'asr', label: 'Speech recognition', sub: 'ASR', detail: 'Automatic speech recognition turns caller speech into text for the dialogue stage.', input: 'Speech audio', output: 'Recognized text, often incrementally', risk: 'Recognition errors or partial results can change what the system thinks it heard.' },
  { id: 'llm', label: 'Dialogue reasoning', sub: 'LLM', detail: 'The language model processes the recognized turn and produces a response for synthesis.', input: 'Recognized user turn and dialogue context', output: 'Response text', risk: 'Slow or unsuitable responses can affect latency and perceived conversational quality.' },
  { id: 'tts', label: 'Speech synthesis', sub: 'TTS', detail: 'Text-to-speech converts the response to audio that can be streamed back to the caller.', input: 'Response text', output: 'Synthesized audio', risk: 'Synthesis delay or audio delivery issues can make a turn feel broken.' },
  { id: 'control', label: 'Turn control', sub: 'Barge-in · recovery', detail: 'Conversational dynamics include turn detection, interruption handling, and recovery from partial or failed turns.', input: 'Turn state, audio events, and component results', output: 'Continue, interrupt, or recover the conversation', risk: 'Missed barge-in or incomplete recovery can leave the caller waiting or talking over playback.' },
];
