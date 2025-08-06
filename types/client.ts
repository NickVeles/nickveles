import { urlFor } from "@/lib/sanity-image";

export interface ClientData {
  _id: string;
  name: string;
  personTitle?: string;
  logo?: any;
  fullImage?: any;
  website?: string;
}

export interface Client extends ClientData {
  resolvedLogo?: string;
  resolvedFullImage?: string;
}

export function processClient(data: ClientData): Client {
  return {
    ...data,
    resolvedLogo: data.logo ? urlFor(data.logo).width(64).height(64).url() : undefined,
    resolvedFullImage: data.fullImage ? urlFor(data.fullImage).width(114).height(64).url() : undefined,
  };
}

export function processClients(data: ClientData[]): Client[] {
  return data.map(processClient);
}