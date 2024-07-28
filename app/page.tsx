import { DataTable } from "@/components/data-table";
import { columns } from "@/components/ui/columns";
import { getInternships } from "./getInternships";
import { Suspense } from "react";

export default async function Home() {

  // uncomment to update

  // updateScrape()

  async function InternshipsTable() {
    const internships = await getInternships();

    return <DataTable columns={columns} data={internships} />;
  }

  return (
    <>
      <h1 className="my-4 text-center text-6xl font-bold text-gray-800">EzIntern</h1>
      <div className="w-3/4 m-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <InternshipsTable />
        </Suspense>
      </div>
    </>
  );
}