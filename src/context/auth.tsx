import { useState, createContext, useEffect, ReactNode, useContext } from 'react'
import { config } from 'config'
import { IUser } from 'types/user'
import { registerOrLogin } from 'services/user'

type ContextProps = {
  user: IUser | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

type ProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as ContextProps)

const AuthProvider = (props: ProviderProps) => {
  const [ user, setUser ] = useState<IUser | null>(null)
  
  useEffect(() => {
    const cache = localStorage.getItem(config.localStorage.userKey)
    if (cache) {
      try {
        setUser(JSON.parse(cache))
      } catch(e) {
        setUser(null)
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    const result = await registerOrLogin(email, password)
    setUser(result)
    localStorage.setItem(config.localStorage.userKey, JSON.stringify(result))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(config.localStorage.userKey)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
