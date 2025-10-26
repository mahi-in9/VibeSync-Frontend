import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDTDde55c_RmBDzR5_kn7xCh32UeGEsAqk",
  authDomain: "vibesync-ad250.firebaseapp.com",
  databaseURL: "https://vibesync-ad250-default-rtdb.firebaseio.com",
  projectId: "vibesync-ad250",
  storageBucket: "vibesync-ad250.firebasestorage.app",
  messagingSenderId: "732552304511",
  appId: "1:732552304511:web:909fd44e9581a57324ac4a",
  measurementId: "G-3TJKCSXFT3"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);