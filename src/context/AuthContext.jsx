
import React, { useContext, useState, useEffect } from "react"
import { auth } from './firebase'
import { signInWithEmailAndPassword } from "firebase/auth"
import { sendPasswordResetEmail } from "firebase/auth"
import { signOut } from "firebase/auth"
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

function LogoutOnTabClose() {
  useEffect(() => {
    const handleBeforeUnload = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Error signing out:', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function login(email, password) {
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
  console.log(currentUser)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    LogoutOnTabClose,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}