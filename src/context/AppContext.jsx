import React, { useState } from "react";
const AppContext = React.createContext();

function  AppProvider (props) {        
    const [loggedIn, setLoggedIn] = useState(false);    
    const [role, setRole] = useState(null);  
    const [user, setUser] = useState(null);  
    return(
        <AppContext.Provider value = {{                        
            loggedIn, setLoggedIn ,
            role, setRole,
            user, setUser
        }} >
            {props.children}
        </AppContext.Provider>
    )
}

export{ AppContext, AppProvider }