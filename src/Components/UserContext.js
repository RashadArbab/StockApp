import React, { createContext, useState } from 'react';



export const UserContext = createContext();


export const UserProvider = (props) => {
    const [user, setUser] = useState({
        name: 'default',
        email: 'default@default.com',
        pass: 'password' , 
        authenticated : false 
    });

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}