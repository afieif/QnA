import React, { useContext, useState , useEffect} from 'react';
import { auth } from '../firebase';
import {createUserWithEmailAndPassword,  signInWithEmailAndPassword } from "firebase/auth";




const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error,setError]  = useState('');

    function logout(){
        return auth.signOut();
    }

    function createUser(email,password)
{
    setError('');
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
        const errorCode = error.code;
        setError(errorCode)
    }
    // ..
  });
}

function signIn(email,password)
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
    setError(errorCode);
  });
}


    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return () => unsubscribe;
        
    }, [])

    const value = {
        currentUser, 
        signIn, 
        createUser,
        logout, 
        error
    }

  return (
  <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>
  );
}