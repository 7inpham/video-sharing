import styles from './Loader.module.scss'

type Props = {
  loading?: boolean
  size?: 'small' | 'medium'
}

function Loader(props: Props) {
  const styleSize = props.size === 'small' ? styles.small : ''

  return (
    <>
      {
        props.loading
        &&
        <div className={styles.container}>
          <div className={`${styles.loader} ${styleSize}`}>
            <div></div>
            <div></div>
          </div>
        </div>
      }
    </>
  )
}

export default Loader
