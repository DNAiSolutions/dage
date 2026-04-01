import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, ExternalLink, Copy, Edit2, Check, X } from "lucide-react";
import { format } from "date-fns";

interface WaiverForm {
  id: string;
  title: string;
  is_active: boolean;
}

interface Submission {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  participant_name: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  signed_at: string;
}

export default function AdminWaivers() {
  const [form, setForm] = useState<WaiverForm | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data: forms } = await supabase
      .from("waiver_forms")
      .select("id, title, is_active")
      .eq("is_active", true)
      .limit(1)
      .single();

    if (forms) {
      setForm(forms);
      setTitleDraft(forms.title);
      const { data: subs } = await supabase
        .from("waiver_submissions")
        .select("id, full_name, email, phone, participant_name, emergency_contact_name, emergency_contact_phone, signed_at")
        .eq("form_id", forms.id)
        .order("signed_at", { ascending: false });
      setSubmissions((subs || []) as Submission[]);
    }
    setLoading(false);
  }

  const saveTitle = async () => {
    if (!form || !titleDraft.trim()) return;
    const { error } = await supabase
      .from("waiver_forms")
      .update({ title: titleDraft.trim() })
      .eq("id", form.id);
    if (error) {
      toast.error("Failed to update title");
    } else {
      setForm({ ...form, title: titleDraft.trim() });
      toast.success("Title updated");
    }
    setEditingTitle(false);
  };

  const publicUrl = form ? `${window.location.origin}/waiver/${form.id}` : "";

  const filtered = submissions.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.full_name.toLowerCase().includes(q) ||
      s.participant_name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold text-gray-900">Waivers</h1>
      </div>

      {/* Form Settings */}
      {form && (
        <div
          className="rounded-xl p-6"
          style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
        >
          <div className="mb-4">
            {editingTitle ? (
              <div className="flex items-center gap-2">
                <Input
                  value={titleDraft}
                  onChange={(e) => setTitleDraft(e.target.value)}
                  className="max-w-sm bg-gray-50 border-gray-200 text-gray-900"
                />
                <button
                  onClick={saveTitle}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-green-500 hover:bg-green-50 transition"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setEditingTitle(false)}
                  className="h-8 w-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-heading font-semibold text-gray-900">
                  {form.title}
                </h3>
                <button
                  onClick={() => setEditingTitle(true)}
                  className="h-7 w-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-gray-500 hover:bg-gray-100 transition"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm flex-1 min-w-0"
              style={{ background: "#f8f9fa", border: "1px solid #e2e8f0" }}
            >
              <ExternalLink className="h-4 w-4 text-gray-300 shrink-0" />
              <span className="truncate text-gray-400">{publicUrl}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              onClick={() => {
                navigator.clipboard.writeText(publicUrl);
                toast.success("Link copied!");
              }}
            >
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              Copy Link
            </Button>
            <Button
              size="sm"
              onClick={() => window.open(publicUrl, "_blank")}
              style={{ background: "#68258C" }}
              className="text-white"
            >
              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
              Open Form
            </Button>
          </div>
        </div>
      )}

      {/* Submissions */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0" }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-6 pb-4">
          <h3 className="text-lg font-heading font-semibold text-gray-900">
            Submissions
            <span className="ml-2 text-sm font-normal text-gray-300">
              ({submissions.length})
            </span>
          </h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-300"
            />
          </div>
        </div>

        <div className="px-6 pb-6">
          {loading ? (
            <p className="text-sm text-gray-300">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-gray-300 text-center py-8">
              {submissions.length === 0 ? "No submissions yet." : "No results found."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">
                      Participant
                    </th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">
                      Submitted By
                    </th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">
                      Email
                    </th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">
                      Emergency Contact
                    </th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-3">
                      Signed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sub, i) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-gray-50 transition-colors"
                      style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f1f5f9" : "none" }}
                    >
                      <td className="py-3 pr-4">
                        <span className="text-sm font-medium text-gray-700">{sub.participant_name}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-sm text-gray-500">{sub.full_name}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className="text-sm text-gray-500">{sub.email}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <div>
                          <p className="text-sm text-gray-500">{sub.emergency_contact_name}</p>
                          <p className="text-[11px] text-gray-300">{sub.emergency_contact_phone}</p>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-[12px] text-gray-400">
                          {format(new Date(sub.signed_at), "MMM d, yyyy h:mm a")}
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
