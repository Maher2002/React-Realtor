// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwiL67r3POVIq91MGxdCiRlU5s4pWJAfY",
  authDomain: "realtor-react-9acbc.firebaseapp.com",
  projectId: "realtor-react-9acbc",
  storageBucket: "realtor-react-9acbc.appspot.com",
  messagingSenderId: "966730804291",
  appId: "1:966730804291:web:01ffb17522e03bae4978f6",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
