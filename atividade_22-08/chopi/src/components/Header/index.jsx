import style from './header.module.css'

export const Header = ({ headerColor }) => {
  return (
    <>
      <header className={`${style.header} ${style[headerColor]}`}>
        <h1>Chopi</h1>
      </header>
    </>
  )
}
