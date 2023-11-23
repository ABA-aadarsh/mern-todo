import React from 'react'
import { useState } from 'react'
import style from "./Signup.module.css"
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

function Signup({signup}) {
    const navigate=useNavigate()
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
  return (
    <div className={style.container}>
        <form className={style.centerContainer}
            onSubmit={async(e)=>{
                e.preventDefault()
                if(email!="" && password!="" && username!=""){
                    const res=await signup({
                        username,
                        email,
                        password
                    })
                    if(res){
                        navigate("/")
                    }
                }else{
                    toast.error("Invalid Email, Password or Username")
                }
            }}
        >

            <h1
                className={style.title}
            >
                Create Account
            </h1>

            <div className={style.inputContainer}>
                <span>Username</span>
                <input type="text"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    className={style.input}
                />
            </div>

            <div className={style.inputContainer}>
                <span>Email</span>
                <input type="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className={style.input}
                />
            </div>
            <div className={style.inputContainer}>
                <span>Password</span>
                <input type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className={style.input}
                />
            </div>


            <button
                className={style.signupBtn}
                type='submit'
            >
                Signup
            </button>

            <span
                className={style.loginMessage}
            >Already have an account ? 
                <Link
                    to={"/login"}
                >
                    Login
                </Link>
            </span>
        </form>
    </div>
  )
}

export default Signup