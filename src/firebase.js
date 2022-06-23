import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-2JCkrvjjDsn5ChPel02kk7pQWlqc9vA",
  authDomain: "ig-reels-clone-755ca.firebaseapp.com",
  projectId: "ig-reels-clone-755ca",
  storageBucket: "ig-reels-clone-755ca.appspot.com",
  messagingSenderId: "466706368812",
  appId: "1:466706368812:web:be51bf285ab51aec5a0489"
};

  let provider = new firebase.auth.GoogleAuthProvider();

  firebase.initializeApp(firebaseConfig);
  // Object which will deal with login/logout
  export const auth = firebase.auth();
    
export const db = firebase.firestore();
export const storage = firebase.storage();


export const signInWithGoogle = () => {
    // we will sign-in through pop-up
    auth.signInWithPopup(provider);
  }

export default db;

