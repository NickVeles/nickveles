import { urlFor } from "@/lib/sanity-image";

export interface CertificateData {
  _id: string;
  title: string;
  description?: string;
  issuer: string;
  date: string;
  url?: string;
  file?: { asset: { url: string }};
  image?: any;
}

export interface Certificate extends CertificateData {
  imageUrl: string;
}

export function processCertificate(data: CertificateData): Certificate {
  return {
    ...data,
    imageUrl: data.image ? urlFor(data.image).width(300).height(200).url() : ''
  };
}

export function processCertificates(data: CertificateData[]): Certificate[] {
  return data.map(processCertificate);
}