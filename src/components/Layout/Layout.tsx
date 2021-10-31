import { ReactNode } from 'react'
import Header from 'components/Header/Header'
import styles from './Layout.module.scss'

type Props = {
  children: ReactNode
}

function Layout(props: Props) {
  return (
    <>
      <Header/>
      <div className={styles.body}>
        {props.children}
      </div>
    </>
  )
}
export default Layout
