
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyC6exE5SKrCwwdXS15N5TrZDUu7ayuLVrU",
  authDomain: "hostelstays-55bc1.firebaseapp.com",
  projectId: "hostelstays-55bc1",
  storageBucket: "hostelstays-55bc1.appspot.com",
  messagingSenderId: "399271882267",
  appId: "1:399271882267:web:81cb86188e58f16a8d92be",
  measurementId: "G-B32WNCZN9M"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth(app)