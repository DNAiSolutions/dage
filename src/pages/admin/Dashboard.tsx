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

export default function AdminDashboard() {
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
        <h1 className="text-2xl font-display font-bold text-gray-900">
          Welcome back, {firstName}
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Here's what's happening with your krewe.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          className="rounded-xl p-5 flex items-center gap-4"
          style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
        >
          <div
            className="h-11 w-11 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(104,37,140,0.1)" }}
          >
            <Users className="h-5 w-5" style={{ color: "#68258C" }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {loading ? "—" : stats.totalExpected}
            </p>
            <p className="text-xs text-gray-400">Expected Riders</p>
          </div>
        </div>

        <div
          className="rounded-xl p-5 flex items-center gap-4"
          style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
        >
          <div
            className="h-11 w-11 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(15,169,88,0.1)" }}
          >
            <CheckCircle2 className="h-5 w-5" style={{ color: "#0FA958" }} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {loading ? "—" : stats.completed}
            </p>
            <p className="text-xs text-gray-400">Completed Waivers</p>
          </div>
        </div>

        <div
          className="rounded-xl p-5 flex items-center gap-4"
          style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
        >
          <div
            className="h-11 w-11 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(239,68,68,0.08)" }}
          >
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {loading ? "—" : stats.missing}
            </p>
            <p className="text-xs text-gray-400">Missing Waivers</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">Waiver Completion</span>
          <span className="text-sm font-bold" style={{ color: "#68258C" }}>{percent}%</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "#e2e8f0" }}>
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
        <div
          className="rounded-xl p-6"
          style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <FileText className="h-5 w-5" style={{ color: "#68258C" }} />
            <h3 className="text-lg font-heading font-semibold text-gray-900">
              Waiver Management
            </h3>
          </div>
          <p className="text-sm text-gray-400 mb-5">
            View submissions, manage your waiver form, and track participant progress.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/admin/waivers")}
              className="text-sm font-medium"
              style={{ background: "#68258C", color: "#fff" }}
            >
              View Waivers
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/admin/tracker")}
              className="text-sm font-medium border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            >
              View Tracker
            </Button>
          </div>
        </div>

        <div
          className="rounded-xl p-6"
          style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
        >
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
            Recent Submissions
          </h3>
          {stats.recentSubmissions.length === 0 ? (
            <p className="text-sm text-gray-300">No submissions yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg"
                  style={{ background: "#f8f9fa" }}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">{sub.participant_name}</p>
                    <p className="text-[11px] text-gray-400">by {sub.full_name}</p>
                  </div>
                  <span className="text-[11px] text-gray-300">
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
        <h2 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Coming Soon
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedModules.map((mod) => (
            <div
              key={mod.title}
              className="rounded-xl p-5 opacity-50 hover:opacity-70 transition-opacity"
              style={{ background: "#ffffff", border: "1px dashed #e2e8f0" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: "#f1f5f9" }}
                >
                  <mod.icon className="h-5 w-5 text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-500">{mod.title}</p>
                  <p className="text-[11px] text-gray-300 mt-0.5">{mod.description}</p>
                </div>
                <Lock className="h-4 w-4 text-gray-200 shrink-0" />
              </div>
              <div className="mt-3">
                <span
                  className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(104,37,140,0.06)", color: "rgba(104,37,140,0.5)" }}
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
