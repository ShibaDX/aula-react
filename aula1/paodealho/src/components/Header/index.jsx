import { useEffect } from 'react'
import style from './header.module.css'

export const Header = () => {
    useEffect(() => {
        console.log('Iniciou o header')
    }, [])
    return(
              <header className={style.cabecalho}>
                <h1>Pão de alho</h1>
              </header>
    )
}