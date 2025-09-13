import { useParams } from "react-router-dom"

export const Sobre = () => {
    const { id } = useParams();

    return (
        <>
            <h1>Sobre selecionado: {id}</h1>
        </>
    )
}