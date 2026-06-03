import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center"
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <Badge>{eyebrow}</Badge>
      <h2 className="mt-4 font-display text-4xl leading-tight text-brand-forest md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-brand-dark/68 md:text-lg">{text}</p> : null}
    </div>
  );
}
