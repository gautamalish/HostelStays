
import React, { useContext, useState, useEffect } from "react"
import { auth } from './firebase'
import { signInWithEmailAndPassword } from "firebase/auth"
import { sendPasswordResetEmail } from "firebase/auth"
import { signOut } from "firebase/auth"
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initialLogin,setInitialLogin]=useState(false)
  function login(email, password) {
    if(!initialLogin){
      setInitialLogin(true)
    }
    return signInWithEmailAndPassword(auth,email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth,email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        if (user.metadata.creationTime === user.metadata.lastSignInTime) {
          console.log("user signed up")
        } else {
            console.log("User logged in");
            setCurrentUser(user)
        }
      }
      setLoading(false)
    })

    return unsubscribe
  }, [initialLogin])

  const value = {
    currentUser,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}