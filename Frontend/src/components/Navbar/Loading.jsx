import React from 'react'
import style from "./Loading.module.css"

function Loading({...props}) {
  return (
    <div className={style.loading} {...props}>

    </div>
  )
}

export default Loading