import { useId, type ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-sm text-foreground/90">
        {label}
      </Label>
      {children}
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  hint,
  type = "text",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  hint?: string;
  type?: string;
}) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} {...(hint ? { hint } : {})}>
      <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="bg-surface" />
    </Field>
  );
}

export function AreaField({
  label,
  value,
  onChange,
  hint,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  rows?: number;
}) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} {...(hint ? { hint } : {})}>
      <Textarea id={id} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="bg-surface leading-relaxed" />
    </Field>
  );
}
