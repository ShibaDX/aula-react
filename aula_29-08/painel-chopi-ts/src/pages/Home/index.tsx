import { useNavigate } from "react-router-dom"

export const Home = () => {
    
    const navigate = useNavigate();

    return (
        <>
            <h1>Home</h1>
            <button
                onClick={() => {
                    navigate('/categorias/saopaulo')
                }}
            >
                Navegar para Categorias
            </button>
            <a onClick={() => {
                    navigate('/categorias/Corinthians')
                }}>Corinthians</a>
        </>
    )
}