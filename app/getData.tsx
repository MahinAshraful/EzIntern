import { db } from "./firebase"
import { collection, getDocs, query } from "firebase/firestore";

interface InternshipData {
  company: string;
  role: string;
  location: string;
  application: string;
}

async function getData() {
  const bigData: InternshipData[] = [
    {
      company: "Puffco",
      role: "Analyst Intern",
      location: "LA",
      application: "https://sensata.wd1.myworkdayjobs.com/en-US/Sensata-Careers/job/Attleboro-Massachusetts/Software-Engineer-Intern---Summer-2025_IRC93689?utm_source=Simplify&ref=Simplify"
    },
    {
      company: "TikTok",
      role: "Software Eng",
      location: "NYC",
      application: "https://sensata.wd1.myworkdayjobs.com/en-US/Sensata-Careers/job/Attleboro-Massachusetts/Software-Engineer-Intern---Summer-2025_IRC93689?utm_source=Simplify&ref=Simplify"
    },
  ];

  const newCompany: InternshipData = {
    company: "Meta",
    role: "Data Scientist",
    location: "Remote",
    application: "https://careers.meta.com/jobs/data-scientist/123456"
  };

  bigData.push(newCompany);

  const getTheData = async () => {
    try {
      const collectionRef = collection(db, "internships");
      const q = query(collectionRef);

      const docSnap = await getDocs(q);

      docSnap.forEach((doc) => {
        const data = doc.data();
        const internshipData: InternshipData = {
          company: data.firstTd || '',
          role: data.secondTd || '',
          location: data.thirdTd || '',
          application: data.fourthTdLink || '',
        };
        bigData.push(internshipData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Await the execution of getTheData
  await getTheData();

  return bigData;
}

export default getData;