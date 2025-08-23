import { useEffect, useState } from 'react'
import { Header } from './components/Header/'
import { Main } from "./components/Main";
import { Footer } from './components/Footer/'
import './styles/global.css'

function App() {

  return (
    <>
      <Header />

      <Main />

      <Footer />
    </>
  )
}

export default App
