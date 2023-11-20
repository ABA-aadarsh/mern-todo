import React, { useEffect, useState } from 'react'
import {toast} from "react-toastify"
const url="http://localhost:8080"
function useTodo() {
  const [list,setList]=useState([])
  const [loading,setLoading]=useState(true)
  const getTodo=async ()=>{
    setLoading(true)
    const res=await fetch(url,{
        method:"GET"
    })
    if(res.status==203){
        const {data}=await res.json()
        setList([...data])
    }else{
        toast.error("Failed to fetch data")
    }
    setLoading(false)
  }
  const deleteTodo=async(_id)=>{
    setLoading(true)
    const res=await fetch(url+`/${_id}`,{
        method:"DELETE"
    })
    if(res.status==200){
        const data=await res.json()
        setList(prev=>prev.filter(i=>i._id!==data._id))
        toast.success("Todo Deleted")
    }else{
        toast.error("Failed to delete todo")
    }

    setLoading(false)
  }
  const editTodo=async (_id,title,completeStatus)=>{
    setLoading(true)
    const res=await fetch(url+`/${_id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({title,completeStatus})
    })
    if(res.status==202){
        const data=await res.json()
        setList(prev=>prev.map(i=>{
            if(i._id!==data._id){
                return i
            }else{
                return {
                _id,
                title,
                completeStatus
                }
            }
        }))
        toast.success("Todo Edited")
    }else{
        toast.error("Failed to update todo")
    }

    setLoading(false)
  }
  const addTodo=async (title)=>{
    setLoading(true)
    const res=await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({title})
    })
    if(res.status==201){
        const data=await res.json()
        setList(prev=>{
            prev.unshift(data)
            return [...prev]
        })
        toast.success("New Todo Added")
    }else{
        toast.error("Failed to update todo")
    }

    setLoading(false)
  }
  const toggleComplete=async (_id,prevCompleteStatus)=>{
    setLoading(true)
    const res=await fetch(url+`/${_id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({completeStatus:!prevCompleteStatus})
    })
    if(res.status==202){
        const data=await res.json()
        setList(prev=>prev.map(i=>(
            i._id==data._id?{...i,completeStatus:!i.completeStatus}:i
        )))
    }else{
        toast.error("Failed to change status")
    }

    setLoading(false)
  }

  useEffect(()=>{
    getTodo()
  },[])

  return {list,setList,addTodo,deleteTodo,editTodo,getTodo,toggleComplete,loading}
}

export {useTodo}