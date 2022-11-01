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
    logOut:()=>void,
    theme:boolean,
    changeTheme:()=>void,
}>({
    user:{},
    signIn:()=>{},
    signUp:()=>{},
    logOut:()=>{},
    theme:false,
    changeTheme:()=>{},
})


export const AppProvider:React.FC<any> = ({children}) => {
    const [user,setUser]=useState<any>()
    const [theme,setTheme]=useState(false)

    const changeTheme=()=>{
        setTheme(p=>!p)
        if(!theme){
            document.getElementsByTagName("body")[0].style.backgroundColor='rgb(2, 8, 11)'
            document.getElementsByTagName("body")[0].style.color='white'

        }
        else{
            document.getElementsByTagName("body")[0].style.backgroundColor='white'
            document.getElementsByTagName("body")[0].style.color='rgb(2, 8, 22)'
        }
    }
 
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
    <AppContext.Provider value={{theme,changeTheme,user,signIn,signUp,logOut}}>{children}</AppContext.Provider>
  )
}

export const useGlobalContext=()=>{
    return useContext(AppContext)
}

