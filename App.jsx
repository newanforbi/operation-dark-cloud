import { useState, useEffect, useCallback } from "react";

const AGENTS = [
  {
    id: "noguchi",
    name: "Gary Noguchi",
    title: "Unit Supervisor",
    role: "Supervising Agent — Stockton Parole Unit",
    color: "#DC2626",
    allegations: [
      "Attended Case Conference where retaliation was reported — failed to correct it",
      "Ratified punitive conditions imposed by subordinates",
      "Co-fabricated '6.5-year' minimum supervision requirement",
      "Applied legally incompatible Case Type to deny discharge",
      "Supervisory ratification of unconstitutional conduct across unit",
    ],
  },
  {
    id: "derrick",
    name: "A. Derrick",
    title: "Parole Agent",
    role: "Agent — Stockton Parole Unit",
    color: "#EA580C",
    allegations: [
      'Explicit First Amendment retaliation: "You do not have freedom of speech"',
      "Forced parolee to abandon lawful employment",
      "Punitive escalation of parole conditions to suppress protected speech",
      "Conferred with HOPE to revoke attendance grace period",
    ],
  },
  {
    id: "urrea",
    name: "Glenn Urrea",
    title: "Parole Agent",
    role: "Agent — Stockton Parole Unit",
    color: "#D97706",
    allegations: [
      "Overrode confirmed judicial release order",
      "Imposed 5-day detention based on inapplicable Halloween curfew",
      "Manufactured detention without probable cause (Fourth Amendment seizure)",
      "Utilized administrative parole holds without legal justification",
    ],
  },
  {
    id: "moua",
    name: "Long Moua",
    title: "Parole Agent",
    role: "Agent — Stockton Parole Unit",
    color: "#65A30D",
    allegations: [
      "Co-fabricated '6.5-year' minimum supervision requirement with Noguchi",
      "Used obsolete Form 1502-DR instead of mandated Form 3043",
      "Bypassed regulatory risk thresholds under 15 CCR § 3574",
      "'Copy-pasted' different parolee's name — the 'Eagan' error",
      "Cited uncodified 'Policy 19-03' to deny discharge",
    ],
  },
  {
    id: "rojo",
    name: "Joseelyn Rojo",
    title: "Parole Agent",
    role: "Agent — Stockton Parole Unit",
    color: "#0891B2",
    allegations: [
      "Denied religious travel based on unwritten, unpublished policy",
      "Delayed notification to maximize punitive impact",
      "Invoked secret policies to burden sincere religious exercise",
      "Utilized deception to foreclose administrative appeals",
    ],
  },
];

