import Head from 'components/Head'
import styles from 'styles/errors.module.css'

const Error500: React.FC = () => {
  return (
    <>
      <Head />

      <p className={styles.errorParagraph}>500 Error ❌</p>
    </>
  )
}

export default Error500
