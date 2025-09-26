import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import { CodeSnippetBlock } from "@/components/blog/CodeSnippetBlock";
import { QuoteBlock } from "@/components/blog/QuoteBlock";
import { GalleryBlock } from "@/components/blog/GalleryBlock";
import { RichTextContent } from "@/components/blog/RichTextContent";

type MediaAttributes = {
  url?: string;
  alternativeText?: string | null;
  caption?: string | null;
};

type Media = {
  data?: {
    attributes?: MediaAttributes;
  };
};

type CodeSnippet = {
  id: number;
  title?: string | null;
  language?: string | null;
  filename?: string | null;
  code: string;
};

type Quote = {
  id: number;
  text: string;
  author?: string | null;
  sourceUrl?: string | null;
};

type Gallery = {
  title?: string | null;
  description?: string | null;
  images?: { data?: Array<{ id: number; attributes?: MediaAttributes }> };
};

type Seo = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  ogImage?: Media;
};

type Author = {
  data?: {
    attributes?: {
      name?: string;
      bio?: string | null;
      avatar?: Media;
    };
  };
};

type Tag = {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
};

type PostAttributes = {
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  publishedAt: string;
  coverImage?: Media;
  gallery?: Gallery | null;
  codeBlocks?: CodeSnippet[];
  quotes?: Quote[];
  seo?: Seo | null;
  tags?: { data: Tag[] };
  author?: Author;
};

type PostEntry = {
  id: number;
  attributes: PostAttributes;
};

type StrapiSinglePostResponse = {
  data?: PostEntry[];
};

async function getPost(slug: string) {
  const query =
    `/posts?filters[slug][$eq]=${slug}` +
    "&populate[coverImage]=*" +
    "&populate[gallery][populate]=images" +
    "&populate[codeBlocks]=*" +
    "&populate[quotes]=*" +
    "&populate[seo][populate]=ogImage" +
    "&populate[tags]=*" +
    "&populate[author][populate]=avatar";

  const { data }: StrapiSinglePostResponse = await fetchStrapi(query);
  return data?.[0] ?? null;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {};
  }

  const { seo, excerpt, title } = post.attributes;
  const ogImageUrl = getStrapiMedia(seo?.ogImage?.data?.attributes?.url);

  return {
    title: seo?.metaTitle ?? title,
    description: seo?.metaDescription ?? excerpt ?? undefined,
    alternates: seo?.canonicalUrl ? { canonical: seo.canonicalUrl } : undefined,
    openGraph: ogImageUrl
      ? {
          title: seo?.metaTitle ?? title,
          description: seo?.metaDescription ?? excerpt ?? undefined,
          images: [ogImageUrl],
        }
      : undefined,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const { attributes } = post;
  const coverUrl = getStrapiMedia(attributes.coverImage?.data?.attributes?.url);
  const coverAlt =
    attributes.coverImage?.data?.attributes?.alternativeText ?? attributes.title;
  const authorName = attributes.author?.data?.attributes?.name;
  const authorBio = attributes.author?.data?.attributes?.bio;
  const authorAvatar = getStrapiMedia(
    attributes.author?.data?.attributes?.avatar?.data?.attributes?.url
  );
  const tags = attributes.tags?.data ?? [];
  const codeBlocks = attributes.codeBlocks ?? [];
  const quotes = attributes.quotes ?? [];

  return (
    <div className="container py-12" dir="rtl">
      <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
        ← חזרה לבלוג
      </Link>

      <article className="mx-auto mt-6 max-w-3xl space-y-10">
        <header className="space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">{attributes.title}</h1>
            {attributes.excerpt && (
              <p className="text-lg text-muted-foreground">{attributes.excerpt}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <time dateTime={attributes.publishedAt}>
              {new Date(attributes.publishedAt).toLocaleDateString("he-IL", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {authorName && <span>מאת {authorName}</span>}
          </div>

          {coverUrl && (
            <div className="relative overflow-hidden rounded-3xl border bg-muted/30">
              <Image
                src={coverUrl}
                alt={coverAlt}
                width={1200}
                height={630}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </header>

        <RichTextContent html={attributes.content} className="text-lg" />

        {quotes.length > 0 && (
          <section className="space-y-6">
            {quotes.map((quote) => (
              <QuoteBlock
                key={quote.id}
                text={quote.text}
                author={quote.author}
                sourceUrl={quote.sourceUrl}
              />
            ))}
          </section>
        )}

        {codeBlocks.length > 0 && (
          <section className="space-y-6">
            {codeBlocks.map((block) => (
              <CodeSnippetBlock
                key={block.id}
                title={block.title}
                language={block.language}
                filename={block.filename}
                code={block.code}
              />
            ))}
          </section>
        )}

        {attributes.gallery && (
          <GalleryBlock
            title={attributes.gallery.title}
            description={attributes.gallery.description}
            images={attributes.gallery.images}
          />
        )}

        {tags.length > 0 && (
          <footer className="flex flex-wrap justify-center gap-2 text-sm">
            {tags.map((tag) => (
              <span key={tag.id} className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                #{tag.attributes.name}
              </span>
            ))}
          </footer>
        )}

        {(authorName || authorBio || authorAvatar) && (
          <aside className="mt-10 flex flex-col items-center gap-4 rounded-3xl border bg-muted/20 p-6 text-center">
            {authorAvatar && (
              <Image
                src={authorAvatar}
                alt={authorName ?? "מחבר"}
                width={80}
                height={80}
                className="h-20 w-20 rounded-full object-cover"
              />
            )}
            <div className="space-y-2">
              {authorName && <h3 className="text-lg font-semibold">{authorName}</h3>}
              {authorBio && <p className="text-sm text-muted-foreground">{authorBio}</p>}
            </div>
          </aside>
        )}
      </article>
    </div>
  );
}
