import style from './footer.module.css'

export const Footer = ({ devName, alterar }) => {
  return (
    <>    <footer className={style.footer}>
      <div className={style.dev}>
        <h2>Desenvolvedor: {devName}</h2>
      </div>
      <button onClick={alterar} className={style.button}>Alterar Dev</button>
    </footer>
    </>
  )
}
