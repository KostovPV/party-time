// // firebaseService.js
// import { getFirestore, collection, getDoc, setDoc, increment } from 'firebase/firestore';

// const db = getFirestore();

// export const incrementVisitCount = async () => {
//   const visitsCollection = collection(db, 'visits');
//   const visitDoc = await getDoc(visitsCollection);

//   if (visitDoc.exists()) {
//     // If the document exists, update the count by 1
//     await setDoc(visitsCollection, { count: increment(1) }, { merge: true });
//   } else {
//     // If the document doesn't exist, create it with count 1
//     await setDoc(visitsCollection, { count: 1 });
//   }
// };
