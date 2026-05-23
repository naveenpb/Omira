import { createClient } from "next-sanity";

// We create a read-only client to fetch data securely on the server
export const client = createClient({
  projectId: "90iqxz3z", // Look in your sanity.config.ts to find this string
  dataset: "production",
  apiVersion: "2024-01-01", 
  useCdn: false, // Set to false so you always get the freshest data during Phase 1
});