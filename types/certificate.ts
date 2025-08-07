import { urlFor } from "@/lib/sanity-image";
import { z } from "zod";

export const CertificateDataSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  issuer: z.string(),
  date: z.string(),
  url: z.string().optional(),
  file: z
    .object({
      asset: z.object({
        url: z.string(),
      }),
    })
    .optional(),
  image: z.unknown().optional(),
});

export const CertificateSchema = CertificateDataSchema.extend({
  imageUrl: z.string(),
});

export type CertificateData = z.infer<typeof CertificateDataSchema>;
export type Certificate = z.infer<typeof CertificateSchema>;

export function processCertificate(data: CertificateData): Certificate {
  return {
    ...data,
    imageUrl: data.image ? urlFor(data.image).width(300).height(200).url() : "",
  };
}

export function processCertificates(data: CertificateData[]): Certificate[] {
  return data.map(processCertificate);
}
