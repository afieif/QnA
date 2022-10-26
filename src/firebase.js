import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBOxOwHMQiiLcyZEYYFdn5V_yaaX_BgOZM",
  authDomain: "auction-ffe0a.firebaseapp.com",
  databaseURL: "https://auction-ffe0a.firebaseio.com",
  projectId: "auction-ffe0a",
  storageBucket: "auction-ffe0a.appspot.com",
  messagingSenderId: "22647798987",
  appId: "1:22647798987:web:8ed265395293d5f0ad6f4e"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export function createUser(email,password)
{
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    if(errorCode === 'auth/email-already-in-use')
    {
            signIn(email,password);
    }
    else
    {
        const errorMessage = error.message;
        console.log(errorCode,errorMessage);
    }
    // ..
  });
}

export function signIn(email,password)
{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode,errorMessage);
  });
}
