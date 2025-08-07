import { urlFor } from "@/lib/sanity-image";
import { z } from 'zod';

export const ClientDataSchema = z.object({
  _id: z.string(),
  name: z.string(),
  personTitle: z.string().optional(),
  logo: z.unknown().optional(),
  fullImage: z.unknown().optional(),
  website: z.string().optional(),
});

export const ClientSchema = ClientDataSchema.extend({
  logoUrl: z.string().optional(),
  fullImageUrl: z.string().optional(),
});

export type ClientData = z.infer<typeof ClientDataSchema>;
export type Client = z.infer<typeof ClientSchema>;

export function processClient(data: ClientData): Client {
  return {
    ...data,
    logoUrl: data.logo ? urlFor(data.logo).width(64).height(64).url() : undefined,
    fullImageUrl: data.fullImage ? urlFor(data.fullImage).width(114).height(64).url() : undefined,
  };
}

export function processClients(data: ClientData[]): Client[] {
  return data.map(processClient);
}