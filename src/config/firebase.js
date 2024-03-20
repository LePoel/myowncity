import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAptubSipPrm5LE7ZnwfGSt3My07S6h310",
    authDomain: "myowncity-6d2b2.firebaseapp.com",
    projectId: "myowncity-6d2b2",
    storageBucket: "myowncity-6d2b2.appspot.com",
    messagingSenderId: "1029636894776",
    appId: "1:1029636894776:web:d38cf5daa126203a08f6cd",
    measurementId: "G-PM8XK7DD66"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);