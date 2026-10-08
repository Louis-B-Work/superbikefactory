import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/config/site";
import { sitePathUrl } from "@/lib/deployment";
import { Section } from "./ui";

export interface GuideArticleDetails {
  title: string;
  description: string;
  path: string;
  author: {
    name: string;
    url?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  breadcrumbs: Array<{
    label: string;
    path: string;
  }>;
}

export function guideArticleMetadata(article: GuideArticleDetails): Metadata {
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: sitePathUrl(article.path, site.url) },
  };
}

export function GuideArticle({
  article,
  children,
}: {
  article: GuideArticleDetails;
  children: ReactNode;
}) {
  const articleUrl = sitePathUrl(article.path, site.url);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        mainEntityOfPage: articleUrl,
        author: {
          "@type": "Person",
          name: article.author.name,
          ...(article.author.url ? { url: article.author.url } : {}),
        },
        datePublished: article.publishedAt,
        ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: article.breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: sitePathUrl(item.path, site.url),
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Section className="pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-theme-muted-60">
            {article.breadcrumbs.map((item, index) => {
              const current = index === article.breadcrumbs.length - 1;
              return (
                <li key={item.path} className="flex items-center gap-2">
                  {index > 0 && <span aria-hidden>/</span>}
                  {current ? (
                    <span aria-current="page" className="font-semibold text-theme-ink">
                      {item.label}
                    </span>
                  ) : (
                    <Link href={item.path} className="link-underline hover:text-theme-ink">
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
        <article className="mx-auto mt-10 max-w-3xl">
          <header className="border-b border-theme-line pb-7">
            <h1 className="text-4xl font-bold tracking-tight text-theme-ink sm:text-5xl">{article.title}</h1>
            <p className="mt-4 leading-relaxed text-theme-body/70">{article.description}</p>
            <p className="mt-5 text-sm text-theme-muted-60">
              By <span className="font-semibold text-theme-ink">{article.author.name}</span>
            </p>
          </header>
          <div className="prose-content mt-8">{children}</div>
        </article>
      </Section>
    </>
  );
}
