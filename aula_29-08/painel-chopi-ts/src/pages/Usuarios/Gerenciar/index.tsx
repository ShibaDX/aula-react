import axios from "axios";
import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function GerenciarUsuarios() {

    const navigate = useNavigate();
    const { id } = useParams();
    const refForm = useRef<any>(null);
    const [isEditar, setIsEditar] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        const idUser = Number(id)
        console.log(idUser);

        if (!isNaN(idUser)) {
            console.log('é numero')
            setIsEditar(true)

            axios.get(`http://localhost:3001/users?id=${idUser}`)
                .then(({ data }) => {
                    refForm.current['nome'].value = data[0].nome
                    refForm.current['email'].value = data[0].email
                    refForm.current['senha'].value = data[0].senha
                    refForm.current['permissoes'].value = data[0].permissoes
                })
                .catch((erro) => {
                    console.log(erro)
                })
        }
    }, [id])

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault();

        setIsLoading(true)

        if (refForm.current.checkValidity()) {



            const target = event.target as typeof event.target & { // tipagem dos dados
                nome: { value: string },
                email: { value: string },
                senha: { value: string },
                permissoes: { value: string },
            }

            let objSalvar = {
                nome: target.nome.value,
                email: target.email.value,
                senha: target.senha.value,
                permissoes: target.permissoes.value,
            }

            if (isEditar) {
                console.log('esta editando');
                setIsLoading(true)

                axios.put('http://localhost:3001/users/' + id, objSalvar)
                    .then(() => {


                        alert('Editado com sucesso.')
                        navigate('/usuarios')

                    })
                    .catch((erro) => {
                        console.log(erro)
                    })

            } else {
                console.log('esta criando');
                setIsLoading(true)
                axios.post('http://localhost:3001/users', objSalvar)
                    .then(() => {
                        alert('Salvo que alegria :D')
                        navigate('/usuarios')
                    })
                    .catch((erro) => {
                        console.log(erro)
                        alert('deu ruim que triste :(')
                    })
            }



        } else {
            refForm.current.classList.add('was-validated')
        }


    }, [isEditar, id])

    return (
        <>
            <div className="container">
                <h1>{isEditar ? "Editar" : "Cadastrar"} Usuário</h1>

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
                            htmlFor="senha"
                            className="formSenha"
                        >
                            Senha
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Digite sua senha"
                            id="senha"
                            required
                        />
                        <div className="invalid-feedback">
                            Por favor digite uma senha.
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label
                            htmlFor="permissoes"
                            className="formPermissoes"
                        >
                            Permissões
                        </label>
                        <select
                            className="form-select"
                            defaultValue={""}
                            id="permissoes"
                            required
                        >
                            <option value="" disabled>Selecione o Tipo</option>
                            <option value="Colaborador">Colaborador</option>
                            <option value="Admin">Admin</option>
                        </select>
                        <div className="invalid-feedback">
                            Por favor selecione uma permissão.
                        </div>
                    </div>

                    <div className="col-md-12">

                        <button
                            className="btn"
                            type="button"
                            onClick={() => {
                                navigate('/usuarios/')
                            }}
                        >Voltar</button>

                        <button
                            className="btn btn-primary"
                            type="submit"
                        > {isLoading ? "CARREGANDO" : ""} {isEditar ? "Editar" : "Cadastrar"}</button>
                    </div>

                </form>
            </div>
        </>
    )
}