import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom"
import { Home } from "./pages/Home"
import { Categorias } from "./pages/Categorias"
import { Usuarios } from "./pages/Usuarios"
import GerenciarUsuarios from "./pages/Usuarios/Gerenciar"
import { Sobre } from "./pages/Sobre"
import Login from "./pages/Login"

export const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Login />}
                />
                <Route
                    path="/home"
                    element={<Home />}
                />
                <Route
                    path="/categorias/:id"
                    element={<Categorias />}
                />
                <Route
                    path="/sobre/:id"
                    element={<Sobre />}
                />
                <Route
                    path="/usuarios"
                    element={<Usuarios />}
                />
                <Route
                    path="/usuarios/:id"
                    element={<GerenciarUsuarios />}
                />
                <Route // Rota não existente
                    path="*"
                    element={<h1>404 Page not Found</h1>}
                />
            </Routes>
        </BrowserRouter>
    )
}