import { db } from './firebase';
import { collection, getDocs, orderBy } from 'firebase/firestore';

export interface Internship {
  id: string;
  company: string;
  role: string;
  location: string;
  application: string;
}

export async function getInternships(): Promise<Internship[]> {
  const internshipsCollection = collection(db, 'internships');
  const internshipsSnapshot = await getDocs(internshipsCollection);
  return internshipsSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      company: data.firstTd || '',
      role: data.secondTd || '',
      location: data.thirdTd || '',
      application: data.fourthTdLink || ''
    };
  });
}