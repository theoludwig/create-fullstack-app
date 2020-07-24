import React from 'react'

import Head from 'components/Head'
import styles from 'styles/errors.module.css'

const Error404: React.FC = () => {
  return (
    <>
      <Head />

      <p className={styles.errorParagraph}>404 Error ❌</p>
    </>
  )
}

export default Error404
