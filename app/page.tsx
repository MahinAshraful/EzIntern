import { DataTable } from "@/components/data-table";
import { columns } from "@/components/ui/columns";
import { getInternships } from "./getInternships";
import { Suspense } from "react";
import updateScrape from "./updateScrape";

export default async function Home() {

  const url1 = "https://github.com/ouckah/Summer2025-Internships"
  const url2 = "https://github.com/SimplifyJobs/Summer2025-Internships"


  // updateScrape(url1);
  // setTimeout(() => {
  //   updateScrape(url2);
  // }, 10000); // 10000 milliseconds = 10 seconds

  //uncomment when update ^

  async function InternshipsTable() {
    const internships = await getInternships(); // Fetch data from the server

    return <DataTable columns={columns} data={internships} />;
  }

  return (
    <>
      <div className="bg-slate-800 text-white text-center p-2">
        <p className="text-lg font-semibold">Explore Top 2025 Internships!</p>
      </div>
      <h1 className="my-4 text-center text-6xl font-bold text-gray-800 mt-10 mb-14">EzIntern</h1>
      <div className="w-3/4 m-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <InternshipsTable />
        </Suspense>
      </div>
    </>
  );
}