const VECTORS = [
  {
    id: "post",
    num: 1,
    name: "POST Decertification (SB 2)",
    icon: "🛡️",
    category: "Professional License",
    tasks: [
      {
        id: "post-complaint",
        label: "File POST Public Complaint Form for each named agent",
        detail: "Submit via ComplaintIntake@post.ca.gov or PDF form. Cite 'serious misconduct' categories: abuse of power, dishonesty, failure to intercede.",
        agents: ["noguchi", "derrick", "urrea", "moua", "rojo"],
        priority: "critical",
      },
      {
        id: "post-evidence",
        label: "Compile evidence packet for POSAD review",
        detail: "Include documentary evidence of each agent's specific misconduct mapped to SB 2 categories. Agency must report investigative findings to POST within 10 days of completion.",
        agents: ["noguchi", "derrick", "urrea", "moua", "rojo"],
        priority: "high",
      },
      {
        id: "post-timeline",
        label: "Calendar 30-day review window after POST recommendation",
        detail: "If POST issues decertification recommendation, officer has 30 days to request review. Failure to do so = action stands.",
        agents: ["noguchi", "derrick", "urrea", "moua", "rojo"],
        priority: "medium",
      },
    ],
  },
  {
    id: "usdoj",
    num: 2,
    name: "US DOJ Civil Rights Division",
    icon: "⚖️",
    category: "Federal Intervention",
    tasks: [
      {
        id: "doj-pattern",
        label: "File 'pattern or practice' complaint with DOJ Civil Rights Division",
        detail: "Submit via civilrights.justice.gov/report. Emphasize race-based disparate treatment: Black parolees vs. white comparator receiving leniency.",
        agents: ["noguchi", "derrick", "urrea"],
        priority: "critical",
      },
      {
        id: "doj-ocr",
        label: "File parallel complaint with OJP Office for Civil Rights",
        detail: "Submit via AskOCR@usdoj.gov. Focus on federal funding leverage — state programs accepting federal funds cannot discriminate.",
        agents: ["noguchi", "derrick"],
        priority: "high",
      },
    ],
  },
  {
    id: "cadoj",
    num: 3,
    name: "CA DOJ / Attorney General",
    icon: "🏛️",
    category: "State Prosecution",
    tasks: [
      {
        id: "cadoj-complaint",
        label: "File citizen complaint with CA Attorney General",
        detail: "Under PC § 832.5. Demonstrate exhaustion of local remedies — local command (Noguchi) is actively participating in misconduct.",
        agents: ["noguchi", "derrick", "urrea", "moua", "rojo"],
        priority: "high",
      },
    ],
  },
  {
    id: "oig",
    num: 4,
    name: "Office of the Inspector General",
    icon: "🔍",
    category: "Independent Oversight",
    tasks: [
      {
        id: "oig-complaint",
        label: "File comprehensive OIG complaint via online portal",
        detail: "Detail facility, affected persons, subjects, and specific allegations. OIG monitors CDCR's internal investigation routing by Centralized Screening Team.",
        agents: ["noguchi", "derrick", "urrea", "moua", "rojo"],
        priority: "critical",
      },
      {
        id: "oig-sentinel",
        label: "Request OIG Sentinel Report review",
        detail: "If CDCR attempts to bury investigation, OIG can audit and publish Sentinel Report — distributed to Legislature and Governor. Cite precedent: Sentinel Case Nos. 24-01 and 21-02.",
        agents: ["noguchi"],
        priority: "high",
      },
    ],
  },
  {
    id: "auditor",
    num: 5,
    name: "State Auditor / Whistleblower",
    icon: "📋",
    category: "Fiscal Accountability",
    tasks: [
      {
        id: "auditor-file",
        label: "File Whistleblower complaint with State Auditor",
        detail: "Hotline: 800-952-5665. Mail: P.O. Box 1019, Sacramento. Online portal available. Processed under strict confidentiality.",
        agents: ["noguchi", "derrick", "urrea", "moua"],
        priority: "high",
      },
      {
        id: "auditor-waste",
        label: "Document economic waste for each agent's conduct",
        detail: "Urrea: unlawful jail housing costs. Derrick: employment sabotage increasing recidivism. Moua: extending supervision via obsolete forms.",
        agents: ["urrea", "derrick", "moua"],
        priority: "medium",
      },
    ],
  },
  {
    id: "oal",
    num: 6,
    name: "OAL Underground Regulation",
    icon: "📜",
    category: "Regulatory Invalidation",
    tasks: [
      {
        id: "oal-petition",
        label: "File OAL petition challenging Policy 19-03",
        detail: "Submit to OAL Chapter Two Unit, 300 Capitol Mall, Suite 1250, Sacramento 95814 or staff@oal.ca.gov. Must also serve CDCR Regulations Branch.",
        agents: ["noguchi", "moua"],
        priority: "critical",
      },
      {
        id: "oal-completion",
        label: "File separate petition challenging 'completion impossible' standard",
        detail: "Challenge blanket treatment retention policy as underground regulation. Per 1 CCR § 260: must show written document, general applicability, attack rule itself.",
        agents: ["noguchi", "moua"],
        priority: "high",
      },
      {
        id: "oal-serve",
        label: "Serve copy on CDCR Regulations & Policy Management Branch",
        detail: "P.O. Box 942883, Sacramento, CA. Concurrent service required.",
        agents: ["noguchi", "moua"],
        priority: "high",
      },
    ],
  },
  {
    id: "spb",
    num: 7,
    name: "SPB Request to File Charges",
    icon: "⚡",
    category: "Direct Discipline",
    tasks: [
      {
        id: "spb-101",
        label: "File SPB Form 101 (RTFC) for each named agent",
        detail: "Submit to SPB Appeals Division, 801 Capitol Mall, Sacramento. Select 'Request to File Charges' option. Cite Gov. Code § 19572 causes.",
        agents: ["noguchi", "derrick", "urrea", "moua"],
        priority: "critical",
      },
      {
        id: "spb-facts",
        label: "Draft sworn statement under penalty of perjury",
        detail: "Max 15 pages double-spaced (excl. exhibits). Must state facts with sufficient detail for defense preparation. Specify legal causes: incompetency, dishonesty, neglect, discourteous treatment, willful disobedience.",
        agents: ["noguchi", "derrick", "urrea", "moua"],
        priority: "critical",
      },
      {
        id: "spb-serve",
        label: "Concurrently serve CDCR appointing authority",
        detail: "If SPB approves, CDCR must implement disciplinary action within 2 weeks.",
        agents: ["noguchi", "derrick", "urrea", "moua"],
        priority: "high",
      },
    ],
  },
  {
    id: "crd",
    num: 8,
    name: "CA Civil Rights Department",
    icon: "✊",
    category: "Discrimination",
    tasks: [
      {
        id: "crd-complaint",
        label: "File CRD complaint via CCRS online portal",
        detail: "Or download intake form, or call 800-884-1684. Document race-based disparate treatment with comparator evidence. CRITICAL: 180-day filing deadline from discriminatory act.",
        agents: ["noguchi", "derrick"],
        priority: "critical",
      },
      {
        id: "crd-comparator",
        label: "Prepare detailed comparator analysis",
        detail: "White parolee (Comparator A): brief visits, travel accommodations, casino trips, grievance assistance. Black parolees: hostile enforcement, arbitrary violations, arrest, disparaging remarks.",
        agents: ["derrick", "noguchi"],
        priority: "high",
      },
    ],
  },
  {
    id: "bbs",
    num: 9,
    name: "BBS / Clinical Contractors",
    icon: "✅",
    category: "Clinical Licensing",
    tasks: [
      {
        id: "bbs-palacios",
        label: "File BBS complaint against Katie Palacios / HOPE Psychotherapy",
        detail: "COMPLETED. Via DCA BreEZe portal. Unprofessional/unethical acts, negligence in treatment, fraud/misrepresentation.",
        agents: [],
        priority: "done",
      },
    ],
  },
  {
    id: "oia",
    num: 10,
    name: "OIA Internal Affairs",
    icon: "🔎",
    category: "Internal CDCR",
    tasks: [
      {
        id: "oia-2142",
        label: "File CDCR Form 2142 for each named agent",
        detail: "Citizen's Complaint Against Employees of CDCR. Include employee name, badge number, specific incident details. Send to OIA Northern Region / Central Intake (Sacramento).",
        agents: ["noguchi", "derrick", "urrea", "moua", "rojo"],
        priority: "critical",
      },
      {
        id: "oia-dom",
        label: "Document DOM § 31140.1 reporting obligation chain",
        detail: "Every employee with knowledge of misconduct must report. Failure = grounds for adverse action. Establish that Noguchi's non-reporting = actionable complicity.",
        agents: ["noguchi"],
        priority: "high",
      },
    ],
  },
  {
    id: "dapo",
    num: 11,
    name: "DAPO Chain of Command",
    icon: "📬",
    category: "Executive Escalation",
    tasks: [
      {
        id: "dapo-regional",
        label: "Send registered mail dossier to Northern Region leadership",
        detail: "ADD Cory Alvarez, CDRA Jaimee Lacey, ARA Louis Kissane.",
        agents: ["noguchi", "derrick", "urrea", "moua", "rojo"],
        priority: "high",
      },
      {
        id: "dapo-state",
        label: "Send registered mail dossier to DAPO statewide executives",
        detail: "Director Bryan Bishop and Deputy Director Heather Bowlds. Places executive echelon on formal legal notice — supervisory liability exposure.",
        agents: ["noguchi", "derrick", "urrea", "moua", "rojo"],
        priority: "high",
      },
    ],
  },
  {
    id: "legislative",
    num: 12,
    name: "Legislative Oversight",
    icon: "🏛️",
    category: "Political Pressure",
    tasks: [
      {
        id: "leg-assembly",
        label: "Submit materials to Assembly Public Safety Committee",
        detail: "1020 N Street, Room 111, Sacramento. Chief Counsel: Andrew Ironside. Can request State Auditor investigation.",
        agents: ["noguchi", "derrick", "urrea", "moua", "rojo"],
        priority: "medium",
      },
      {
        id: "leg-budget",
        label: "Submit public comment to Budget Subcommittee No. 6",
        detail: "Chair: AM Nick Schultz. Frame Stockton Unit practices as 'economically wasteful' — directly threatens CDCR budget requests.",
        agents: ["noguchi", "urrea", "moua"],
        priority: "medium",
      },
      {
        id: "leg-senate",
        label: "Submit to Senate Public Safety Committee",
        detail: "Email: spsf@sen.ca.gov. Capitol Room 545. Chair: Senator Jesse Arreguín.",
        agents: ["noguchi", "derrick", "urrea", "moua", "rojo"],
        priority: "medium",
      },
    ],
  },
  {
    id: "grandjury",
    num: 13,
    name: "San Joaquin Civil Grand Jury",
    icon: "🏢",
    category: "Local Oversight",
    tasks: [
      {
        id: "gj-complaint",
        label: "File confidential Grand Jury complaint",
        detail: "Complaint Form via sjcourts.org or mail to 180 E. Weber Ave, Stockton. Focus on misuse of county jail beds for unconstitutional state parole holds.",
        agents: ["urrea", "noguchi"],
        priority: "medium",
      },
    ],
  },
  {
    id: "media",
    num: 14,
    name: "Investigative Journalism",
    icon: "📰",
    category: "Public Accountability",
    tasks: [
      {
        id: "media-dossier",
        label: "Prepare and submit documented dossier to regional press",
        detail: "Sacramento Bee (Joe Rubin), Stockton Record (Aaron Leathley). Include filed POST complaints, OIG submissions, OAL petitions, economic sabotage evidence.",
        agents: ["noguchi", "derrick", "urrea", "moua", "rojo"],
        priority: "medium",
      },
      {
        id: "media-tv",
        label: "Pitch story to local TV affiliates",
        detail: "KCRA 3, ABC10, FOX40 — history of broadcasting parole system exposés.",
        agents: ["noguchi", "derrick", "urrea", "moua", "rojo"],
        priority: "low",
      },
    ],
  },
];

