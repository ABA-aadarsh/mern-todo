import React, { useEffect, useState } from 'react'
import { verify } from '../auth'
import { useNavigate } from 'react-router-dom'

function AuthLayout({children}) {
    const navigate=useNavigate()
    const [accessAllowed,setAccessAllowed]=useState(false)
    const [loading,setLoading]=useState(true)
    const checkAuth=async ()=>{
        
        const isAuth=await verify()
        if(isAuth){
            setAccessAllowed(true)
            setLoading(false)
        }else{
            navigate("/login")
        }
    }
    useEffect(()=>{
        checkAuth()
    },[])
  return !loading && (
    <>
        {
            accessAllowed && 
            <>
            {children}
            </>
        }
    </>
  )
}

export default AuthLayout