import { useEffect, useState } from 'react'
import style from './header.module.css'

export const Header = () => {

      var [headerColor, setHeaderColor] = useState(style.color1)

      var dev = document.getElementById("dev")
      console.log(dev)
        function alterar() {
          
    if (devName == "ShibaDX") {
      setHeaderColor("color-2")
    } else {
      setHeaderColor("color-1")
    }
  }

    return(
      <header className={style.header + " " + headerColor}>
        <h1>Chopi</h1>
      </header>
    )
}