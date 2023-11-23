import React, { useRef, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import style from "./TodoItem.module.css"

function TodoItem({data,editTodo,deleteTodo,toggleComplete}) {
    const [title,setTitle]=useState(data.title)
    const [editActive,setEditActive]=useState(false)
    const [completeStatus,setCompleteStatus]=useState(data.completeStatus)
    const {_id}=data
  return (
    <div className={style.container}
        onDragStart={()=>{
            console.log("hi")
        }}
        style={
            {
                backgroundColor:completeStatus?"#deddddfa":"white"
            }
        }
    >
        <input type="checkbox" 
            checked={completeStatus}
            onChange={()=>{
                const prevStatus=completeStatus
                setCompleteStatus(prev=>!prev)
                toggleComplete(_id,prevStatus)
            }}
            disabled={editActive}
            className={style.checkbox}
        />
        {
            editActive==false?
            (
                <h3
                    className={style.title}
                >{title}</h3>
            ):(
                <input type="text" 
                    value={title}
                    className={style.titleInput}
                    onChange={(e)=>setTitle(e.target.value)}
                    
                />
            )
        }


        <div className={style.btnContainer}>
            <button
                className={style.btn + " " + style.deleteBtn}
                style={
                    {
                        opacity:editActive?0.2:1
                    }
                }
                onClick={()=>{
                    deleteTodo(_id)
                }}
                disabled={editActive}
            >
                <MdDelete/>
            </button>
            {
                editActive==false ?
                (
                    <button
                        className={style.btn + " " + style.editBtn}
                        onClick={()=>{
                            setEditActive(true)
                        }}
                    >
                        <CiEdit/>
                    </button>
                ):(
                    <button
                        className={style.btn+" "+style.saveBtn}
                        onClick={()=>{
                            if(title!==data.title){
                                editTodo(_id,title,completeStatus)
                            }
                            setEditActive(false)
                        }}
                    >
                        <FaCheck/>
                    </button>
                )
            }
        </div>
    </div>
  )
}

export default TodoItem