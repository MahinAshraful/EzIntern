"use client"

import { DataTable } from "@/components/data-table";
import { Internships, columns } from "@/components/ui/columns";

const data = [
  {
    id: "728ed52f",
    company: "Puffco",
    role: "Analyst Intern",
    location: "LA",
    application: "https://sensata.wd1.myworkdayjobs.com/en-US/Sensata-Careers/job/Attleboro-Massachusetts/Software-Engineer-Intern---Summer-2025_IRC93689?utm_source=Simplify&ref=Simplify"
  },
  {
    id: "728ed52d",
    company: "TikTok",
    role: "Software Engineer",
    location: "NYC",
    application: "https://sensata.wd1.myworkdayjobs.com/en-US/Sensata-Careers/job/Attleboro-Massachusetts/Software-Engineer-Intern---Summer-2025_IRC93689?utm_source=Simplify&ref=Simplify"
  },
]

export default function Home() {
  return (
    <>
      <div className=" w-3/4 m-auto">
        <DataTable columns={columns} data={data}/>
      </div>
    </>
  );
}
