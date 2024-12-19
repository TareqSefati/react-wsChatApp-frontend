import { createContext, useState } from "react"

export const AppContext = createContext(null);
export default function AppContextProvider({children}) {
    const[loggedinUser, setLoggedinUser] = useState({});
    const contextInfo = {
		loggedinUser,
        setLoggedinUser,
	};
  return (
    <AppContext.Provider value={contextInfo}>{children}</AppContext.Provider>
  )
}
