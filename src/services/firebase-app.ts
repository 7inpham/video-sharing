import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from '@firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { config } from 'config'

let app
if (!getApps().length) {
  app = initializeApp(config.firebase)
} else {
  app = getApp()
}

const firestore = getFirestore(app)
const auth = getAuth(app)

export {
  app,
  auth,
  firestore
}
