import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Search, UserPlus, CheckCircle2, Clock, Users, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface Participant {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  status: string;
  created_at: string;
}

export default function AdminTracker() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [loading, setLoading] = useState(true);
  const [formId, setFormId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: forms } = await supabase
      .from("waiver_forms")
      .select("id")
      .eq("is_active", true)
      .limit(1)
      .single();

    if (forms) {
      setFormId(forms.id);
      const { data } = await supabase
        .from("expected_participants")
        .select("*")
        .eq("form_id", forms.id)
        .order("created_at", { ascending: false });
      setParticipants((data || []) as Participant[]);
    }
    setLoading(false);
  }

  async function addParticipant(e: React.FormEvent) {
    e.preventDefault();
    if (!formId || !newName.trim() || !newEmail.trim()) return;

    const { error } = await supabase.from("expected_participants").insert({
      form_id: formId,
      full_name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim() || null,
    });

    if (error) {
      toast.error("Failed to add participant");
    } else {
      toast.success("Participant added!");
      setNewName("");
      setNewEmail("");
      setNewPhone("");
      setAddOpen(false);
      fetchData();
    }
  }

  const completed = participants.filter((p) => p.status === "completed").length;
  const pending = participants.filter((p) => p.status === "pending").length;
  const total = participants.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const filtered = participants.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.full_name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q);
    const matchesFilter = filter === "all" || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  const filterButtons = [
    { key: "all" as const, label: "All" },
    { key: "completed" as const, label: "Completed" },
    { key: "pending" as const, label: "Missing" },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-gray-900">Waiver Tracker</h1>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button style={{ background: "#68258C" }} className="text-white">
              <UserPlus className="h-4 w-4 mr-1.5" />
              Add Participant
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-gray-200 text-gray-900">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Add Expected Participant</DialogTitle>
            </DialogHeader>
            <form onSubmit={addParticipant} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-gray-600">Full Name *</Label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  required
                  className="bg-gray-50 border-gray-200 text-gray-900"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-600">Email *</Label>
                <Input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  required
                  className="bg-gray-50 border-gray-200 text-gray-900"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-gray-600">Phone</Label>
                <Input
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="bg-gray-50 border-gray-200 text-gray-900"
                />
              </div>
              <Button
                type="submit"
                className="w-full text-white"
                style={{ background: "#68258C" }}
              >
                Add Participant
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
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
            <p className="text-2xl font-bold text-gray-900">{total}</p>
            <p className="text-xs text-gray-400">Total Expected</p>
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
            <p className="text-2xl font-bold text-gray-900">{completed}</p>
            <p className="text-xs text-gray-400">Completed</p>
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
            <p className="text-2xl font-bold text-gray-900">{pending}</p>
            <p className="text-xs text-gray-400">Missing</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div
        className="rounded-xl p-5"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">Completion Progress</span>
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

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-6 pb-4">
          <h3 className="text-lg font-heading font-semibold text-gray-900">Participants</h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-300"
              />
            </div>
            <div className="flex gap-1">
              {filterButtons.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={
                    filter === f.key
                      ? { background: "#68258C", color: "#fff" }
                      : { background: "transparent", color: "rgba(0,0,0,0.4)" }
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          {loading ? (
            <p className="text-sm text-gray-300">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-gray-300 text-center py-8">
              {total === 0 ? "No participants added yet. Click 'Add Participant' to start." : "No results found."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">Name</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">Email</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">Phone</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">Status</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3">Added</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => (
                    <tr
                      key={p.id}
                      className="hover:bg-gray-50 transition-colors"
                      style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f1f5f9" : "none" }}
                    >
                      <td className="py-3 pr-4">
                        <span className="text-sm font-medium text-gray-700">{p.full_name}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-sm text-gray-500">{p.email}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-sm text-gray-400">{p.phone || "—"}</span>
                      </td>
                      <td className="py-3 pr-4">
                        {p.status === "completed" ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: "#0FA958" }}>
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-400">
                            <Clock className="h-3.5 w-3.5" />
                            Missing
                          </span>
                        )}
                      </td>
                      <td className="py-3">
                        <span className="text-[12px] text-gray-400">
                          {format(new Date(p.created_at), "MMM d, yyyy")}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
