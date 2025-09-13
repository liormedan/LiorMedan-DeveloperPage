import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type Project = {
  title: string;
  description: string;
  href: string;
  image?: string;
  tags?: string[];
};

export default function ProjectCard({ title, description, href, image, tags }: Project) {
  return (
    <Link href={href} target="_blank">
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        {image ? (
          <Image src={image} alt={title} width={800} height={450} className="w-full h-40 object-cover" />
        ) : null}
        <div className="p-4">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          {tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

