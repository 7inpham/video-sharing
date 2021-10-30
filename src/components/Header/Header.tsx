import LoginForm from 'components/LoginForm/LoginForm'
import WelcomeForm from 'components/WelcomeForm/WelcomeForm'
import { useAuth } from 'context/auth'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

function Header() {
  const { user } = useAuth()
  return (
    <header className={styles.container}>
      <div className={styles.branding}>
        <Link to="/">Funny Movies</Link>
      </div>
      {
        user ? <WelcomeForm/> : <LoginForm/>
      }
    </header>
  )
}
export default Header