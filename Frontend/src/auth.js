
import { toast } from "react-toastify"



const login=async ({email,password})=>{
  try{
    const res=await fetch("http://localhost:8080/auth/login",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({email,password})
      }
    )
    if(res.status==201){
      const userData=await res.json()
      localStorage.setItem("userData",JSON.stringify(userData))
      toast.success("Login Success")
      return true
    }else{
      toast.error("Invalid Email or Password")
      return false
    }
  }catch(err){
    toast.error("Login Failed")
    return false
  }
}


const signup=async({username,email,password})=>{
    try{
        const res=await fetch("http://localhost:8080/auth/signup",
          {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({username,email,password})
          }
        )
        if(res.status==200){
            const userData=await res.json()
            localStorage.setItem("userData",JSON.stringify(userData))
            toast.success("Account Created")
            return true
        }else{
            toast.error("Signup Failed")
            return false
        }
      }catch(err){
          toast.error("Signup Failed")
          return false
      }
}


const verify=async ()=>{
  try{
    const data=JSON.parse(localStorage.getItem("userData"))
    if(data===null || data.token==undefined){
        return false
    }
    const res=await fetch("http://localhost:8080/auth/verify",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "authorization":"Bearer "+data.token
        }
      }
    )
    if(res.status==206){
      return true
    }else{
      return false
    }
  }catch(err){
    console.log(err)
    return false
  }
}

const logout=async ()=>{
  localStorage.clear()
  return true
}

export {login,signup,verify,logout}
