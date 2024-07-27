import axios from "axios";
import * as cheerio from "cheerio";

export default async function Home() {
  axios.get("https://github.com/SimplifyJobs/Summer2025-Internships").then((response) => {
    const $ = cheerio.load(response.data); // Load the HTML using Cheerio
    const trElements = $("tr"); // Select all <tr> elements

    trElements.each((index, element) => {
      const tds = $(element).find("td"); // Find all <td> elements within each <tr>

      if (tds.length >= 4) { // Ensure there are at least 4 <td> elements
        const firstTd = $(tds[0]).text().trim();
        const secondTd = $(tds[1]).text().trim();
        const thirdTd = $(tds[2]).text().trim();

        // For the fourth <td>, extract both the text and the link URL
        const fourthTdElement = $(tds[3]);
        const fourthTdText = fourthTdElement.text().trim();
        const fourthTdLink = fourthTdElement.find("a").attr("href"); // Extract the href attribute

        // Log the four values, including the link
        console.log(`${firstTd}, ${secondTd}, ${thirdTd}, ${fourthTdText} (${fourthTdLink})`);
      }
    });
  });
}