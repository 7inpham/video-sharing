import { useHistory } from 'react-router'
import { useAuth } from 'context/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
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
      <button onClick={handleClickShare}>
        <FontAwesomeIcon icon={faShareAlt}/>
        <span>Share a movie</span>
      </button>
      <button onClick={handleClickLogout}>
        <FontAwesomeIcon icon={faSignOutAlt}/>
        <span>Logout</span>
      </button>
    </div>
  )
}

export default WelcomeForm
