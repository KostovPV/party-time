// // VisitsCounter.js
// import React, { useEffect, useState } from 'react';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { useCollection } from '../../hooks/useCollection';
// import { db } from '../../firebase/config';

// const VisitsCounter = () => {
//   const visitsCollection = collection(db, 'visitsCollection');
//   const { data: visitsData, error: visitsError } = useCollection(visitsCollection);

//   const [visits, setVisits] = useState(null);

//   useEffect(() => {
//     if (visitsError) {
//       console.error('Error fetching data from Firestore:', visitsError);
//       return;
//     }

//     if (visitsData ) {
     
//       console.log('Count:', count);
//       setVisits(()=>visitsData.count++);
//     } else {
//       console.log('No data available.');
//       setVisits(0);
//     }
//   }, [visitsData, visitsError]);

//   return (
//     <div>
//       <h2>Website Visits</h2>
//       <p>Number of Visits: {visits}</p>
//     </div>
//   );
// };

// export default VisitsCounter;

