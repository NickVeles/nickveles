import Link, { LinkProps } from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type TextLinkProps = LinkProps & {
  href: string;
  isIcon?: boolean;
  isUncolored?: boolean;
  target?: string;
  className?: string;
  children: React.ReactNode;
};

export default function TextLink({
  href,
  isIcon,
  isUncolored,
  target,
  className,
  children,
  ...props
}: TextLinkProps) {
  return (
    <Link
      className={cn("hover:underline", isUncolored ? "" : "text-accent-foreground visited:text-primary-highlighter", className)}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      translate="no"
      {...props}
    >
      {children}
      {isIcon && <ExternalLinkIcon size={16} className="inline align-baseline" />}
    </Link>
  );
}
