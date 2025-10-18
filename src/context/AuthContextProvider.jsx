import authContext from './AuthContext'
import { useEffect, useState } from 'react'
import { auth, onAuthStateChanged } from '../config/firebase'
import LiquidLoader from '../components/LoadingSpinner'

function AuthContextProvider({ children }) {
    let [isUser, setIsUser] = useState(null)
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUser(user)
            } else {
                setIsUser(null)

            }
            setLoading(false)

        })
    }, [])
    if (loading) {
        return <LiquidLoader />
    }
    return (
        <authContext.Provider value={isUser}>
            {!loading && children}
        </authContext.Provider>
    )
}

export default AuthContextProvider