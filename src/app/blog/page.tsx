import Image from "next/image";
import Link from "next/link";
import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";

type Media = {
  data?: {
    attributes?: {
      url?: string;
      alternativeText?: string | null;
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

type Author = {
  data?: {
    attributes?: {
      name?: string;
    };
  };
};

type Post = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt?: string | null;
    publishedAt: string;
    coverImage?: Media;
    tags?: { data: Tag[] };
    author?: Author;
  };
};

type StrapiPostResponse = {
  data: Post[];
};

export default async function BlogPage() {
  const { data }: StrapiPostResponse = await fetchStrapi(
    "/posts?populate[coverImage]=*&populate[tags]=*&populate[author]=*&sort=publishedAt:desc"
  );

  const posts = data ?? [];

  return (
    <div className="container py-12" dir="rtl">
      <div className="mb-10 space-y-2 text-center">
        <h1 className="text-4xl font-bold">בלוג הפיתוח</h1>
        <p className="text-muted-foreground">עדכונים מאחורי הקלעים על בניית הבלוג והפרויקט</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => {
          const coverUrl = getStrapiMedia(post.attributes.coverImage?.data?.attributes?.url);
          const alt = post.attributes.coverImage?.data?.attributes?.alternativeText ?? post.attributes.title;
          const authorName = post.attributes.author?.data?.attributes?.name;
          const postTags = post.attributes.tags?.data ?? [];

          return (
            <article
              key={post.id}
              className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md"
            >
              {coverUrl && (
                <Link href={`/blog/${post.attributes.slug}`}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={coverUrl}
                      alt={alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                </Link>
              )}

              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {new Date(post.attributes.publishedAt).toLocaleDateString("he-IL")}
                  </span>
                  {authorName && <span>{authorName}</span>}
                </div>

                <header className="space-y-2">
                  <Link href={`/blog/${post.attributes.slug}`} className="block">
                    <h2 className="text-xl font-semibold leading-tight hover:text-primary">
                      {post.attributes.title}
                    </h2>
                  </Link>
                  {post.attributes.excerpt && (
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {post.attributes.excerpt}
                    </p>
                  )}
                </header>

                {postTags.length > 0 && (
                  <ul className="mt-auto flex flex-wrap gap-2 text-xs text-primary">
                    {postTags.map((tag) => (
                      <li key={tag.id} className="rounded-full bg-primary/10 px-3 py-1">
                        #{tag.attributes.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          );
        })}
        {posts.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground">
            אין עדיין פוסטים זמינים. בקרוב נעדכן!
          </div>
        )}
      </div>
    </div>
  );
}
