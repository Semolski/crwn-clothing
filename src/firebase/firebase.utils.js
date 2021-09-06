import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBXKQzZnrdXC7ubAZGFWjHZyI4S8W7Nn-k",
    authDomain: "candc-db-345d9.firebaseapp.com",
    projectId: "candc-db-345d9",
    storageBucket: "candc-db-345d9.appspot.com",
    messagingSenderId: "584679199552",
    appId: "1:584679199552:web:f12dc3e230cf56bd49a0a5",
    measurementId: "G-4HE36PXEYY"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;