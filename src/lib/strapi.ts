const DEFAULT_API_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  "https://strapi-cloud-template-blog-491355e3dd--liormedan.repl.co/api";

const DEFAULT_MEDIA_URL =
  process.env.NEXT_PUBLIC_STRAPI_MEDIA_URL || DEFAULT_API_URL.replace(/\/api$/, "");

export function getStrapiURL(path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${DEFAULT_API_URL}${normalizedPath}`;
}

export function getStrapiMedia(url?: string | null) {
  if (!url) return null;
  return url.startsWith("http") ? url : `${DEFAULT_MEDIA_URL}${url}`;
}

type FetchOptions = RequestInit & {
  cache?: RequestCache;
};

export async function fetchStrapi<T>(path: string, options: FetchOptions = {}) {
  const response = await fetch(getStrapiURL(path), {
    cache: "no-store",
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Strapi request failed (${response.status}): ${errorText}`);
  }

  return (await response.json()) as T;
}
