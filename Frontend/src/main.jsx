import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx'
import { ToastContainer } from 'react-toastify'
import { login ,signup} from './auth.js'
import Signup from './pages/Signup.jsx'
import Home from "./pages/Home.jsx"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'

const router=createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>}>
            <Route  path='' element={
                <AuthLayout>
                    <Home/>
                </AuthLayout>
            }/>

            <Route
                path='login'
                element={
                    <Login
                        login={login}
                    />
                }
            />

            <Route
                path='signup'
                element={
                    <Signup
                        signup={signup}
                    />
                }
            />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider
        router={router}
    />
)
