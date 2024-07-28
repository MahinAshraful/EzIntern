import axios from "axios";
import * as cheerio from "cheerio";
import { db } from "./firebase";
import { collection, addDoc , getDocs, query , where} from 'firebase/firestore';
import { DataTable } from "@/components/data-table";
import { Internships, columns } from "@/components/ui/columns";

const data = [
  {
    company: "Puffco",
    role: "Analyst Intern",
    location: "LA",
    application: "https://sensata.wd1.myworkdayjobs.com/en-US/Sensata-Careers/job/Attleboro-Massachusetts/Software-Engineer-Intern---Summer-2025_IRC93689?utm_source=Simplify&ref=Simplify"
  },
  {
    company: "TikTok",
    role: "Software Engineer",
    location: "NYC",
    application: "https://sensata.wd1.myworkdayjobs.com/en-US/Sensata-Careers/job/Attleboro-Massachusetts/Software-Engineer-Intern---Summer-2025_IRC93689?utm_source=Simplify&ref=Simplify"
  },
]

export default async function Home() {
  axios.get("https://github.com/SimplifyJobs/Summer2025-Internships").then(async (response) => {
    const $ = cheerio.load(response.data); // Load the HTML using Cheerio
    const trElements = $("tr"); // Select all <tr> elements

    const collectionRef = collection(db, "internships");

    // Use async function in .each callback
    await Promise.all(trElements.map(async (index, element) => {
      const tds = $(element).find("td"); // Find all <td> elements within each <tr>

      if (tds.length >= 4) { // Ensure there are at least 4 <td> elements
        const firstTd = $(tds[0]).text().trim();
        const secondTd = $(tds[1]).text().trim();
        const thirdTd = $(tds[2]).text().trim();

        // For the fourth <td>, extract both the text and the link URL
        const fourthTdElement = $(tds[3]);
        const fourthTdLink = fourthTdElement.find("a").attr("href"); // Extract the href attribute

        // Log the four values, including the link
        console.log(`${firstTd}, ${secondTd}, ${thirdTd}, (${fourthTdLink})`);

// Check if fourthTdLink is defined
if (fourthTdLink) {
  // Create a query to check for existing document based on fourthTdLink
  const querySnapshot = await getDocs(query(collectionRef, where("firstTd", "==", firstTd)));

  // If no documents found, add the new document
  if (querySnapshot.empty) {
    try {
      await addDoc(collectionRef, {
        firstTd: firstTd,
        secondTd: secondTd,
        thirdTd: thirdTd,
        fourthTdLink: fourthTdLink
      });
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  } else {
    console.log("Document with firstTd already exists.");
  }
} else {
  console.warn(`Skipping row ${index} due to undefined link.`);
}
        
      }
    }));
  });





  return (
    <>
      <div className=" w-3/4 m-auto">
        <DataTable columns={columns} data={data}/>
      </div>
    </>
  );
}