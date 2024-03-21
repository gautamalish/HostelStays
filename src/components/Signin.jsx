import { useState,useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Alert } from "react-bootstrap"
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../context/firebase"
export default function Signin({setSignedIn}){
    const navigate=useNavigate()
    const emailRef=useRef(null)
    const [formData,setFormData]=useState({email:"",password:""})
    const [error,setError]=useState("")
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        emailRef.current.focus()
    },[])
    async function handleSubmit(e) {
        e.preventDefault()
        if(!formData.email || !formData.password){
            setError("Please fill up all the fields")
        }
        setError("")
            try{
                await signInWithEmailAndPassword(auth,formData.email,formData.password)
                navigate("/frontpage")
            }
            catch(error){
                setError("")
                setError("Error Logging In")
            }
      }
        
    function handleChange(event){
        setFormData((prevFormData)=>({
            ...prevFormData,
            [event.target.name]:event.target.value
        }))
    }
    return(
        <div className="signinContainer">
            <h1 className="signinTitle">Log In</h1>
            {error!="" && <Alert variant="danger">{error}</Alert>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1" style={{fontWeight:"bold"}}>Email address</label>
                    <input type="email" name="email" className="form-control" ref={emailRef} id="exampleInputEmail1" aria-describedby="emailHelp" value={formData.email} onChange={handleChange} placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1" style={{fontWeight:"bold"}}>Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={formData.password} onChange={handleChange} placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>Log In</button>
            </form>
        </div>

    )

}