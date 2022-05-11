import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeVArN2_6NiAKt3fWAoUnU0P2JYiSUuM0",
  authDomain: "front-vsphone.firebaseapp.com",
  projectId: "front-vsphone",
  storageBucket: "front-vsphone.appspot.com",
  messagingSenderId: "491375998832",
  appId: "1:491375998832:web:98253fd997352f7d6ec1b5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();