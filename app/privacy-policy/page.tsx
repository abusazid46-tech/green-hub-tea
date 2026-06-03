import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Privacy Policy", "Privacy policy for Green Hub Assam Tea.", "/privacy-policy");

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy Policy">
      <p>Green Hub collects inquiry details such as name, company, phone, email, quantity, and message so the team can respond to retail, wholesale, distributor, and export requests.</p>
      <p>Inquiry data may be sent through WhatsApp and email based on the action selected by the visitor. Green Hub does not sell visitor information.</p>
      <p>Buyers can contact Green Hub at ethina20@gmail.com to request corrections or removal of inquiry information.</p>
    </PolicyPage>
  );
}

function PolicyPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-brand-cream pt-32 section-padding">
      <div className="container-x max-w-3xl">
        <h1 className="font-display text-5xl text-brand-forest">{title}</h1>
        <div className="mt-8 grid gap-5 text-base leading-8 text-brand-dark/68">{children}</div>
      </div>
    </section>
  );
}
