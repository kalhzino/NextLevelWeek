import { createContext, useContext, ReactNode, useState } from "react";

export const darkModeContext = createContext({} as DarkMode);

type DarkMode ={    
    isDarkModeEnabled: boolean;
    toggleDarkMode:() => void;
}
type DarkModeProps = {
    children:ReactNode;
}

export function DarkModeContextProvider({children}: DarkModeProps){
   const [isDarkModeEnabled, setDarkMode] = useState(false);

   function toggleDarkMode(){
      setDarkMode(!isDarkModeEnabled)
    }
   return(
       <darkModeContext.Provider value={{
        isDarkModeEnabled,
        toggleDarkMode,
        
    }
       }>{children}
       </darkModeContext.Provider>
    )
}
export const useDarkMode = () => {
    return useContext(darkModeContext)
}