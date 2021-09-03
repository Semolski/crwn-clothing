import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCeQzEDUV4Xsc8Z9qF1_0R3Tn8cpcsAqOk",
    authDomain: "candc-db.firebaseapp.com",
    projectId: "candc-db",
    storageBucket: "candc-db.appspot.com",
    messagingSenderId: "298591879533",
    appId: "1:298591879533:web:93a19061e89132f0bd1a64",
    measurementId: "G-ZP155LD85K"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;