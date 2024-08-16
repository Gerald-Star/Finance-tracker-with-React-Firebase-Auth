import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type) {
        // make case for login request, login success, login error, and logout
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isPending: true,
                error: null
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                //isPending: false,
                //error: null
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                user: null,
                isPending: false,
                error: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                //isPending: false,
                //error: null
            }
        case 'AUTH_IS_READY':
            return {
                ...state,
                user: action.payload,
                authIsReady: true
            }    
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    // create the useReducer function
    // use the useReducer hook to create a reducer function to control the state of the user
    // authReducer is the initial state
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false // perform a check if the auth is ready any user is login- to be used inside app.jsx
        //isPending: true,
        //error: null     
    })

    // perform a check if the auth is ready any user is login- to be used inside app.jsx
    useEffect(() => {
        // communicates with firebase to check if the user is login
        const unsub = projectAuth.onAuthStateChanged((user) =>{
            dispatch({type: 'AUTH_IS_READY', payload: user})
            unsub()
        })
    }, []);
  

    console.log('AuthContext state:', state) // check the state of the user whenever state changes
    return (
        <AuthContext.Provider value= {{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}