import Loader from 'components/Loader/Loader'
import { useAuth } from 'context/auth'
import { FormEvent, useState } from 'react'
import styles from './LoginForm.module.scss'

function LoginForm() {
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setLoading(true)
      await login(email, password)
    } catch (e) {
      setLoading(false)
      alert(e)
    }
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        <Loader loading={loading} size="small"/>
        <span>Login / Register</span>
      </button>
    </form>
  )
}

export default LoginForm
