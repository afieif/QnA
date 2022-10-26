import React, { useContext, useState , useEffect} from 'react';
import { createUser, signIn, auth } from '../firebase';



const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function logout(){
        return auth.signOut();
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
    }

  return (
  <AuthContext.Provider value={value}>
    {!loading && children}
  </AuthContext.Provider>
  );
}