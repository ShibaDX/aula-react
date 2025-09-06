import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import { Home } from "./pages/Home"
import { Categorias } from "./pages/Categorias"
import { Usuarios } from "./pages/Usuarios"

export const Rotas = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route
                path="/" 
                element={<Home />} 
                />
            <Route 
                path="/categorias/:id"
                element={<Categorias />}
            />
            <Route 
                path="/usuarios"
                element={<Usuarios />}
                />
            <Route // Rota não existente
                path="*"
                element={<h1>404 Page not Found</h1>}
            />
        </Routes>
    </BrowserRouter>
    )
}