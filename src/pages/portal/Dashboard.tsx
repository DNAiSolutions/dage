import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  FileText, Users, CheckCircle2, AlertCircle, Lock,
  Flag, Heart, Crown, BookOpen, Waves, UserPlus
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

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Welcome back, {firstName} 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Here's what's happening with your krewe.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {loading ? "—" : stats.totalExpected}
                </p>
                <p className="text-xs text-muted-foreground">Expected Riders</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {loading ? "—" : stats.completed}
                </p>
                <p className="text-xs text-muted-foreground">Completed Waivers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {loading ? "—" : stats.missing}
                </p>
                <p className="text-xs text-muted-foreground">Missing Waivers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Waiver Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              View submissions, manage your waiver form, and track participant progress.
            </p>
            <div className="flex gap-3">
              <Button onClick={() => navigate("/portal/waivers")}>
                View Waivers
              </Button>
              <Button variant="outline" onClick={() => navigate("/portal/tracker")}>
                View Tracker
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentSubmissions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No submissions yet.</p>
            ) : (
              <div className="space-y-3">
                {stats.recentSubmissions.map((sub) => (
                  <div key={sub.id} className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-medium text-foreground">{sub.participant_name}</p>
                      <p className="text-xs text-muted-foreground">by {sub.full_name}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(sub.signed_at), "MMM d, h:mm a")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Locked Modules */}
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground mb-4">
          Coming Soon
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lockedModules.map((mod) => (
            <Card
              key={mod.title}
              className="relative overflow-hidden border-dashed opacity-75 hover:opacity-90 transition-opacity"
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <mod.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{mod.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{mod.description}</p>
                  </div>
                  <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                </div>
                <div className="mt-3">
                  <span className="inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-accent-foreground">
                    Coming Soon
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
