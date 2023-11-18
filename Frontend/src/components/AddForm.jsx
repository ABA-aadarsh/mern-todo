import React, {useEffect, useState} from 'react'
import { IoMdSend } from "react-icons/io";
import { toast } from 'react-toastify';
import style from "./AddForm.module.css"

function AddForm({addTodo}) {
    const [title,setTitle]=useState("")

  return (
    <form onSubmit={(e)=>{
        console.log(title)
        e.preventDefault()
        if(title!=""){
            addTodo(title)
            setTitle("")
        }else{
            toast.error("Title cannot be empty")
        }
    }}
        className={style.container}
    >
        <input type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            placeholder='Eg: Make a Project'
            className={style.input}
        />
        <button type="submit"
            className={style.btn}
        >
            <IoMdSend/>
        </button>
    </form>
  )
}

export default AddForm