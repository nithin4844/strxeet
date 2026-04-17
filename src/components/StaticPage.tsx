import Link from "next/link";

interface StaticPageSection {
  title: string;
  body: string[];
}

interface StaticPageProps {
  kicker: string;
  title: string;
  intro: string;
  sections: StaticPageSection[];
  cta?: {
    href: string;
    label: string;
  };
}

export default function StaticPage({
  kicker,
  title,
  intro,
  sections,
  cta,
}: StaticPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <header className="mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-brand-gray-400 mb-4">
          {kicker}
        </p>
        <h1 className="font-display text-5xl sm:text-7xl tracking-widest text-brand-black mb-5">
          {title}
        </h1>
        <p className="text-brand-gray-500 text-base sm:text-lg leading-relaxed max-w-3xl">
          {intro}
        </p>
      </header>

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.title} className="border-t border-brand-gray-100 pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-black mb-4">
              {section.title}
            </h2>
            <div className="space-y-4">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-sm sm:text-base text-brand-gray-500 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {cta && (
        <div className="mt-12 pt-8 border-t border-brand-gray-100">
          <Link href={cta.href} className="btn-primary inline-flex items-center justify-center">
            {cta.label}
          </Link>
        </div>
      )}
    </div>
  );
}
