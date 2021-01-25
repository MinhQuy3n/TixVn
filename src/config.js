import firebase from "firebase/app";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBuFDgIHthYkjtJ37hO8PTEhsAfbt5NbZc",
  authDomain: "tixfilm-79891.firebaseapp.com",
  databaseURL: "https://tixfilm-79891.firebaseio.com",
  projectId: "tixfilm-79891",
  storageBucket: "tixfilm-79891.appspot.com",
  messagingSenderId: "530401040915",
  appId: "1:530401040915:web:059d7d0dbe354406d8fde6",
  measurementId: "G-B6SJWG7SXE",
};
firebase.initializeApp(firebaseConfig);
export default firebase;
