import { useState, useContext,createContext, useEffect} from 'react'
import { auth, db } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';

const AppContext=createContext<{
    user:any,
    signIn:(e:string,p:string)=>void,
    signUp:(e:string,p:string)=>void,
    logOut:()=>void
}>({
    user:{},
    signIn:()=>{},
    signUp:()=>{},
    logOut:()=>{}
})


export const AppProvider:React.FC<any> = ({children}) => {
    const [user,setUser]=useState<any>()

    const signIn=(email:string,password:string)=>{
        signInWithEmailAndPassword(auth,email,password)
    }

    const signUp=(email:string,password:string)=>{
        createUserWithEmailAndPassword(auth,email,password)
        setDoc(doc(db,'users',email),{
            favoriteMeals:[]
        })
    }

    const logOut=()=>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(currentUser:any)=>{
         setUser(currentUser)
         
        })
        return ()=>{
         unsubscribe( )
        } 
     },[])

  return (
    <AppContext.Provider value={{user,signIn,signUp,logOut}}>{children}</AppContext.Provider>
  )
}

export const useGlobalContext=()=>{
    return useContext(AppContext)
}

