import React, {createContext} from 'react'

const AuthContext = createContext({
    username:null,
    isAuth:false
});

export default AuthContext;