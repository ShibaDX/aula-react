import { useState } from 'react'
import { Header } from './components/Header/'
import { Main } from "./components/Main";
import { Footer } from './components/Footer/'
import './styles/global.css'

function App() {
  const [devName, setDevName] = useState("ShibaDX")
  const [headerColor, setHeaderColor] = useState("color-1")

  function alterar() {
    if (devName === "ShibaDX") {
      setDevName("ShiNN")
      setHeaderColor("color-2")
    } else {
      setDevName("ShibaDX")
      setHeaderColor("color-1")
    }
  }

  return (
    <>
      <Header headerColor={headerColor} />
      <Main />
      <Footer devName={devName} alterar={alterar} />
    </>
  )
}

export default App
