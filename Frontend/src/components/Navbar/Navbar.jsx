import React, { useEffect } from 'react'
import { MdOutlineCloudDone } from "react-icons/md";
import Loading from './Loading';
import style from "./Navbar.module.css"
import { logout } from '../../auth';
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function Navbar({loading}) {
    const navigate=useNavigate()
  return (
    <nav className={style.navbar}>
        <div className={style.titleBox}>
            <div className={style.logoContainer}>
                <img src="/logo-nobg.png" alt=""
                    className={style.logo}
                />
            </div>
            <h1
                className={style.title}
            >ToDo</h1>
        </div>
        <div className={style.box}>
            <div className={style.loadEffectContainer}>
                {
                    loading?
                    <Loading/>
                    :
                    <MdOutlineCloudDone/>
                }
            </div>
            <button
                className={style.logoutBtn}
                title='Logout'
                onClick={async ()=>{
                    if(confirm("Do you want to Log out?")){
                        await logout()
                        navigate("/login")
                    }
                }}
            >
                <MdOutlineLogout/>
            </button>
        </div>
    </nav>
  )
}

export default Navbar