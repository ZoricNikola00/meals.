import { useState, useContext,createContext} from 'react'

const AppContext=createContext<{}>({})
export const AppProvider:React.FC<any> = ({children}) => {
  return (
    <AppContext.Provider value=''>{children}</AppContext.Provider>
  )
}

export const useGlobalContext=()=>{
    return useContext(AppContext)
}

