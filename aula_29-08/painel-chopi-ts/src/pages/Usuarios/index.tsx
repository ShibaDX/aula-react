
import { useEffect, useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import axios from 'axios'

interface IUsuarios {
    id: number;
    nome: string;
    email: string;
}

export const Usuarios = () => {

    const [usuarios, setUsuarios] = useState<IUsuarios[]>([])

    useEffect(() => {
        console.log('Execução ao iniciar a pg')

        axios.get('http://localhost:3001/usuarios')
        .then((resposta) => {
            console.log(resposta.data)

            setUsuarios(resposta.data)
        })
        .catch((erro) => {
            console.log(erro)
        })
    }, [])

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '10px'
                }}
            >
                <h1>Usuarios</h1>
                <button
                    type="button"
                    className="btn btn-success"
                >
                    Adicionar
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //foreach
                        usuarios.map((user, index) => {
                            return (
                                // key = para diferenciar os elementos, como um id
                                <tr key={index}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.nome}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary" style={{marginRight: 5}}><FaPen /></button>
                                        <button type="button" className="btn btn-danger" style={{marginRight: 5}}><FaTrash /></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}