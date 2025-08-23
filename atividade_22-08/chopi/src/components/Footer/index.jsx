import { useEffect, useState } from 'react'
import style from './footer.module.css'

export const Footer = () => {
    var [devName, setDevName] = useState("ShibaDX")

  function alterar() {
    if (devName == "ShibaDX") {
      setDevName("ShiNN")
      setHeaderColor("color-2")
    } else {
      setDevName("ShibaDX")
      setHeaderColor("color-1")
    }
  }

    return (
        <footer className={style.footer}>
            <div className={style.dev}>
                <h2 itemID='dev'>Desenvolvedor: {devName}</h2>
            </div>
                <button onClick={alterar} className={style.button}>Alterar Dev</button>
        
        </footer>
    )
}