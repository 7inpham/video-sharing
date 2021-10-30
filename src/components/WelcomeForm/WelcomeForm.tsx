import { useHistory } from 'react-router'
import { useAuth } from 'context/auth'
import styles from './WelcomeForm.module.scss'

function WelcomeForm() {
  const { user, logout } = useAuth()
  const history = useHistory()

  const handleClickShare = () => {
    history.push('/share')
  }

  const handleClickLogout = () => {
    logout()
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Welcome {user?.email}</div>
      <button onClick={handleClickShare}>Share a movie</button>
      <button onClick={handleClickLogout}>Logout</button>
    </div>
  )
}

export default WelcomeForm
