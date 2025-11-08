
import { useCallback, useEffect, useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Loading } from '../../components/Loading';
import { Toast } from '../../components/Toast';
import { validaPermissao, verificaTokenExpirado } from '../../service/token';
import type { IToken } from '../../interfaces/token';

interface IClientes {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    dataNascimento: string;
    telefone: string;
}

export const Clientes = () => {

    const navigate = useNavigate();

    const [clientes, setClientes] = useState<IClientes[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [messageToast, setMessageToast] = useState('')
    const [corToast, setCorToast] = useState('success')
    const [token, setToken] = useState<IToken>()

    useEffect(() => {
        console.log('Execução ao iniciar a pg')

        let lsToken = localStorage.getItem('chopts:token')

        // add tipagem viuu
        let token: IToken | null = null;

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken)
            setToken(token!)
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate('/')
        }

        setIsLoading(true)
        axios.get('http://localhost:3001/clientes')
            .then((resposta) => {
                console.log(resposta.data)

                setClientes(resposta.data)
            })
            .catch((erro) => {
                console.log(erro)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const excluirClientes = useCallback(async (id: number) => {

        try {

            setIsLoading(true)
            await axios.delete(`http://localhost:3001/clientes/${id}`)

            const { data } = await axios.get('http://localhost:3001/clientes')

            setClientes(data)
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
                color={corToast}
                onClose={() => { setShowToast(false) }}
            />
            <Loading visible={isLoading} />

            <div
                style={{
                    display: 'flex',
                    paddingTop: '10px'
                }}
            >

                <h1 className='me-4'>Lista de Clientes</h1>

                <button
                    type="button"
                    className="btn btn-primary me-2"
                    onClick={() => {
                        navigate('/usuarios')
                    }}
                >
                    Usuários
                </button>
                <button
                    type="button"
                    className="btn btn-success me-2"
                    onClick={() => {
                        navigate('/clientes/cadastrar')
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
                        <th scope="col">CPF</th>
                        <th scope="col">Data Nascimento</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Telefone</th>

                        <th scope="col">Ações</th>


                    </tr>
                </thead>
                <tbody>
                    {
                        //foreach
                        clientes.map((cliente, index) => {
                            return (
                                // key = para diferenciar os elementos, como um id
                                <tr key={index}>
                                    <th scope="row">{cliente.id}</th>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.dataNascimento}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            style={{ marginRight: 5 }}
                                            onClick={() => {
                                                navigate(`/clientes/${cliente.id}`)
                                            }}
                                        >
                                            <FaPen />
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            type="button"
                                            onClick={() => {
                                                excluirClientes(cliente.id)
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