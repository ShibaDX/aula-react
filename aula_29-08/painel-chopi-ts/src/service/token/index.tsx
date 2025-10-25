import { jwtDecode } from "jwt-decode"

export const verificaTokenExpirado = (token?: string) => {
    if (token) {
        let decodedToken = jwtDecode(token)

        if (
            !decodedToken.exp || decodedToken.exp < new Date().getTime() / 1000
        ) {
            // token expirado
            return true
        }
        // tudo ok
        return false

    }
    // não tem token
    return true
}

export const validaPermissao = (
    permissaoToken: string | undefined,
    permissao: Array<string>
    // permissao: string[]  - mesma coisa
) => {

    if (permissaoToken) {

        if (typeof permissaoToken === 'string') {

            const temAlgumaPermissao = permissao.includes(permissaoToken)

            return temAlgumaPermissao

        }
    }

    return false

}