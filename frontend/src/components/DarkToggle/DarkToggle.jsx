import './darktoggle.css'
import { useTheme } from '../../context/useTheme'

export default function DarkToggle(){

  const {theme, toggleTheme} = useTheme();

  return(
    <>
      <button onClick = {toggleTheme} className = {`theme-toggle-button ${theme === 'dark' && 'dark-toggle-btn'}`}>{theme === 'light'? '☾' : '☼'}</button>
      {console.log(theme)}
    </>

  )

}