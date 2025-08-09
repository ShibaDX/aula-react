import './styles/global.css'
import { Header } from './components/Header/'
import { useEffect, useState } from 'react'

function App() {

  const [contador, setContador] = useState(0)
  useEffect(() => {
    console.log('contar produtos no back-end')
  }, [contador])

  function alerta() {
    alert(`Contador: ${contador}`)
  }

  function somar() {
    setContador(contador + 1)

    console.log(contador)
  }

  return (
    <>
    {
      contador < 5 && (
      <Header />
      )
    }
      <h1>Contador: {contador}</h1>
      <h1 style={{
        backgroundColor: 'black',
        color: 'white'
      }}>Salve o Corinthians</h1>
      <button onClick={alerta}>Aperte me</button>
      <button onClick={somar}>Somar cliques</button>
    </>
  )
}

export default App