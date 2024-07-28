import axios from "axios";
import * as cheerio from "cheerio";
import { db } from "./firebase";
import { collection, addDoc , getDocs, query , where} from 'firebase/firestore';
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/ui/columns";
import { getInternships } from "./getInternships";
import { Suspense } from "react";
import cleanUrl from "./cleanUrl";
import updateScrape from "./updateScrape";

export default async function Home() {

 // uncomment to update

// updateScrape()

  async function InternshipsTable() {
    const internships = await getInternships();
  
    return <DataTable columns={columns} data={internships} />;
  }

  return (
    <>
    <h1 className=" my-4 text-center text-4xl">EzIntern</h1>
      <div className="w-3/4 m-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <InternshipsTable />
      </Suspense>
    </div>
    </>
  );
}