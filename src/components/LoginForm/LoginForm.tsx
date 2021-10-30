import { useAuth } from 'context/auth'
import { FormEvent, useState } from 'react'
import styles from './LoginForm.module.scss'

function LoginForm() {
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await login(email, password)
    } catch (e) {
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
      <input type="submit" value="Login / Register"/>
    </form>
  )
}

export default LoginForm
