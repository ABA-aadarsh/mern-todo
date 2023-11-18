import React, { useEffect, useState } from 'react'
import AddForm from './components/AddForm'
import TodoContainer from './components/TodoContainer'
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [list,setList]=useState([])
  const [loading,setLoading]=useState(true)
  const rearrangeList=(newList)=>{
    setList([...newList])
  }
  const toggleComplete=(id)=>{
    setList(prev=>prev.map(i=>(
      i.id==id?{...i,completeStatus:!i.completeStatus}:i
    )))
  }
  const addTodo=(title)=>{
    setList(prev=>{
      prev.unshift({
        id:Date.now()+Math.floor(Math.random()*1000),
        title,
        completeStatus:false
      })
      return [...prev]
    })
    toast.success("New Todo Added")
  }
  const deleteTodo=(id)=>{
    setList(prev=>prev.filter(i=>i.id!==id))
    toast.success("Todo Deleted")
  }
  const editTodo=(id,title)=>{
    setList(prev=>prev.map(i=>{
      if(i.id!==id){
        return i
      }else{
        return {
          id,
          title
        }
      }
    }))
    toast.success("Todo Edited")
  }
  return (
    <>
      <div style={{display:"flex",flexDirection:"column",height:"100vh"}}>
        <Navbar
          loading={loading}
        />
        <AddForm
          addTodo={addTodo}
        />
        <TodoContainer
          list={list}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
          rearrangeList={rearrangeList}
          toggleComplete={toggleComplete}
        />
      </div>
      <ToastContainer
        position='bottom-left'
      />
    </>
  )
}

export default App