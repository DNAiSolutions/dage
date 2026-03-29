import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
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

export default function Waivers() {
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
        <h1 className="text-2xl font-display font-bold text-foreground">Waivers</h1>
      </div>

      {/* Form Settings */}
      {form && (
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-3">
              {editingTitle ? (
                <div className="flex items-center gap-2 flex-1">
                  <Input
                    value={titleDraft}
                    onChange={(e) => setTitleDraft(e.target.value)}
                    className="max-w-sm"
                  />
                  <Button size="icon" variant="ghost" onClick={saveTitle}>
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => setEditingTitle(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{form.title}</CardTitle>
                  <Button size="icon" variant="ghost" onClick={() => setEditingTitle(true)}>
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-sm flex-1 min-w-0">
                <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate text-muted-foreground">{publicUrl}</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(publicUrl);
                  toast.success("Link copied!");
                }}
              >
                <Copy className="h-3.5 w-3.5 mr-1.5" />
                Copy Link
              </Button>
              <Button size="sm" onClick={() => window.open(publicUrl, "_blank")}>
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Open Form
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submissions */}
      <Card className="shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Submissions ({submissions.length})
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              {submissions.length === 0 ? "No submissions yet." : "No results found."}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Participant</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Emergency Contact</TableHead>
                    <TableHead>Signed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.participant_name}</TableCell>
                      <TableCell>{sub.full_name}</TableCell>
                      <TableCell>{sub.email}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{sub.emergency_contact_name}</p>
                          <p className="text-xs text-muted-foreground">{sub.emergency_contact_phone}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(sub.signed_at), "MMM d, yyyy h:mm a")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
