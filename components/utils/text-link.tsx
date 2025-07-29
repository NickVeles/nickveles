import Link from "next/link";
import { IconExternalLink } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

type TextLinkProps = {
  href: string;
  isIcon?: boolean;
  target?: string;
  className?: string;
  children: React.ReactNode;
};

export default function TextLink({
  href,
  isIcon,
  target,
  className,
  children,
}: TextLinkProps) {
  return (
    <Link
      className={cn("text-link visited:text-accent hover:underline", className)}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      translate="no"
    >
      {children}
      {isIcon && <IconExternalLink size={16} className="inline align-text-top" />}
    </Link>
  );
}
