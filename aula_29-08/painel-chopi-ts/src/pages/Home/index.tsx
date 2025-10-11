import { useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'

export const Home = () => {

    const navigate = useNavigate();
    var [novaTarefa, setTarefa] = useState("");
    var [tarefas, setTarefas] = useState([]);

    function adicionarTarefa() {
        setTarefas([...tarefas, novaTarefa]);
        console.log(tarefas);
    }

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
            <button
                onClick={() => {
                    navigate('/sobre/10')
                }}
            >
                Navegar para Sobre
            </button>
            <button
                onClick={() => {
                    navigate('/usuarios')
                }}
            >
                Navegar para Usuarios
            </button>
            <a onClick={() => {
                navigate('/categorias/Corinthians')
            }}>Corinthians</a>

            <div className="container mt-5">
                <h2 className="h2">Atividades</h2>
                <form action="" className="g-3 row">
                    <div className="col-md-12 mt-3">
                        <input type="text" value={novaTarefa} onChange={(e) => setTarefa(e.target.value)} placeholder="Digite uma atividade" className="form-control" />
                        <button type="button" onClick={adicionarTarefa} className="btn btn-primary mt-3">Adicionar</button>

                    </div>
                </form>
                <ul>
                    {tarefas.map((tarefa, index) => (
                        <li key={index}>{tarefa}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}