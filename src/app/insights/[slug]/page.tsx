import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User } from "lucide-react";
import { INSIGHTS } from "@/lib/insights";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export function generateStaticParams() {
  return INSIGHTS.map((insight) => ({ slug: insight.id }));
}

export default function InsightArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const insight = INSIGHTS.find((i) => i.id === params.slug);

  if (!insight) {
    notFound();
  }

  return (
    <>
      <Navbar transparentOnTop={false} />
      <main className="min-h-screen pt-32">
        <article className="mx-auto max-w-2xl px-6 pb-24">
          <Link
            href="/#insights"
            className="mb-8 flex w-fit items-center gap-1.5 text-sm font-medium text-[rgb(var(--muted))] transition-colors hover:text-[rgb(var(--foreground))]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Insights
          </Link>

          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-bull">
            {insight.category}
          </span>
          <h1 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-[rgb(var(--foreground))] sm:text-4xl">
            {insight.title}
          </h1>

          <div className="mt-5 flex items-center gap-4 text-xs text-[rgb(var(--muted))]">
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              By {insight.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {insight.readTime}
            </span>
          </div>

          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Image
              src={insight.image}
              alt={insight.imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, 700px"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-10 flex flex-col gap-8">
            {insight.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="mb-3 text-xl font-semibold text-[rgb(var(--foreground))]">
                    {section.heading}
                  </h2>
                )}
                <div className="flex flex-col gap-4">
                  {section.paragraphs.map((paragraph, j) => (
                    <p
                      key={j}
                      className="text-justify leading-relaxed text-[rgb(var(--muted))]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl glass-surface glass-border p-6">
            <p className="text-justify text-sm leading-relaxed text-[rgb(var(--muted))]">
              This piece is educational and general in nature, it isn&apos;t
              personalized financial advice, and nothing here should be read
              as a recommendation to buy or sell any specific asset.
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
