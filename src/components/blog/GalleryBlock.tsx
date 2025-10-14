import Image from "next/image";

import { getStrapiMedia } from "@/lib/strapi";
import { cn } from "@/lib/utils";

type GalleryImage = {
  id: number;
  attributes?: {
    url?: string;
    alternativeText?: string | null;
    caption?: string | null;
  };
};

type GalleryBlockProps = {
  title?: string | null;
  description?: string | null;
  images?: { data?: GalleryImage[] };
  className?: string;
};

export function GalleryBlock({ title, description, images, className }: GalleryBlockProps) {
  const galleryImages = images?.data ?? [];

  if (galleryImages.length === 0) return null;

  return (
    <section className={cn("space-y-4", className)}>
      {(title || description) && (
        <header className="space-y-2">
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </header>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {galleryImages.map((image) => {
          const url = getStrapiMedia(image.attributes?.url);
          if (!url) return null;

          const alt = image.attributes?.alternativeText ?? "";

          return (
            <figure key={image.id} className="overflow-hidden rounded-2xl border bg-muted/20 shadow-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={url}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {image.attributes?.caption && (
                <figcaption className="p-3 text-xs text-muted-foreground">
                  {image.attributes.caption}
                </figcaption>
              )}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
