import {useState, useEffect} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'

const useUser =() =>{
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const unSignedIn = onAuthStateChanged(getAuth(), user=>{
            setUserData(user)
            setIsLoading(false)
        })
        return unSignedIn
    }, [])
    return { userData, isLoading }
}

export default useUser