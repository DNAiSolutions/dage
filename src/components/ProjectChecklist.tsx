import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, Circle, Menu, X } from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  type: "content" | "photo" | "decision" | "info";
}

interface ChecklistSection {
  id: string;
  title: string;
  icon: string;
  items: ChecklistItem[];
  expanded: boolean;
}

const initialSections: ChecklistSection[] = [
  {
    id: "branding",
    title: "Branding & General",
    icon: "🎨",
    expanded: false,
    items: [
      { id: "b1", label: "Legal organization name confirmed", checked: false, type: "info" },
      { id: "b2", label: "Tagline / motto confirmed", checked: false, type: "content" },
      { id: "b3", label: "Logo files provided (PNG, SVG, white version)", checked: false, type: "photo" },
      { id: "b4", label: "Brand colors confirmed (hex codes)", checked: false, type: "info" },
      { id: "b5", label: "Brand fonts specified", checked: false, type: "info" },
      { id: "b6", label: "Domain name confirmed", checked: false, type: "decision" },
      { id: "b7", label: "Social media links provided (Facebook, Instagram)", checked: false, type: "info" },
    ],
  },
  {
    id: "homepage",
    title: "Homepage",
    icon: "🏠",
    expanded: false,
    items: [
      { id: "h1", label: "Hero headline confirmed or updated", checked: false, type: "content" },
      { id: "h2", label: "Hero gallery photos provided (5–8)", checked: false, type: "photo" },
      { id: "h3", label: "Video for video section (file or link)", checked: false, type: "photo" },
      { id: "h4", label: "Parade Riders stat confirmed", checked: false, type: "info" },
      { id: "h5", label: "Scholarships Awarded stat confirmed", checked: false, type: "info" },
      { id: "h6", label: "Years Active stat confirmed", checked: false, type: "info" },
      { id: "h7", label: "Volunteers stat confirmed", checked: false, type: "info" },
    ],
  },
  {
    id: "about",
    title: "About Page",
    icon: "📖",
    expanded: false,
    items: [
      { id: "a1", label: "\"Our Story\" narrative provided or confirmed", checked: false, type: "content" },
      { id: "a2", label: "Founder name(s) and titles provided", checked: false, type: "info" },
      { id: "a3", label: "About page photos provided (1–3)", checked: false, type: "photo" },
      { id: "a4", label: "Core values confirmed or revised", checked: false, type: "content" },
      { id: "a5", label: "Value descriptions confirmed or rewritten", checked: false, type: "content" },
    ],
  },
  {
    id: "parade",
    title: "Parade Page",
    icon: "🎭",
    expanded: false,
    items: [
      { id: "p1", label: "Parade season/year confirmed", checked: false, type: "info" },
      { id: "p2", label: "Parade date, time & route provided", checked: false, type: "info" },
      { id: "p3", label: "Captain/rider signup process confirmed", checked: false, type: "content" },
      { id: "p4", label: "Registration fees provided (captain & rider)", checked: false, type: "info" },
      { id: "p5", label: "Application form link or build request", checked: false, type: "decision" },
      { id: "p6", label: "Parade photos provided (3–5)", checked: false, type: "photo" },
      { id: "p7", label: "Parade theme for current year", checked: false, type: "content" },
    ],
  },
  {
    id: "royalcourt",
    title: "Royal Court Page",
    icon: "👑",
    expanded: false,
    items: [
      { id: "r1", label: "Decision: Include Royal Court page?", checked: false, type: "decision" },
      { id: "r2", label: "Court member names & titles provided", checked: false, type: "info" },
      { id: "r3", label: "Court member photos provided (1 each)", checked: false, type: "photo" },
      { id: "r4", label: "Court member bios provided (optional)", checked: false, type: "content" },
      { id: "r5", label: "Decision: Include past Royal Courts archive?", checked: false, type: "decision" },
    ],
  },
  {
    id: "scholarships",
    title: "Scholarships Page",
    icon: "🎓",
    expanded: false,
    items: [
      { id: "s1", label: "Scholarship program name confirmed", checked: false, type: "info" },
      { id: "s2", label: "Award amount(s) confirmed", checked: false, type: "info" },
      { id: "s3", label: "Number of annual scholarships confirmed", checked: false, type: "info" },
      { id: "s4", label: "Eligibility requirements confirmed/updated", checked: false, type: "content" },
      { id: "s5", label: "Important dates confirmed (open, deadline, winners)", checked: false, type: "info" },
      { id: "s6", label: "Application form link or build request", checked: false, type: "decision" },
      { id: "s7", label: "Past recipients info/photos (optional)", checked: false, type: "photo" },
    ],
  },
  {
    id: "ball",
    title: "Masquerade Ball Page",
    icon: "✨",
    expanded: false,
    items: [
      { id: "bl1", label: "Official ball/gala name confirmed", checked: false, type: "info" },
      { id: "bl2", label: "Date, time & venue details provided", checked: false, type: "info" },
      { id: "bl3", label: "Dress code confirmed", checked: false, type: "content" },
      { id: "bl4", label: "Evening description provided", checked: false, type: "content" },
      { id: "bl5", label: "RSVP / ticket purchase method provided", checked: false, type: "decision" },
      { id: "bl6", label: "Ticket prices provided", checked: false, type: "info" },
      { id: "bl7", label: "Ball photos provided (3–5)", checked: false, type: "photo" },
    ],
  },
  {
    id: "volunteer",
    title: "Volunteer Page",
    icon: "🤝",
    expanded: false,
    items: [
      { id: "v1", label: "Volunteer opportunities listed", checked: false, type: "content" },
      { id: "v2", label: "Signup method confirmed (form, email, phone)", checked: false, type: "decision" },
      { id: "v3", label: "Volunteer form link or build request", checked: false, type: "decision" },
      { id: "v4", label: "Volunteer testimonials/photos (optional)", checked: false, type: "photo" },
    ],
  },
  {
    id: "contact",
    title: "Contact Page",
    icon: "📬",
    expanded: false,
    items: [
      { id: "c1", label: "Address confirmed", checked: false, type: "info" },
      { id: "c2", label: "Email address confirmed", checked: false, type: "info" },
      { id: "c3", label: "Phone number confirmed", checked: false, type: "info" },
      { id: "c4", label: "Office hours confirmed", checked: false, type: "info" },
      { id: "c5", label: "Contact form — where to send submissions", checked: false, type: "decision" },
      { id: "c6", label: "Google Map embed — yes or no", checked: false, type: "decision" },
    ],
  },
  {
    id: "donate",
    title: "Donate Page",
    icon: "💜",
    expanded: false,
    items: [
      { id: "d1", label: "501(c)(3) status confirmed", checked: false, type: "info" },
      { id: "d2", label: "Payment methods provided (PayPal, CashApp, etc.)", checked: false, type: "decision" },
      { id: "d3", label: "Donation tiers confirmed or adjusted", checked: false, type: "content" },
      { id: "d4", label: "Automated tax receipt — yes or no", checked: false, type: "decision" },
    ],
  },
  {
    id: "events",
    title: "Events / Calendar",
    icon: "📅",
    expanded: false,
    items: [
      { id: "e1", label: "All upcoming events listed with details", checked: false, type: "content" },
      { id: "e2", label: "Decision: Client self-service event updates?", checked: false, type: "decision" },
    ],
  },
  {
    id: "extras",
    title: "Additional Features",
    icon: "⚡",
    expanded: false,
    items: [
      { id: "x1", label: "Decision: Photo gallery / media page?", checked: false, type: "decision" },
      { id: "x2", label: "Decision: Sponsor/partner logos section?", checked: false, type: "decision" },
      { id: "x3", label: "Sponsor logos provided (if yes)", checked: false, type: "photo" },
      { id: "x4", label: "Decision: Blog / news section?", checked: false, type: "decision" },
      { id: "x5", label: "Decision: Membership registration?", checked: false, type: "decision" },
      { id: "x6", label: "Decision: Online store / merch?", checked: false, type: "decision" },
      { id: "x7", label: "Any additional notes or vision from client", checked: false, type: "content" },
    ],
  },
];

