import Link from "next/link"
// navega entre as páginas sem recarregar a página
// semelhante ao componente <a> do HTML

const data = [
    { id: 1, nome: 'Games' },
    { id: 2, nome: 'Eletrodomésticos' }
]

export const Menu = () => {
    return (
        <nav className="bg-black p-4 text-white">
            <div className="flex justify-between items-center">
                <Link href={'/'} className="hover:text-red-500">Chopts</Link>

                <div>
                    <ul className="flex space-x-4">
                        {
                            data.map((menu) => (
                                <li key={menu.id}>
                                    <Link href={'/home'} className="hover:text-red-500">{menu.nome}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}