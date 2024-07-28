import axios from "axios";
import * as cheerio from "cheerio";
import { db } from "./firebase";
import { collection, addDoc , getDocs, query , where} from 'firebase/firestore';
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/ui/columns";
import { getInternships } from "./getInternships";
import { Suspense } from "react";

export default async function Home() {

  function cleanUrl(url:any) {
    // Remove the 'https://' prefix
    let cleanedUrl = url.replace('https://', '');
    cleanedUrl = cleanedUrl.replace('www.', '');
  
    // Find the position of the last dot in the domain portion
    const firstSlashIndex = cleanedUrl.indexOf('/');
    const domain = firstSlashIndex !== -1 ? cleanedUrl.substring(0, firstSlashIndex) : cleanedUrl;
    const lastDotIndex = domain.lastIndexOf('.');
  
    // Extract the portion of the string up to the last dot in the domain
    cleanedUrl = cleanedUrl.substring(0, lastDotIndex);
  
    return cleanedUrl;
  }

  axios.get("https://github.com/ouckah/Summer2025-Internships").then(
    async (response) => {
      const $ = cheerio.load(response.data); // Load the HTML using Cheerio
      const trElements = $("tr"); // Select all <tr> elements
  
      const collectionRef = collection(db, "internships");
  
      // Use async function in .each callback
      await Promise.all(
        trElements.map(async (index, element) => {
          const tds = $(element).find("td"); // Find all <td> elements within each <tr>
  
          if (tds.length >= 4) { // Ensure there are at least 4 <td> elements
            const firstTd = $(tds[0]).text().trim().toUpperCase(); // Convert to uppercase immediately
            const secondTd = $(tds[1]).text().trim();
            const thirdTd = $(tds[2]).text().trim();
  
            // For the fourth <td>, extract both the text and the link URL
            const fourthTdElement = $(tds[3]);
            const fourthTdLink = fourthTdElement.find("a").attr("href"); // Extract the href attribute
  
            // Log the four values, including the link (optional)
            console.log(`${firstTd}, ${secondTd}, ${thirdTd}, (${fourthTdLink})`);
  
            if (firstTd !== "") {
              if (fourthTdLink) {
                // Check for existing documents (case-insensitive) based on firstTd
                const querySnapshot = await getDocs(
                  query(collectionRef, where("firstTd", "==", firstTd))
                );
  
                if (querySnapshot.empty) {
                  // Additional check for "↳" rows using cleaned URL
                  if (firstTd === "↳") {
                    const cleanedUrl = cleanUrl(fourthTdLink);
                    console.log("Cleaned URL:", cleanedUrl); // Add logging for debugging
  
                    const urlQuerySnapshot = await getDocs(
                      query(collectionRef, where("firstTd", "==", cleanedUrl.toUpperCase()))
                    );
  
                    if (urlQuerySnapshot.empty) {
                      const dataToInsert = {
                        firstTd: cleanedUrl.toUpperCase(), // Directly assign cleaned URL for "↳" rows
                        secondTd,
                        thirdTd,
                        fourthTdLink,
                      };
                      try {
                        await addDoc(collectionRef, dataToInsert);
                        console.log("Document successfully written!");
                      } catch (error) {
                        console.error("Error writing document:", error);
                      }
                    } else {
                      console.log("Document with similar firstTd (from cleaned URL) already exists.");
                    }
                  } else {
                    // Normal case: insert document
                    const dataToInsert = {
                      firstTd,
                      secondTd,
                      thirdTd,
                      fourthTdLink,
                    };
                    try {
                      await addDoc(collectionRef, dataToInsert);
                      console.log("Document successfully written!");
                    } catch (error) {
                      console.error("Error writing document:", error);
                    }
                  }
                } else {
                  console.log("Document with similar firstTd already exists.");
                }
              } else {
                console.warn(`Skipping row ${index} due to undefined link.`);
              }
            } else {
              console.log("First cell (company) is empty.");
            }
          }
        })
      );
    }
  );
  





  axios.get("https://github.com/SimplifyJobs/Summer2025-Internships").then(
    async (response) => {
      const $ = cheerio.load(response.data); // Load the HTML using Cheerio
      const trElements = $("tr"); // Select all <tr> elements
  
      const collectionRef = collection(db, "internships");
  
      // Use async function in .each callback
      await Promise.all(
        trElements.map(async (index, element) => {
          const tds = $(element).find("td"); // Find all <td> elements within each <tr>
  
          if (tds.length >= 4) { // Ensure there are at least 4 <td> elements
            const firstTd = $(tds[0]).text().trim().toUpperCase(); // Convert to uppercase immediately
            const secondTd = $(tds[1]).text().trim();
            const thirdTd = $(tds[2]).text().trim();
  
            // For the fourth <td>, extract both the text and the link URL
            const fourthTdElement = $(tds[3]);
            const fourthTdLink = fourthTdElement.find("a").attr("href"); // Extract the href attribute
  
            // Log the four values, including the link (optional)
            console.log(`${firstTd}, ${secondTd}, ${thirdTd}, (${fourthTdLink})`);
  
            if (firstTd !== "") {
              if (fourthTdLink) {
                // Check for existing documents (case-insensitive) based on firstTd
                const querySnapshot = await getDocs(
                  query(collectionRef, where("firstTd", "==", firstTd))
                );
  
                if (querySnapshot.empty) {
                  // Additional check for "↳" rows using cleaned URL
                  if (firstTd === "↳") {
                    const cleanedUrl = cleanUrl(fourthTdLink);
                    console.log("Cleaned URL:", cleanedUrl); // Add logging for debugging
  
                    const urlQuerySnapshot = await getDocs(
                      query(collectionRef, where("firstTd", "==", cleanedUrl.toUpperCase()))
                    );
  
                    if (urlQuerySnapshot.empty) {
                      const dataToInsert = {
                        firstTd: cleanedUrl.toUpperCase(), // Directly assign cleaned URL for "↳" rows
                        secondTd,
                        thirdTd,
                        fourthTdLink,
                      };
                      try {
                        await addDoc(collectionRef, dataToInsert);
                        console.log("Document successfully written!");
                      } catch (error) {
                        console.error("Error writing document:", error);
                      }
                    } else {
                      console.log("Document with similar firstTd (from cleaned URL) already exists.");
                    }
                  } else {
                    // Normal case: insert document
                    const dataToInsert = {
                      firstTd,
                      secondTd,
                      thirdTd,
                      fourthTdLink,
                    };
                    try {
                      await addDoc(collectionRef, dataToInsert);
                      console.log("Document successfully written!");
                    } catch (error) {
                      console.error("Error writing document:", error);
                    }
                  }
                } else {
                  console.log("Document with similar firstTd already exists.");
                }
              } else {
                console.warn(`Skipping row ${index} due to undefined link.`);
              }
            } else {
              console.log("First cell (company) is empty.");
            }
          }
        })
      );
    }
  );








  async function InternshipsTable() {
    const internships = await getInternships();
  
    return <DataTable columns={columns} data={internships} />;
  }

  return (
    <>
      <div className="w-3/4 m-auto">
      <Suspense fallback={<div>Loading...</div>}>
        <InternshipsTable />
      </Suspense>
    </div>
    </>
  );
}