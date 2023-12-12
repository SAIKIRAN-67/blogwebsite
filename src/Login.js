import React from 'react'
import { useState } from 'react'
import {auth,provider} from "./firebaseconfig"
import { signInWithPopup,createUserWithEmailAndPassword} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
const Login = ({setisAuth}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const SignInWithGoogle=()=>{
    signInWithPopup(auth,provider).then((result)=>{
      localStorage.setItem('isAuth',true);
      setisAuth(true);
      navigate("/");
    })
  }
  return(
    <div className='loginCard'>

      <h1>Sign In with Google</h1>
      <button onClick={()=>{SignInWithGoogle()}}>SignIn with Google</button>
    </div>
  )
}

export default Login
