
import { useCallback, useEffect, useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading';
import { Toast } from '../../components/Toast';
import { verificaTokenExpirado } from '../../service/token';

interface IUsuarios {
    id: number;
    nome: string;
    email: string;
}

export const Usuarios = () => {

    const navigate = useNavigate();

    const [usuarios, setUsuarios] = useState<IUsuarios[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [messageToast, setMessageToast] = useState('')
    const [corToast, setCorToast] = useState('success')

    useEffect(() => {
        console.log('Execução ao iniciar a pg')

        let lsToken = localStorage.getItem('chopts:token')

        // add tipagem viuu
        let token: any = null;

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken)
        }

        if (!token) {
            navigate('/')
        }

        setIsLoading(true)
        axios.get('http://localhost:3001/users')
            .then((resposta) => {
                console.log(resposta.data)

                setUsuarios(resposta.data)
            })
            .catch((erro) => {
                console.log(erro)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const excluirUsuarios = useCallback(async (id: number) => {

        try {

            setIsLoading(true)
            await axios.delete(`http://localhost:3001/users/${id}`)

            const { data } = await axios.get('http://localhost:3001/users')

            setUsuarios(data)
            setShowToast(true)
            setMessageToast('Usuário deletado com sucesso :D')
            setCorToast('success')
        } catch (erro) {
            alert('Erro: Ligue para o suporte: ')
            setShowToast(true)
            setMessageToast('Erro ao deletar usuário ;(')
            setCorToast('danger')
            console.log(erro)
        }
        setIsLoading(false)
    }, [])

    return (
        <>
            <Toast
                show={showToast}
                message={messageToast}
                // bg={corToast}
                onClose={() => { setShowToast(false) }}
            />
            <Loading visible={isLoading} />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '10px'
                }}
            >
                <h1>Usuarios</h1>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        navigate('/usuarios/cadastrar')
                    }}
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
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            style={{ marginRight: 5 }}
                                            onClick={() => {
                                                // navigate('/usu..'+usuario.id)
                                                navigate(`/usuarios/${user.id}`)
                                            }}
                                        >
                                            <FaPen />
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={() => {
                                                excluirUsuarios(user.id)
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
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