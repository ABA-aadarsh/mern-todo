import React, { useEffect } from 'react'
import { MdOutlineCloudDone } from "react-icons/md";
import Loading from './Loading';
import style from "./Navbar.module.css"

function Navbar({loading}) {

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
        <div className={style.loadEffectContainer}>
            {
                loading?
                <Loading/>
                :
                <MdOutlineCloudDone/>
            }
        </div>
    </nav>
  )
}

export default Navbar