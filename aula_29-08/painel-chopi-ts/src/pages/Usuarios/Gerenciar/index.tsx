import axios from "axios";
import { useCallback, useRef, type SyntheticEvent } from "react"

export default function GerenciarUsuarios() {

    const refForm = useRef<any>(null)

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault(); // evita que a página recarregue sozinha
        if (refForm.current.checkValidity()) {
            const target = event.target as typeof event.target & {
                nome: { value: string },
                email: { value: string }
            }

            let objSalvar = {
                nome: target.nome.value,
                email: target.email.value
            }

            axios.post('http://localhost:3001/usuarios', objSalvar)
                .then(() => {
                    alert('Salvo!')
                })
                .catch((erro) => {
                    console.log(erro)
                    alert('Deu ruim')
                })
        } else {
            refForm.current.classList.add('was-validated')
        }
    }, [])

    return (
        <>
            <div className="container mt-3">
                <h1>Usuario</h1>
                <form className="needs-validation g-3 row" noValidate ref={refForm} onSubmit={submitForm}>
                    <div className="col-md-12">
                        <label htmlFor="nome" className="formLabel"> Nome </label>
                        <input type="text" className="form-control" placeholder="Digite seu nome" id="nome" required />
                        <div className="invalid-feedback">Por favor digite seu nome.</div>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="email" className="formLabel"> Email </label>
                        <input type="email" className="form-control" placeholder="Digite seu email" id="email" required />
                        <div className="invalid-feedback">Por favor digite seu email.</div>
                    </div>
                    <div className="col-md-12">
                        <button className="btn" type="button">Voltar</button>
                        <input type="submit" value="Enviar" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </>
    )
}