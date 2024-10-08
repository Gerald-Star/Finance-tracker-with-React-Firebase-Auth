import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";


export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();


    const login = async (email, password) => {
        setError (null)
        setIsPending(true)

        // sign the user in and catch any errors

        try {
            const res = await projectAuth.signInWithEmailAndPassword(email, password)

            // dispatch login action
            dispatch({type: 'LOGIN_SUCCESS', payload: res.user})

            // update the local state hook for resetting the error and isPending states
            if(!isCancelled){
                setIsPending(false)
                setError(null)
            }
        }
        catch(err) {
            if(isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])

    return {login, error, isPending}
}