import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  FileText, Users, CheckCircle2, AlertCircle, Lock,
  Flag, Heart, Crown, BookOpen, Waves, UserPlus, ArrowRight,
} from "lucide-react";
import { format } from "date-fns";

interface Stats {
  totalExpected: number;
  completed: number;
  missing: number;
  recentSubmissions: Array<{
    id: string;
    full_name: string;
    participant_name: string;
    signed_at: string;
  }>;
}

const lockedModules = [
  { title: "Parade Applications", description: "Float captain & rider registration", icon: Flag },
  { title: "Volunteer Forms", description: "Community volunteer signup", icon: UserPlus },
  { title: "Queen Applications", description: "Royal court selection process", icon: Crown },
  { title: "Advisory Board", description: "Board member management", icon: Users },
  { title: "Scholarships", description: "Student scholarship applications", icon: BookOpen },
  { title: "Swimming Program", description: "Youth swimming initiative", icon: Waves },
];

export default function Dashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    totalExpected: 0, completed: 0, missing: 0, recentSubmissions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [expectedRes, submissionsRes, recentRes] = await Promise.all([
        supabase.from("expected_participants").select("id", { count: "exact" }),
        supabase.from("waiver_submissions").select("id", { count: "exact" }),
        supabase
          .from("waiver_submissions")
          .select("id, full_name, participant_name, signed_at")
          .order("signed_at", { ascending: false })
          .limit(5),
      ]);

      const totalExpected = expectedRes.count || 0;
      const completed = submissionsRes.count || 0;

      setStats({
        totalExpected,
        completed,
        missing: Math.max(0, totalExpected - completed),
        recentSubmissions: (recentRes.data || []) as Stats["recentSubmissions"],
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const firstName = profile?.full_name?.split(" ")[0] || "Admin";
  const percent = stats.totalExpected > 0
    ? Math.round((stats.completed / stats.totalExpected) * 100)
    : 0;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white">
          Welcome back, {firstName}
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Here's what's happening with your krewe.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Expected */}
        <div
          className="rounded-xl p-5 flex items-center gap-4"
          style={{ background: "#1c1130", border: "1px solid #2a1a42" }}
        >
          <div
            className="h-11 w-11 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(104,37,140,0.15)" }}
          >
            <Users className="h-5 w-5" style={{ color: "#68258C" }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">
              {loading ? "—" : stats.totalExpected}
            </p>
            <p className="text-xs text-white/40">Expected Riders</p>
          </div>
        </div>

        {/* Completed */}
        <div
          className="rounded-xl p-5 flex items-center gap-4"
          style={{ background: "#1c1130", border: "1px solid #2a1a42" }}
        >
          <div
            className="h-11 w-11 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(15,169,88,0.12)" }}
          >
            <CheckCircle2 className="h-5 w-5" style={{ color: "#0FA958" }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">
              {loading ? "—" : stats.completed}
            </p>
            <p className="text-xs text-white/40">Completed Waivers</p>
          </div>
        </div>

        {/* Missing */}
        <div
          className="rounded-xl p-5 flex items-center gap-4"
          style={{ background: "#1c1130", border: "1px solid #2a1a42" }}
        >
          <div
            className="h-11 w-11 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(239,68,68,0.1)" }}
          >
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">
              {loading ? "—" : stats.missing}
            </p>
            <p className="text-xs text-white/40">Missing Waivers</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#1c1130", border: "1px solid #2a1a42" }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-white/70">Waiver Completion</span>
          <span className="text-sm font-bold" style={{ color: "#F2B705" }}>{percent}%</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "#2a1a42" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percent}%`,
              background: "linear-gradient(90deg, #68258C, #F2B705)",
            }}
          />
        </div>
      </div>

      {/* CTA + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waiver Management */}
        <div
          className="rounded-xl p-6"
          style={{ background: "#1c1130", border: "1px solid #2a1a42" }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <FileText className="h-5 w-5" style={{ color: "#F2B705" }} />
            <h3 className="text-lg font-heading font-semibold text-white">
              Waiver Management
            </h3>
          </div>
          <p className="text-sm text-white/40 mb-5">
            View submissions, manage your waiver form, and track participant progress.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/portal/waivers")}
              className="text-sm font-medium"
              style={{ background: "#68258C", color: "#fff" }}
            >
              View Waivers
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/portal/tracker")}
              className="text-sm font-medium border-white/10 text-white/60 hover:text-white hover:bg-white/5"
            >
              View Tracker
            </Button>
          </div>
        </div>

        {/* Recent Submissions */}
        <div
          className="rounded-xl p-6"
          style={{ background: "#1c1130", border: "1px solid #2a1a42" }}
        >
          <h3 className="text-lg font-heading font-semibold text-white mb-4">
            Recent Submissions
          </h3>
          {stats.recentSubmissions.length === 0 ? (
            <p className="text-sm text-white/30">No submissions yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg"
                  style={{ background: "#0d0714" }}
                >
                  <div>
                    <p className="text-sm font-medium text-white/90">{sub.participant_name}</p>
                    <p className="text-[11px] text-white/30">by {sub.full_name}</p>
                  </div>
                  <span className="text-[11px] text-white/25">
                    {format(new Date(sub.signed_at), "MMM d, h:mm a")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Coming Soon Modules */}
      <div>
        <h2 className="text-lg font-heading font-semibold text-white mb-4">
          Coming Soon
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedModules.map((mod) => (
            <div
              key={mod.title}
              className="rounded-xl p-5 opacity-50 hover:opacity-70 transition-opacity"
              style={{ background: "#1c1130", border: "1px dashed #2a1a42" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "#0d0714" }}
                >
                  <mod.icon className="h-5 w-5 text-white/20" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white/60">{mod.title}</p>
                  <p className="text-[11px] text-white/25 mt-0.5">{mod.description}</p>
                </div>
                <Lock className="h-4 w-4 text-white/15 shrink-0" />
              </div>
              <div className="mt-3">
                <span
                  className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(242,183,5,0.08)", color: "rgba(242,183,5,0.5)" }}
                >
                  Coming Soon
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
