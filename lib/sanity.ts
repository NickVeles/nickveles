import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.SANITY_ID!,
  dataset: process.env.SANITY_DS!,
  apiVersion: "2025-07-26",
  useCdn: true,
});