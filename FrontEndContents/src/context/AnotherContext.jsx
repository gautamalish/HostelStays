
import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
const NewContext=React.createContext()

export function useNewAuth(){
    return useContext(NewContext)
}

export function NewContextProvider({children}){
    const [logoutDisplay,setLogoutDisplay]=useState(false)
    const values={
        logoutDisplay,
        setLogoutDisplay
    }
    return (
        <NewContext.Provider value={values}>
            {children}
        </NewContext.Provider>
    )
}

