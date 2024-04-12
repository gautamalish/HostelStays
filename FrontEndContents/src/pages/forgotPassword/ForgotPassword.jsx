import { useState,useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Alert } from "react-bootstrap"
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../context/firebase"
import { useAuth } from "../../context/AuthContext"
import "./forgotPassword.scss"
export default function ForgotPassword(){
    const navigate=useNavigate()
    const loginNavigate=useNavigate()
    const emailRef=useRef(null)
    const [formData,setFormData]=useState({email:""})
    const [error,setError]=useState("")
    const [message,setMessage]=useState("")
    const { resetPassword } = useAuth()
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        emailRef.current.focus()
    },[])
    async function handleSubmit(e) {
        e.preventDefault()
        if(!formData.email){
            setError("Please fill up the field")
            return
        }
        try {
          setMessage("")
          setError("")
          setLoading(true)
          await resetPassword(formData.email)
          setMessage("Check your inbox for further instructions")
        } catch(error) {
            console.log(error.code)
            if (error.code === "auth/invalid-credential") {
                setError("User not found. Please use correct email");
            } else {
                setError("Failed to Reset Password.");
            }
        }
    
        setLoading(false)
      }
        
    function handleChange(event){
        setFormData((prevFormData)=>({
            ...prevFormData,
            [event.target.name]:event.target.value
        }))
    }
    return(
        <div className="signinContainer">
            <h1 className="signinTitle">Password Reset</h1>
            {error!="" && <Alert variant="danger">{error}</Alert>}
            {message!="" && <Alert variant="success">{message}</Alert>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" style={{fontWeight:"bold"}}>Email address</label>
                    <input type="email" name="email" className="form-control" ref={emailRef} id="exampleInputEmail1" aria-describedby="emailHelp" value={formData.email} onChange={handleChange} placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>Reset Password</button>
                <button type="submit" className="btn btn-primary loginBtn" onClick={()=>loginNavigate("/")} disabled={loading}>Back to LogIn</button>
            </form>
        </div>

    )

}