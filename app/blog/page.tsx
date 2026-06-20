import { BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Assam Tea Knowledge Center",
  "Assam tea guides covering benefits, Green Tea, Black Tea, brewing methods, CTC Tea, and why Assam tea is world famous.",
  "/blog"
);

export default function BlogPage() {
  return (
    <section className="min-h-screen bg-brand-cream pt-32 section-padding">
      <div className="container-x">
        <SectionHeading eyebrow="Tea Knowledge Center" title="Guides for premium customers and professional tea buyers." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.slug}>
              <CardContent>
                <BookOpen className="h-6 w-6 text-brand-gold" />
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand-forest">{post.minutes}</p>
                <h2 className="mt-3 font-display text-3xl leading-tight text-brand-forest">{post.title}</h2>
                <p className="mt-4 text-sm leading-7 text-brand-dark/64">{post.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
