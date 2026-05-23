"use client";

import { NextStudio } from "next-sanity/studio";
// This imports the configuration file that Sanity automatically generated in your root folder
import config from "../../../../sanity.config"; 

export default function AdminPage() {
  return (
    <div className="h-screen w-full">
      <NextStudio config={config} />
    </div>
  );
}