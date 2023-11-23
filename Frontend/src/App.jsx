import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
    <Outlet/>
    <ToastContainer
      position='bottom-left'
    />
    </>
  )
}

export default App