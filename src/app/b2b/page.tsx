import { client } from "@/lib/sanity";
import B2BClient from "./B2BClient";

// This tells Next.js to check Sanity for updates every 60 seconds (Incremental Static Regeneration)
export const revalidate = 60; 

export default async function B2BPage() {
  // The GROQ Query: "Get all b2bHospital documents, order them by creation time"
  const query = `*[_type == "b2bHospital"] | order(_createdAt asc)`;
  
  // Fetch the data from the secure Sanity vault
  const hospitalData = await client.fetch(query);

  // Fallback if the database is empty
  if (!hospitalData || hospitalData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] text-[#2A4032] font-manrope">
        Please add B2B data in the Sanity Studio (/admin).
      </div>
    );
  }

  // Pass the live database data into your GSAP animated client UI
  return <B2BClient initialData={hospitalData} />;
}