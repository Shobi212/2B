import firebase, { initializeApp } from "firebase/app";
import "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAVqFGep4Oa1pPt_h7YP_w02_PuPpzRyeg",
  authDomain: "sampleap3b.firebaseapp.com",
  databaseURL: "https://sampleap3b-default-rtdb.firebaseio.com",
  projectId: "sampleap3b",
  storageBucket: "sampleap3b.appspot.com",
  messagingSenderId: "889653356510",
  appId: "1:889653356510:web:c43830ef3ab5d1ac6d9f4f",
  measurementId: "G-QGQXTF2GMB",
};

export const app = initializeApp(firebaseConfig);

export const rdb = getDatabase(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const storageRef = ref(storage, "upload");
