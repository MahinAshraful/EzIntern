import axios from "axios";
import * as cheerio from "cheerio";
import { db } from "./firebase";
import { collection, addDoc } from 'firebase/firestore';

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
          // Add the data to Firestore
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
          console.warn(`Skipping row ${index} due to undefined link.`);
        }
      }
    }));
  });
}