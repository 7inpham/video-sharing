import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase-app'
import { IUser } from 'types/user'

async function registerOrLogin(email: string, password: string): Promise<IUser> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    return {
      id: result.user.uid,
      email
    }
  } catch(e: any) {
    if (e.code === 'auth/email-already-in-use') {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return {
        id: result.user.uid,
        email
      }
    }
    throw e
  }
}

export {
  registerOrLogin
}
