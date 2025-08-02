import { sanityClient } from "./sanity";

export async function getSanityData<T>(query: string): Promise<T | null> {
  try {
    const data: T = await sanityClient.fetch(query);

    if (!data) {
      console.warn("No data found.");
      return null;
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch data from Sanity:", error);
    return null;
  }
}