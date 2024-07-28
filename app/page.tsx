import { DataTable } from "@/components/data-table";
import { columns } from "@/components/ui/columns";
import { getInternships } from "./getInternships";
import { Suspense } from "react";
import Script from "next/script";

export default async function Home() {

  // uncomment to update

  // updateScrape()

  async function InternshipsTable() {
    const internships = await getInternships();

    return <DataTable columns={columns} data={internships} />;
  }

  return (
    <>
      <Script async strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-JV0RDRGKZD"></Script>
  <Script>
    {
      `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-JV0RDRGKZD');
      `
    }
    
  </Script>
      <h1 className="my-4 text-center text-6xl font-bold text-gray-800 mt-20 mb-14">EzIntern</h1>
      <div className="w-3/4 m-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <InternshipsTable />
        </Suspense>
      </div>

    </>
  );
}