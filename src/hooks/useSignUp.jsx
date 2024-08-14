import { useState } from "react"
import { projectAuth } from "../firebase/config"



export const useSignUp = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try{
            //signup user and catch error
            const res =  await projectAuth.createUserWithEmailAndPassword(email, password)
            console.log(res.user)

         if (!res) {
             throw new Error('Could not complete the signup')
         }

         // update the display name
         await res.user.updateProfile({ displayName })

         setIsPending(false)
         setError(null)
        }

        catch(err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }
     return {error, isPending, signup}

}