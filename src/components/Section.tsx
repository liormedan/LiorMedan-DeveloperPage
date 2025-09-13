import { cn } from "@/lib/utils";
import * as React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

export default function Section({ className, ...props }: Props) {
  return <section className={cn("container-fluid py-10", className)} {...props} />;
}

