import axios from "axios";
import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../../components/Loading";

export default function GerenciarClientes() {

    const navigate = useNavigate();
    const { id } = useParams();
    const refForm = useRef<any>(null);
    const [isEditar, setIsEditar] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        const idCliente = Number(id)
        console.log(idCliente);
        console.log(!isNaN(idCliente))

        if (!isNaN(idCliente)) {
            console.log('é numero')
            setIsEditar(true)
            console.log(isEditar)

            setIsLoading(true)

            axios.get(`http://localhost:3001/clientes?id=${idCliente}`)
                .then(({ data }) => {

                    refForm.current['nome'].value = data[0].nome
                    refForm.current['cpf'].value = data[0].cpf
                    refForm.current['dataNascimento'].value = data[0].dataNascimento
                    refForm.current['email'].value = data[0].email
                    refForm.current['telefone'].value = data[0].telefone
                    refForm.current['logradouro'].value = data[0].logradouro
                    refForm.current['numero'].value = data[0].numero
                    refForm.current['complemento'].value = data[0].complemento
                    refForm.current['bairro'].value = data[0].bairro
                    refForm.current['cidade'].value = data[0].cidade
                    refForm.current['estado'].value = data[0].estado
                })
                .catch((erro) => {
                    console.log(erro)
                })
                .finally(() => {
                    setIsLoading(false)
                })

        }
    }, [id])

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();



        if (refForm.current.checkValidity()) {

            const target = event.target as typeof event.target & { // tipagem dos dados
                id: { value: number },
                nome: { value: string },
                cpf: { value: string },
                dataNascimento: { value: string },
                email: { value: string },
                telefone: { value: string },
                logradouro: { value: string },
                numero: { value: string },
                complemento: { value: string },
                bairro: { value: string },
                cidade: { value: string },
                estado: { value: string },
            }

            let objSalvar = {
                id: target.id.value,
                nome: target.nome.value,
                cpf: target.cpf.value,
                dataNascimento: target.dataNascimento.value,
                email: target.email.value,
                telefone: target.telefone.value,
                logradouro: target.logradouro.value,
                numero: target.numero.value,
                complemento: target.complemento.value,
                bairro: target.bairro.value,
                cidade: target.cidade.value,
                estado: target.estado.value,
            }

            setIsLoading(true)

            if (isEditar) {
                console.log('esta editando');
                setIsLoading(true)
                axios.put('http://localhost:3001/clientes/' + id, objSalvar)
                    .then(() => {
                        alert('Editado com sucesso.')
                        navigate('/clientes')
                    })
                    .catch((erro) => {
                        console.log(erro)
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })

            } else {
                console.log('esta criando');
                setIsLoading(true)

                axios.post('http://localhost:3001/clientes', objSalvar)
                    
                    .then(() => {
                        alert('Salvo que alegria :D')
                        navigate('/clientes')
                    })
                    .catch((erro) => {
                        console.log(erro)
                        alert('deu ruim que triste :(')
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })
            }

            setIsLoading(false)

        } else {
            refForm.current.classList.add('was-validated')
        }


    }, [isEditar, id])

    return (
        <>
            <Loading visible={isLoading} />
            <div className="container">
                <h1>{isEditar ? "Editar" : "Cadastrar"} Cliente</h1>

                <form
                    noValidate
                    className="needs-validation g-3 row"
                    ref={refForm}
                    onSubmit={submitForm}
                >
                    <div className="col-md-12">
                        <label
                            htmlFor="nome"
                            className="formLabel"
                        >
                            Nome
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Digite seu nome"
                            id="nome"
                            required
                        />
                        <div className="invalid-feedback">
                            Por favor digite seu nome.
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label
                            htmlFor="cpf"
                            className="formLabel"
                        >
                            CPF
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="000.000.000-00"
                            id="cpf"
                            required
                        />
                        <div className="invalid-feedback">
                            Por favor digite seu CPF.
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label
                            htmlFor="dataNascimento"
                            className="formLabel"
                        >
                            Data de Nascimento
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="dataNascimento"
                            required
                        />
                        <div className="invalid-feedback">
                            Por favor insira sua data de nascimento.
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label
                            htmlFor="email"
                            className="formLabel"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Digite seu email"
                            id="email"
                            required
                        />
                        <div className="invalid-feedback">
                            Por favor digite seu email.
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label
                            htmlFor="telefone"
                            className="formLabel"
                        >
                            Telefone
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="(00) 00000-0000"
                            id="telefone"
                            required
                        />
                        <div className="invalid-feedback">
                            Por favor digite um número de telefone.
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label
                            htmlFor="logradouro"
                            className="formLabel"
                        >
                            Logradouro
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex: Rua das Flores, Av. Brasil"
                            id="logradouro"
                            required
                        />
                        <div className="invalid-feedback">
                            Por favor digite um logradouro.
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label
                            htmlFor="numero"
                            className="formLabel"
                        >
                            Número
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex: 0000"
                            id="numero"
                            maxLength={4}
                            required
                        />
                        <div className="invalid-feedback">
                            Por favor digite o número do endereço.
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label
                            htmlFor="complemento"
                            className="formLabel"
                        >
                            Complemento
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex: Apt 101, Casa"
                            id="complemento"
                        />
                    </div>

                    <div className="col-md-12">
                        <label
                            htmlFor="bairro"
                            className="formLabel"
                        >
                            Bairro
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex: Centro, Jardim América"
                            id="bairro"
                            required
                        />
                        <div className="invalid-feedback">
                            Por favor digite o bairro do endereço.
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label
                            htmlFor="cidade"
                            className="formLabel"
                        >
                            Cidade
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex: São Paulo, Rio de Janeiro"
                            id="cidade"
                            required
                        />
                        <div className="invalid-feedback">
                            Por favor digite uma cidade.
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label
                            htmlFor="estado"
                            className="formLabel"
                        >
                            Estado (UF)
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Ex: SP, RJ, PR"
                            id="estado"
                            maxLength={2}
                            required
                        />
                        <div className="invalid-feedback">
                            Por favor digite um estado.
                        </div>
                    </div>

                    <div className="col-md-12">

                        <button
                            className="btn"
                            type="button"
                            onClick={() => {
                                navigate('/clientes/')
                            }}
                        >Voltar</button>

                        <button
                            className="btn btn-primary"
                            type="submit"
                        >{isEditar ? "Editar" : "Cadastrar"}</button>
                    </div>

                </form>
            </div>
        </>
    )
}