const PRIORITY_CONFIG = {
  critical: { label: "CRITICAL", bg: "bg-red-950/60",     border: "border-red-600/70",    text: "text-red-400",    dot: "bg-red-500"    },
  high:     { label: "HIGH",     bg: "bg-orange-950/50",  border: "border-orange-600/60", text: "text-orange-400", dot: "bg-orange-500" },
  medium:   { label: "MEDIUM",   bg: "bg-violet-950/40",  border: "border-violet-600/50", text: "text-violet-400", dot: "bg-violet-500" },
  low:      { label: "LOW",      bg: "bg-slate-900/60",   border: "border-slate-700/30",  text: "text-slate-500",  dot: "bg-slate-600"  },
  done:     { label: "DONE",     bg: "bg-emerald-950/30", border: "border-emerald-800/30",text: "text-emerald-600",dot: "bg-emerald-700" },
};

const STORAGE_KEY = "accountability-tracker-v2";

export default function AccountabilityTracker() {
  const [completedTasks, setCompletedTasks] = useState({});
  const [notes, setNotes] = useState({});
  const [viewMode, setViewMode] = useState("agent"); // "agent" | "vector" | "priority"
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedVector, setSelectedVector] = useState(null);
  const [expandedTasks, setExpandedTasks] = useState({});
  const [editingNote, setEditingNote] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY);
        if (res?.value) {
          const data = JSON.parse(res.value);
          setCompletedTasks(data.completedTasks || {});
          setNotes(data.notes || {});
        }
      } catch (e) { /* first run */ }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        await window.storage.set(STORAGE_KEY, JSON.stringify({ completedTasks, notes }));
      } catch (e) { console.error(e); }
    })();
  }, [completedTasks, notes, loaded]);

  useEffect(() => {
    if (document.getElementById('dc-styles')) return;
    const style = document.createElement('style');
    style.id = 'dc-styles';
    style.textContent = `
.dc-root {
  background-color: #05070f;
  background-image:
    radial-gradient(ellipse 80% 40% at 50% 0%, rgba(30,20,60,0.55) 0%, transparent 70%),
    radial-gradient(ellipse 50% 25% at 50% 0%, rgba(80,20,20,0.18) 0%, transparent 60%),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
}
.dc-title { text-shadow: 0 0 12px rgba(220,38,38,0.7), 0 0 30px rgba(220,38,38,0.3), 0 0 60px rgba(139,0,0,0.2); letter-spacing: 0.12em; }
.dc-title-dot { filter: drop-shadow(0 0 6px rgba(220,38,38,0.9)) drop-shadow(0 0 14px rgba(220,38,38,0.5)); animation: dc-dot-pulse 3s ease-in-out infinite; }
@keyframes dc-dot-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
.dc-header-border { box-shadow: 0 1px 0 0 rgba(100,20,20,0.4), 0 2px 8px 0 rgba(0,0,0,0.6); }
.dc-agent-card { background:rgba(15,12,25,0.6); border:1px solid rgba(51,45,75,0.5); transition:border-color .2s,box-shadow .2s,background .2s; }
.dc-agent-card:hover { background:rgba(20,16,35,0.8); border-color:rgba(100,80,140,0.6); box-shadow:0 0 18px rgba(80,40,120,0.25),0 2px 12px rgba(0,0,0,0.5); }
.dc-vector-card { background:rgba(12,14,22,0.7); border:1px solid rgba(40,45,70,0.5); transition:border-color .2s,box-shadow .2s; }
.dc-vector-card:hover { border-color:rgba(80,100,180,0.4); box-shadow:0 0 16px rgba(60,80,180,0.15),0 2px 10px rgba(0,0,0,0.5); }
.dc-agent-detail { box-shadow:0 0 0 1px rgba(255,255,255,0.04) inset,0 4px 24px rgba(0,0,0,0.5); }
.dc-task-card { transition:box-shadow .15s ease,border-color .15s ease; }
.dc-task-card:hover { box-shadow:0 0 10px rgba(0,0,0,0.4); }
.dc-critical { animation: dc-critical-pulse 2.5s ease-in-out infinite; }
@keyframes dc-critical-pulse {
  0%,100% { box-shadow: 0 0 6px rgba(220,38,38,0.2); }
  50%      { box-shadow: 0 0 18px rgba(220,38,38,0.45), 0 0 4px rgba(180,0,0,0.3), inset 0 0 0 1px rgba(220,38,38,0.08); }
}
.dc-progress-track { box-shadow:inset 0 1px 3px rgba(0,0,0,0.5); background-color:#0d1117 !important; }
.dc-progress-fill { box-shadow:0 0 8px var(--progress-color,#10b981),0 0 2px var(--progress-color,#10b981); transition:width .5s ease,box-shadow .3s ease; }
.dc-progress-global .dc-progress-fill { box-shadow:0 0 10px rgba(180,30,30,0.6),0 0 3px rgba(220,38,38,0.4); }
.dc-tab-active { background:rgba(80,40,100,0.45) !important; color:#e2d4f0 !important; border:1px solid rgba(140,80,180,0.4); box-shadow:0 0 10px rgba(120,60,160,0.2),inset 0 1px 0 rgba(180,120,220,0.1); }
.dc-tab-inactive { color:rgba(120,110,140,0.8); border:1px solid transparent; }
.dc-tab-inactive:hover { color:rgba(200,180,220,0.9); background:rgba(60,40,80,0.3); border-color:rgba(100,70,130,0.2); }
.dc-checkbox-done { box-shadow:0 0 8px rgba(16,185,129,0.5); }
.dc-checkbox-undone:hover { border-color:rgba(180,140,220,0.7) !important; box-shadow:0 0 6px rgba(140,80,180,0.3); }
.dc-note-input:focus { border-color:rgba(120,80,160,0.6) !important; box-shadow:0 0 0 2px rgba(100,60,140,0.15); outline:none; }
.dc-reset-btn:hover { color:rgba(220,38,38,0.8) !important; border-color:rgba(120,20,20,0.5) !important; box-shadow:0 0 8px rgba(180,0,0,0.15); }
.dc-footer { border-top:1px solid rgba(30,20,50,0.6); box-shadow:0 -1px 0 0 rgba(0,0,0,0.5); }
::-webkit-scrollbar{width:6px;height:6px}
::-webkit-scrollbar-track{background:#05070f}
::-webkit-scrollbar-thumb{background:rgba(60,50,90,0.6);border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:rgba(100,80,140,0.8)}
    `;
    document.head.appendChild(style);
  }, []);

  const toggleTask = useCallback((taskId) => {
    setCompletedTasks((prev) => {
      const next = { ...prev };
      if (next[taskId]) delete next[taskId];
      else next[taskId] = Date.now();
      return next;
    });
  }, []);

  const toggleExpand = useCallback((taskId) => {
    setExpandedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  }, []);

  const saveNote = useCallback((taskId) => {
    setNotes((prev) => ({ ...prev, [taskId]: noteInput }));
    setEditingNote(null);
    setNoteInput("");
  }, [noteInput]);

  const allTasks = VECTORS.flatMap((v) =>
    v.tasks.map((t) => ({ ...t, vector: v }))
  );

  const getAgentTasks = (agentId) =>
    allTasks.filter((t) => t.agents.includes(agentId));

  const getStats = (tasks) => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.priority === "done" || completedTasks[t.id]).length;
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
  };

  const globalStats = getStats(allTasks);

  const getAgentStats = (agentId) => getStats(getAgentTasks(agentId));

  const getVectorStats = (vectorId) => {
    const v = VECTORS.find((x) => x.id === vectorId);
    return getStats(v ? v.tasks : []);
  };

  const renderTask = (task, showVector = false, showAgents = false) => {
    const isDone = task.priority === "done" || completedTasks[task.id];
    const isExpanded = expandedTasks[task.id];
    const p = PRIORITY_CONFIG[isDone && task.priority !== "done" ? "done" : task.priority];
    const hasNote = notes[task.id];

    return (
      <div
        key={task.id}
        className={`border rounded-lg mb-2 dc-task-card transition-all duration-200 ${
          isDone
            ? "border-emerald-800/25 bg-emerald-950/15"
            : `${p.border} ${p.bg}${task.priority === "critical" ? " dc-critical" : ""}`
        }`}
      >
        <div className="flex items-start gap-3 p-3 cursor-pointer" onClick={() => toggleExpand(task.id)}>
          <button
            onClick={(e) => { e.stopPropagation(); if (task.priority !== "done") toggleTask(task.id); }}
            className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-all ${
              isDone ? "border-emerald-600 bg-emerald-600 dc-checkbox-done" : "border-slate-600 dc-checkbox-undone"
            }`}
          >
            {isDone && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.4))' }}>
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${p.bg} ${p.text} border ${p.border}`}>
                {p.label}
              </span>
              {showVector && task.vector && (
                <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  {task.vector.icon} {task.vector.name}
                </span>
              )}
              {hasNote && (
                <span className="text-[10px] text-yellow-500">📝</span>
              )}
            </div>
            <p className={`text-sm leading-snug ${isDone ? "line-through text-slate-500" : "text-slate-200"}`}>
              {task.label}
            </p>
            {showAgents && task.agents.length > 0 && (
              <div className="flex gap-1 mt-1.5 flex-wrap">
                {task.agents.map((aId) => {
                  const ag = AGENTS.find((a) => a.id === aId);
                  return (
                    <span
                      key={aId}
                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: ag.color + "22", color: ag.color, border: `1px solid ${ag.color}44` }}
                    >
                      {ag.name.split(" ").pop()}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          <svg
            className={`w-4 h-4 transition-transform flex-shrink-0 mt-1 ${isExpanded ? "rotate-180" : ""}`}
            style={{ color: 'rgba(120,100,160,0.6)' }}
            viewBox="0 0 20 20" fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
          </svg>
        </div>

        {isExpanded && (
          <div className="px-3 pb-3 border-t border-slate-700/50">
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{task.detail}</p>
            {notes[task.id] && editingNote !== task.id && (
              <div className="mt-2 bg-yellow-950/30 border border-yellow-800/40 rounded p-2">
                <div className="flex justify-between items-start">
                  <p className="text-xs text-yellow-300/80 leading-relaxed">{notes[task.id]}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setEditingNote(task.id); setNoteInput(notes[task.id]); }}
                    className="text-[10px] text-yellow-600 hover:text-yellow-400 ml-2 flex-shrink-0"
                  >
                    edit
                  </button>
                </div>
              </div>
            )}
            {editingNote === task.id ? (
              <div className="mt-2 flex gap-1" onClick={(e) => e.stopPropagation()}>
                <input
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveNote(task.id)}
                  placeholder="Add a note..."
                  className="flex-1 text-xs rounded px-2 py-1.5 text-slate-200 placeholder-slate-600 dc-note-input"
                  style={{ background: 'rgba(8,10,20,0.8)', border: '1px solid rgba(60,50,90,0.5)' }}
                  autoFocus
                />
                <button onClick={() => saveNote(task.id)} className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-2 py-1 rounded">
                  Save
                </button>
                <button onClick={() => { setEditingNote(null); setNoteInput(""); }} className="text-xs text-slate-500 hover:text-slate-300 px-1">
                  ✕
                </button>
              </div>
            ) : (
              !notes[task.id] && (
                <button
                  onClick={(e) => { e.stopPropagation(); setEditingNote(task.id); setNoteInput(""); }}
                  className="mt-2 text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
                >
                  + Add note
                </button>
              )
            )}
          </div>
        )}
      </div>
    );
  };

  const ProgressBar = ({ stats, color = "#10b981", height = 6, isGlobal = false }) => (
    <div
      className={`w-full rounded-full overflow-hidden dc-progress-track${isGlobal ? " dc-progress-global" : ""}`}
      style={{ height }}
    >
      <div
        className="h-full rounded-full dc-progress-fill"
        style={{
          width: `${stats.pct}%`,
          background: `linear-gradient(90deg, ${color}cc 0%, ${color} 60%, ${color}dd 100%)`,
          '--progress-color': color,
        }}
      />
    </div>
  );

  const resetAll = () => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      setCompletedTasks({});
      setNotes({});
    }
  };

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#05070f' }}>
        <div className="text-slate-400 animate-pulse">Loading tracker...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-100 dc-root" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace" }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md dc-header-border" style={{ background: 'rgba(5,7,15,0.96)' }}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-bold dc-title">
                <span className="text-red-500 dc-title-dot">◉</span> DARK CLOUD PROTOCOL
              </h1>
              <p className="text-[10px] mt-0.5 uppercase" style={{ color: 'rgba(100,85,120,0.8)', letterSpacing: '0.2em' }}>
                Multi-Vector Administrative Accountability Tracker — Stockton DAPO Unit
              </p>
            </div>
            <button onClick={resetAll} className="text-[10px] transition-colors px-2 py-1 rounded dc-reset-btn" style={{ color: 'rgba(80,70,100,0.7)', border: '1px solid rgba(40,35,60,0.6)' }}>
              Reset
            </button>
          </div>

          {/* Global Progress */}
          <div className="flex items-center gap-3 mb-3">
            <ProgressBar stats={globalStats} height={8} isGlobal={true} />
            <span className="text-xs flex-shrink-0 font-semibold" style={{ color: 'rgba(180,150,180,0.7)' }}>
              {globalStats.done}/{globalStats.total} ({globalStats.pct}%)
            </span>
          </div>

          {/* View Tabs */}
          <div className="flex gap-1">
            {[
              { id: "agent", label: "By Agent" },
              { id: "vector", label: "By Vector" },
              { id: "priority", label: "By Priority" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setViewMode(tab.id); setSelectedAgent(null); setSelectedVector(null); }}
                className={`text-xs px-3 py-1.5 rounded transition-all ${
                  viewMode === tab.id ? "dc-tab-active" : "dc-tab-inactive"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* AGENT VIEW */}
        {viewMode === "agent" && !selectedAgent && (
          <div className="space-y-2">
            {AGENTS.map((agent) => {
              const stats = getAgentStats(agent.id);
              const tasks = getAgentTasks(agent.id);
              const criticalRemaining = tasks.filter(
                (t) => t.priority === "critical" && !completedTasks[t.id]
              ).length;
              return (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className="w-full text-left rounded-lg p-4 dc-agent-card"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: agent.color }} />
                        <span className="font-semibold text-sm">{agent.name}</span>
                        <span className="text-[10px] text-slate-500">{agent.title}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400">{stats.done}/{stats.total}</span>
                      {criticalRemaining > 0 && (
                        <span className="text-[10px] text-red-400 block">{criticalRemaining} critical pending</span>
                      )}
                    </div>
                  </div>
                  <ProgressBar stats={stats} color={agent.color} height={4} />
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {[...new Set(tasks.map((t) => t.vector.icon))].map((icon, i) => (
                      <span key={i} className="text-xs">{icon}</span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {viewMode === "agent" && selectedAgent && (
          <div>
            <button
              onClick={() => setSelectedAgent(null)}
              className="text-xs text-slate-500 hover:text-slate-300 mb-3 flex items-center gap-1"
            >
              ← All Agents
            </button>
            {(() => {
              const agent = AGENTS.find((a) => a.id === selectedAgent);
              const tasks = getAgentTasks(selectedAgent);
              const stats = getAgentStats(selectedAgent);
              return (
                <>
                  <div className="border rounded-lg p-4 mb-4 dc-agent-detail" style={{ borderColor: agent.color + "55", backgroundColor: agent.color + "0d" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: agent.color }} />
                      <h2 className="text-base font-bold">{agent.name}</h2>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{agent.role}</p>
                    <ProgressBar stats={stats} color={agent.color} />
                    <p className="text-[10px] text-slate-500 mt-1">{stats.done} of {stats.total} actions completed ({stats.pct}%)</p>

                    <div className="mt-3 border-t border-slate-700/50 pt-3">
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1.5">Key Allegations</p>
                      <ul className="space-y-1">
                        {agent.allegations.map((a, i) => (
                          <li key={i} className="text-xs text-slate-400 flex gap-2">
                            <span className="text-red-500 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 3px rgba(220,38,38,0.5))' }}>▸</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {VECTORS.filter((v) => v.tasks.some((t) => t.agents.includes(selectedAgent))).map((vector) => {
                    const vTasks = vector.tasks.filter((t) => t.agents.includes(selectedAgent));
                    return (
                      <div key={vector.id} className="mb-4">
                        <h3 className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-2">
                          <span>{vector.icon}</span>
                          <span className="uppercase tracking-wider">Vector {vector.num}: {vector.name}</span>
                          <span className="text-slate-600">({vector.category})</span>
                        </h3>
                        {vTasks.map((t) => renderTask({ ...t, vector }, false, false))}
                      </div>
                    );
                  })}
                </>
              );
            })()}
          </div>
        )}

        {/* VECTOR VIEW */}
        {viewMode === "vector" && !selectedVector && (
          <div className="space-y-2">
            {VECTORS.map((vector) => {
              const stats = getVectorStats(vector.id);
              const isDone = vector.id === "bbs";
              return (
                <button
                  key={vector.id}
                  onClick={() => setSelectedVector(vector.id)}
                  className={`w-full text-left rounded-lg p-4 dc-vector-card ${
                    isDone ? "border-emerald-800/50 bg-emerald-950/20" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{vector.icon}</span>
                      <div>
                        <span className="font-semibold text-sm">Vector {vector.num}: {vector.name}</span>
                        <span className="text-[10px] text-slate-500 block">{vector.category}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs ${isDone ? "text-emerald-400" : "text-slate-400"}`}>
                        {stats.done}/{stats.total}
                      </span>
                      {isDone && <span className="text-[10px] text-emerald-500 block">COMPLETED</span>}
                    </div>
                  </div>
                  <ProgressBar stats={stats} color={isDone ? "#10b981" : "#6366f1"} height={4} />
                </button>
              );
            })}
          </div>
        )}

        {viewMode === "vector" && selectedVector && (
          <div>
            <button
              onClick={() => setSelectedVector(null)}
              className="text-xs text-slate-500 hover:text-slate-300 mb-3 flex items-center gap-1"
            >
              ← All Vectors
            </button>
            {(() => {
              const vector = VECTORS.find((v) => v.id === selectedVector);
              const stats = getVectorStats(selectedVector);
              return (
                <>
                  <div className="border rounded-lg p-4 mb-4 dc-vector-card">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{vector.icon}</span>
                      <h2 className="text-base font-bold">Vector {vector.num}: {vector.name}</h2>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{vector.category}</p>
                    <ProgressBar stats={stats} color="#6366f1" />
                    <p className="text-[10px] text-slate-500 mt-1">{stats.done} of {stats.total} actions completed ({stats.pct}%)</p>
                  </div>
                  {vector.tasks.map((t) => renderTask({ ...t, vector }, false, true))}
                </>
              );
            })()}
          </div>
        )}

        {/* PRIORITY VIEW */}
        {viewMode === "priority" && (
          <div>
            {["critical", "high", "medium", "low", "done"].map((prio) => {
              const tasks = allTasks.filter((t) => {
                if (prio === "done") return t.priority === "done" || completedTasks[t.id];
                return t.priority === prio && !completedTasks[t.id];
              });
              if (tasks.length === 0) return null;
              const p = PRIORITY_CONFIG[prio];
              return (
                <div key={prio} className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${p.dot}`} />
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${p.text}`}>
                      {p.label} ({tasks.length})
                    </h3>
                  </div>
                  {tasks.map((t) => renderTask(t, true, true))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 dc-footer">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <span className="text-[10px] text-slate-600">
            Newanforbi v. CDCR DAPO Stockton — Administrative Accountability Matrix
          </span>
          <span className="text-[10px] text-slate-600">
            {Object.keys(completedTasks).length} actions logged
          </span>
        </div>
      </div>
    </div>
  );
}
