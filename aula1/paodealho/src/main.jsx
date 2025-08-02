import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <App />
  // tag com inicial maiúsculo = reconhece como código React
  // tag com inicial minusculo = reconhece como HMTL
)
