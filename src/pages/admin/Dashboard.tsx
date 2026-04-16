import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useAdminTheme } from "@/components/admin/AdminLayout";
import {
  Users, CheckCircle2, AlertCircle, FileText, Circle,
} from "lucide-react";

interface Stats {
  totalExpected: number;
  completed: number;
  missing: number;
  waiverForms: number;
}

const milestones = [
  { label: "Homepage & Public Site", done: true },
  { label: "Online Waiver System", done: true },
  { label: "Admin Dashboard", done: true },
  { label: "Parade Applications", done: false },
  { label: "Volunteer Forms", done: false },
  { label: "Scholarship Portal", done: false },
];

const notes = [
  { title: "Portal Live", color: "#0FA958", text: "Admin portal is now accessible to team members" },
  { title: "Next Step", color: "#F2B705", text: "Launch waiver form and begin collecting submissions" },
];

export default function AdminDashboard() {
  const { profile } = useAuth();
  const theme = useAdminTheme();
  const isDark = theme === "dark";

  const [stats, setStats] = useState<Stats>({ totalExpected: 0, completed: 0, missing: 0, waiverForms: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [expectedRes, submissionsRes, formsRes] = await Promise.all([
        supabase.from("expected_participants").select("id", { count: "exact" }),
        supabase.from("waiver_submissions").select("id", { count: "exact" }),
        supabase.from("waiver_forms").select("id", { count: "exact" }).eq("is_active", true),
      ]);
      const totalExpected = expectedRes.count || 0;
      const completed = submissionsRes.count || 0;
      setStats({
        totalExpected,
        completed,
        missing: Math.max(0, totalExpected - completed),
        waiverForms: formsRes.count || 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const firstName = profile?.full_name?.split(" ")[0] || "Admin";

  const cardBg = isDark ? "#1c1130" : "#ffffff";
  const cardBdr = isDark ? "1px solid #2a1a42" : "1px solid #e2e8f0";
  const textPri = isDark ? "rgba(255,255,255,0.9)" : "#111827";
  const textSec = isDark ? "rgba(255,255,255,0.6)" : "#6b7280";
  const textMuted = isDark ? "rgba(255,255,255,0.4)" : "#9ca3af";

  const statCards = [
    { label: "Expected Riders", value: stats.totalExpected, icon: Users, iconBg: "rgba(104,37,140,0.15)", iconColor: "#68258C" },
    { label: "Completed Waivers", value: stats.completed, icon: CheckCircle2, iconBg: "rgba(15,169,88,0.15)", iconColor: "#0FA958" },
    { label: "Missing Waivers", value: stats.missing, icon: AlertCircle, iconBg: "rgba(239,68,68,0.12)", iconColor: "#ef4444" },
    { label: "Waiver Forms", value: stats.waiverForms, icon: FileText, iconBg: "rgba(242,183,5,0.15)", iconColor: "#F2B705" },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-display font-bold" style={{ color: textPri }}>
          Welcome back, {firstName}
        </h1>
        <p className="text-sm mt-1" style={{ color: textMuted }}>
          Here's what's happening with your krewe.
        </p>
      </div>

      {/* Stats Row — 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-xl p-5 flex items-start justify-between" style={{ background: cardBg, border: cardBdr }}>
            <div>
              <p className="text-xs font-medium mb-2" style={{ color: textMuted }}>{card.label}</p>
              <p className="text-3xl font-bold" style={{ color: textPri }}>{loading ? "—" : card.value}</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center shrink-0" style={{ background: card.iconBg }}>
              <card.icon className="h-5 w-5" style={{ color: card.iconColor }} />
            </div>
          </div>
        ))}
      </div>

      {/* Two-column: MVP Progress + Quick Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MVP Progress */}
        <div className="rounded-xl p-6" style={{ background: cardBg, border: cardBdr }}>
          <h3 className="text-lg font-heading font-semibold mb-5" style={{ color: textPri }}>
            MVP Progress
          </h3>
          <div className="space-y-4">
            {milestones.map((m) => (
              <div key={m.label} className="flex items-center gap-3">
                {m.done ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: "#0FA958" }} />
                ) : (
                  <Circle className="h-5 w-5 shrink-0" style={{ color: isDark ? "rgba(255,255,255,0.2)" : "#d1d5db" }} />
                )}
                <span className="text-sm" style={{ color: m.done ? textPri : textMuted, textDecoration: m.done ? "line-through" : "none" }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Notes */}
        <div className="rounded-xl p-6" style={{ background: cardBg, border: cardBdr }}>
          <h3 className="text-lg font-heading font-semibold mb-5" style={{ color: textPri }}>
            Quick Notes
          </h3>
          <div className="space-y-4">
            {notes.map((n) => (
              <div key={n.title} className="rounded-lg p-4" style={{ background: isDark ? "#0d0714" : "#f8f9fa" }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: n.color }} />
                  <span className="text-sm font-semibold" style={{ color: textPri }}>{n.title}</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: textSec }}>{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
