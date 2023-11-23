import React, { useEffect, useState } from 'react'
import AddForm from '../components/AddForm'
import TodoContainer from '../components/TodoContainer'
import {ToastContainer,toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar/Navbar';
import { useTodo } from '../todo';

function Home() {
  const {list,setList,getTodo,addTodo,editTodo,deleteTodo,toggleComplete,loading}=useTodo()
  const rearrangeList=(newList)=>{
    setList([...newList])
  }

  useEffect(()=>{
    getTodo()
  },[])
  
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
    </>
  )
}

export default Home