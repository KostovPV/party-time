import { initializeApp} from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore';
import { getAuth} from 'firebase/auth';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAybV2lMRnRrsPnVnyBopXm5DqJlxZcEcs",
  authDomain: "vite-36cfc.firebaseapp.com",
  projectId: "vite-36cfc",
  storageBucket: "vite-36cfc.appspot.com",
  messagingSenderId: "622638542150",
  appId: "1:622638542150:web:b30d61ead51149ab5ac947",
  measurementId: "G-HJ2LXFYXEW"
  };


 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 
  const db = getFirestore();

  const auth = getAuth();

  const storage = getStorage(app);

  
  export { db, auth, storage, analytics}
   