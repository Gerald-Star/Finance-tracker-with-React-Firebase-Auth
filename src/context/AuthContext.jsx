import { createContext, useReducer } from "react";

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
                isPending: false,
                error: null
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
        isPending: true,
        error: null
        
    })
    console.log('AuthContext state:', state) // check the state of the user whenever state changes
    return (
        <AuthContext.Provider value= {{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}