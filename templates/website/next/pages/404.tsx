import Head from 'components/Head'
import { ErrorPage } from 'components/ErrorPage'

const Error404: React.FC = () => {
  return (
    <>
      <Head title='Not Found' />

      <ErrorPage message='This page could not be found.' statusCode={404} />
    </>
  )
}

export default Error404
