import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

console.log("Initializing Firebase app...");
export const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized.");

console.log("Initializing Firestore...");
export const db = getFirestore(app);
console.log("Firestore initialized.");

console.log("Initializing Storage...");
export const imgDB = getStorage(app, "gs://myblog-21862.appspot.com");
console.log("Storage initialized.");

// const docRef = doc(db, "objects", "some-id");
// export const updateTimestamp = await updateDoc(docRef, {
//   timestamp: serverTimestamp(),
// });
