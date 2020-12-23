import React, { createContext, useState } from 'react';



export const UserContext = createContext();

export const UserProvider = () => {
    const [user, setUser] = useState({
        name: 'default',
        email: 'default@default.com',
        pass: 'password'
    });

    return (
        <UserContext.Provider value={[user, setUser]}>
            {this.props.children}
        </UserContext.Provider>
    );
}