import { Certificate } from "@/types/certificate";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DotIcon, ExternalLinkIcon } from "lucide-react";

type CertificateCardProps = {
  certificate: Certificate;
};

function getYear(date: string) {
  const d = new Date(date);
  return d.getFullYear();
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <Card
      className="h-full transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg border-2 hover:border-primary/20 group-hover:bg-accent/5 pt-0 overflow-hidden"
      asChild
    >
      <Link
        href={certificate.url || certificate.file!.asset.url}
        className="block h-full group hover:cursor-pointer"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CardHeader className="p-0 relative overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-lg overflow-hidden relative">
            <Image
              src={certificate.imageUrl}
              alt="certificate thumbnail"
              width={450}
              height={300}
              className="w-full"
            />
            <Badge className="absolute top-2 right-2 p-1 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors">
              <ExternalLinkIcon className="size-3 text-foreground group-hover:text-primary-highlighter transition-colors" />
            </Badge>
          </div>
          <div className="flex flex-col gap-2 p-6 pb-0">
            <CardTitle className="text-lg group-hover:text-primary-highlighter transition-colors">
              {certificate.title}
            </CardTitle>
            <CardDescription className="flex items-center text-sm">
              <span>
                <span>{certificate.issuer}</span>
                <DotIcon className="inline" />
                <span>{getYear(certificate.date)}</span>
              </span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {certificate.description}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