const typeColors: Record<string, { bg: string; text: string; label: string }> = {
  content: { bg: "bg-purple-100", text: "text-purple-700", label: "Content" },
  photo: { bg: "bg-amber-100", text: "text-amber-700", label: "Photo/Asset" },
  decision: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Decision" },
  info: { bg: "bg-blue-100", text: "text-blue-700", label: "Info" },
};

const STORAGE_KEY = "dage-project-checklist";

export default function ProjectChecklist() {
  const [isOpen, setIsOpen] = useState(false);
  const [sections, setSections] = useState<ChecklistSection[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return initialSections;
        }
      }
    }
    return initialSections;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
  }, [sections]);

  const toggleSection = (sectionId: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, expanded: !s.expanded } : s))
    );
  };

  const toggleItem = (sectionId: string, itemId: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((i) =>
                i.id === itemId ? { ...i, checked: !i.checked } : i
              ),
            }
          : s
      )
    );
  };

  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
  const checkedItems = sections.reduce(
    (acc, s) => acc + s.items.filter((i) => i.checked).length,
    0
  );
  const progressPercent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  const getSectionProgress = (section: ChecklistSection) => {
    const total = section.items.length;
    const done = section.items.filter((i) => i.checked).length;
    return { total, done, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  const resetAll = () => {
    if (window.confirm("Reset all checklist items? This cannot be undone.")) {
      setSections(initialSections);
    }
  };

  return (
    <>
      {/* Floating Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 left-6 z-[9999] flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
          !isOpen ? "animate-checklist-glow" : ""
        }`}
        style={{
          width: isOpen ? "48px" : "60px",
          height: isOpen ? "48px" : "60px",
          background: "linear-gradient(135deg, #5B2C8E 0%, #7B3FA0 100%)",
          color: "#FFD700",
          border: "2px solid #FFD700",
          boxShadow: !isOpen
            ? "0 0 15px rgba(242, 183, 5, 0.5), 0 0 30px rgba(91, 44, 142, 0.4)"
            : "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        {isOpen ? <X size={20} /> : <span className="text-2xl">📋</span>}
        {!isOpen && (
          <span
            className="absolute -top-1 -right-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: "#FFD700", color: "#5B2C8E" }}
          >
            {progressPercent}%
          </span>
        )}
      </button>

      {/* Pop-up Panel from Bottom Right */}
      <div
        className={`fixed bottom-20 right-6 z-[9998] transition-all duration-300 ease-in-out origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        }`}
        style={{ width: "400px", maxWidth: "90vw", maxHeight: "80vh" }}
      >
        <div
          className="flex flex-col shadow-2xl rounded-2xl overflow-hidden"
          style={{ background: "#1a1025", border: "2px solid #FFD700", maxHeight: "80vh" }}
        >
          {/* Header */}
          <div
            className="p-5 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #5B2C8E 0%, #3D1A6E 100%)",
              borderBottom: "2px solid #FFD700",
            }}
          >
            <h2
              className="text-lg font-bold tracking-wide mb-1"
              style={{ color: "#FFD700", fontFamily: "serif" }}
            >
              📋 D.A.G.E. Build Checklist
            </h2>
            <p className="text-xs" style={{ color: "#c9a8e8" }}>
              Track content, photos & decisions
            </p>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: "#c9a8e8" }}>
                  {checkedItems} of {totalItems} items
                </span>
                <span style={{ color: "#FFD700", fontWeight: "bold" }}>
                  {progressPercent}%
                </span>
              </div>
              <div
                className="w-full h-2.5 rounded-full overflow-hidden"
                style={{ background: "#2d1f3d" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progressPercent}%`,
                    background:
                      progressPercent === 100
                        ? "linear-gradient(90deg, #2ECC71, #27AE60)"
                        : "linear-gradient(90deg, #FFD700, #F0B400)",
                  }}
                />
              </div>
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(typeColors).map(([key, val]) => (
                <span
                  key={key}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${val.bg} ${val.text}`}
                >
                  {val.label}
                </span>
              ))}
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ scrollbarWidth: "thin" }}>
            {sections.map((section) => {
              const prog = getSectionProgress(section);
              const isComplete = prog.done === prog.total;

              return (
                <div
                  key={section.id}
                  className="rounded-lg overflow-hidden"
                  style={{
                    background: isComplete ? "#1a2e1a" : "#241832",
                    border: isComplete ? "1px solid #2ECC7155" : "1px solid #3d2a55",
                  }}
                >
                  {/* Section Header */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-left transition-colors hover:bg-white/5"
                  >
                    <span className="text-base">{section.icon}</span>
                    <span
                      className="flex-1 text-sm font-semibold"
                      style={{ color: isComplete ? "#2ECC71" : "#e8d5f5" }}
                    >
                      {section.title}
                    </span>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: isComplete ? "#2ECC7133" : "#FFD70022",
                        color: isComplete ? "#2ECC71" : "#FFD700",
                      }}
                    >
                      {prog.done}/{prog.total}
                    </span>
                    {section.expanded ? (
                      <ChevronDown size={14} style={{ color: "#c9a8e8" }} />
                    ) : (
                      <ChevronRight size={14} style={{ color: "#c9a8e8" }} />
                    )}
                  </button>

                  {/* Section Items */}
                  {section.expanded && (
                    <div className="px-3 pb-3 space-y-1.5">
                      {/* Mini progress bar */}
                      <div
                        className="w-full h-1 rounded-full overflow-hidden mb-2"
                        style={{ background: "#3d2a55" }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${prog.percent}%`,
                            background: isComplete ? "#2ECC71" : "#FFD700",
                          }}
                        />
                      </div>

                      {section.items.map((item) => {
                        const tc = typeColors[item.type];
                        return (
                          <button
                            key={item.id}
                            onClick={() => toggleItem(section.id, item.id)}
                            className="w-full flex items-start gap-2.5 px-2.5 py-2 rounded-md text-left transition-all hover:bg-white/5"
                            style={{
                              background: item.checked ? "#1a2e1a55" : "transparent",
                            }}
                          >
                            {item.checked ? (
                              <CheckCircle2
                                size={16}
                                className="flex-shrink-0 mt-0.5"
                                style={{ color: "#2ECC71" }}
                              />
                            ) : (
                              <Circle
                                size={16}
                                className="flex-shrink-0 mt-0.5"
                                style={{ color: "#5a4070" }}
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <span
                                className="text-xs leading-tight block"
                                style={{
                                  color: item.checked ? "#2ECC71aa" : "#d4c5e5",
                                  textDecoration: item.checked ? "line-through" : "none",
                                }}
                              >
                                {item.label}
                              </span>
                            </div>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${tc.bg} ${tc.text}`}
                            >
                              {tc.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div
            className="flex-shrink-0 p-3 flex gap-2"
            style={{ borderTop: "1px solid #3d2a55", background: "#1a1025" }}
          >
            <button
              onClick={() =>
                setSections((prev) => prev.map((s) => ({ ...s, expanded: true })))
              }
              className="flex-1 text-xs font-semibold py-2 rounded-md transition-colors hover:bg-white/10"
              style={{ color: "#c9a8e8", border: "1px solid #3d2a55" }}
            >
              Expand All
            </button>
            <button
              onClick={() =>
                setSections((prev) => prev.map((s) => ({ ...s, expanded: false })))
              }
              className="flex-1 text-xs font-semibold py-2 rounded-md transition-colors hover:bg-white/10"
              style={{ color: "#c9a8e8", border: "1px solid #3d2a55" }}
            >
              Collapse All
            </button>
            <button
              onClick={resetAll}
              className="flex-1 text-xs font-semibold py-2 rounded-md transition-colors hover:bg-red-900/30"
              style={{ color: "#e74c3c", border: "1px solid #5a2020" }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9997] bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
