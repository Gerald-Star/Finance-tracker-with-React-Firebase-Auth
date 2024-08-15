import { useState, useEffect } from "react"
import { projectAuth } from "../firebase/config"
import {useAuthContext} from './useAuthContext'


// create function for useLogout

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    // set the states for error and isPending
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const {dispatch} = useAuthContext()

    // create the logout function with async and await to handle the logout process

    const logout = async () => {
        setError(null)
        setIsPending(true)

        //signout user and catch error

        try { 
            await projectAuth.signOut()

            // dispatch logout action
            dispatch({type: 'LOGOUT'})

            //update the local state hook for resetting the error and isPending states
            // set the if check to prevent memory leaks
            if (!isCancelled){
                setIsPending(false)
                setError(null)
            }
            //setIsPending(false)
            //setError(null)

        }
        catch(err){
            if (isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
             }
            
        }
    }
    // create a useEffect hook to handle the cleanup process
    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }

    }, [])
    return {logout, error, isPending}
}