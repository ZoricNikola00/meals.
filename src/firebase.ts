
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyDSki2pbocaeqsM7Rd6hMn3wh6kJrhZJjk",

    authDomain: "mealdb-2f245.firebaseapp.com",
  
    projectId: "mealdb-2f245",
  
    storageBucket: "mealdb-2f245.appspot.com",
  
    messagingSenderId: "59317768398",
  
    appId: "1:59317768398:web:83b75250147806e279409f",
  
    measurementId: "G-D3PM6CGF04"  

};


// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db= getFirestore(app)