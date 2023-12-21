import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from '../firebase/firebase.confige';


export  const AuthContext = createContext(null)
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [lodding,setLodding] = useState(true)

    const createUser = (email,password) => {
        setLodding(true)
      return  createUserWithEmailAndPassword(auth,email,password)

    }

    const singInUser = (email,password) => {
        setLodding(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = () =>{
       return signOut(auth)
       
    }

    // ovser user auth state change 

    useEffect(()=>{
     const unSubscribe = onAuthStateChanged(auth,createUser => {
            console.log(createUser);
            setUser(createUser)
            setLodding(false)
        });

        // stop ovserbing 
        return ()=>{
            return unSubscribe();
        }
    },[])


    const authInfo = {
        user,
        createUser,
        singInUser,
        logOut,
        lodding
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;