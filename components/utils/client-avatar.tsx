import Client from "@/types/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";
import { Button } from "../ui/button";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

type ClientAvatarProps = {
  client: Client;
  className?: string;
  avatarClassName?: string;
  fallbackClassName?: string;
  hideWebsite?: boolean;
};

export default function ClientAvatar({
  client,
  className,
  avatarClassName,
  fallbackClassName,
  hideWebsite,
}: ClientAvatarProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      <Avatar className={cn("size-16", avatarClassName)}>
        <AvatarImage
          src={client.resolvedLogo}
          alt={client.name}
        />
        <AvatarFallback
          className={cn(
            "bg-primary text-primary-foreground text-lg font-semibold",
            fallbackClassName
          )}
        >
          {getInitials(client.name)}
        </AvatarFallback>
      </Avatar>

      {client.website && !hideWebsite && (
        <Button
          variant="secondary"
          size="icon"
          className="absolute -top-1 -right-1 size-6 p-1"
          asChild
        >
          <Link
            href={client.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="client's website"
          >
            <ExternalLinkIcon className="size-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}
