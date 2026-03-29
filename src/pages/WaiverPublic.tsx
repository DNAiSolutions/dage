import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

export default function WaiverPublic() {
  const { formId } = useParams<{ formId: string }>();
  const [formTitle, setFormTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");

  // Signature
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  useEffect(() => {
    async function fetchForm() {
      if (!formId) { setNotFound(true); setLoading(false); return; }
      const { data, error } = await supabase
        .from("waiver_forms")
        .select("id, title, is_active")
        .eq("id", formId)
        .eq("is_active", true)
        .single();
      if (error || !data) {
        setNotFound(true);
      } else {
        setFormTitle(data.title);
      }
      setLoading(false);
    }
    fetchForm();
  }, [formId]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#1a1025";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
  }, [loading]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
    setHasSigned(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSigned) {
      toast.error("Please provide your signature.");
      return;
    }

    setSubmitting(true);
    const signatureData = canvasRef.current?.toDataURL("image/png") || "";

    const { error } = await supabase.from("waiver_submissions").insert({
      form_id: formId!,
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      participant_name: participantName.trim(),
      emergency_contact_name: emergencyName.trim(),
      emergency_contact_phone: emergencyPhone.trim(),
      signature_data: signatureData,
    });

    if (error) {
      toast.error("Failed to submit. Please try again.");
    } else {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">Form Not Found</h1>
          <p className="text-muted-foreground">This waiver form is no longer available.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-sm">
          <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="h-8 w-8 text-secondary" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground mb-2">
            All Set!
          </h1>
          <p className="text-muted-foreground">
            Your waiver has been submitted successfully. Look out for a confirmation soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {formTitle}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Krewe of D.A.G.E. — Please complete all fields below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Card label="Your Information">
            <div className="space-y-4">
              <Field label="Full Name *">
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </Field>
              <Field label="Email *">
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </Field>
              <Field label="Phone">
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </Field>
            </div>
          </Card>

          <Card label="Participant">
            <Field label="Participant Name *">
              <Input
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="Name of the person participating"
                required
              />
            </Field>
          </Card>

          <Card label="Emergency Contact">
            <div className="space-y-4">
              <Field label="Contact Name *">
                <Input value={emergencyName} onChange={(e) => setEmergencyName(e.target.value)} required />
              </Field>
              <Field label="Contact Phone *">
                <Input type="tel" value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)} required />
              </Field>
            </div>
          </Card>

          <Card label="Digital Signature">
            <p className="text-xs text-muted-foreground mb-3">
              By signing below, you agree to the terms and conditions of this waiver.
            </p>
            <div className="relative rounded-lg border-2 border-dashed border-border bg-card">
              <canvas
                ref={canvasRef}
                width={400}
                height={150}
                className="w-full touch-none cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>
            {hasSigned && (
              <Button type="button" variant="ghost" size="sm" onClick={clearSignature} className="mt-2 text-xs">
                Clear Signature
              </Button>
            )}
          </Card>

          <Button type="submit" className="w-full h-12 text-base" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Waiver"}
          </Button>
        </form>
      </div>
    </div>
  );
}

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-soft">
      <h3 className="text-sm font-semibold text-foreground mb-4">{label}</h3>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      {children}
    </div>
  );
}
