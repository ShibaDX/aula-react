import { useEffect, useState } from 'react'
import style from './main.module.css'

export const Main = () => {
  useEffect(() => {
    console.log('Iniciou o header')
  }, [])

  var [imgName, setImgName] = useState(style.img1)

  useEffect(() => {
    setTimeout(() => {
      setImgName(style.img2)
    }, 1000)
  }, [imgName])

  return (
    <>
      <main className={style.main}>
        <h2>Bem-vindo ao Chopi</h2>
        <div className={style.img + " " + imgName}></div>
      </main>
    </>
  )
}