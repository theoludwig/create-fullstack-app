import Head from 'components/Head'
import { ErrorPage } from 'components/ErrorPage'

const Error500: React.FC = () => {
  return (
    <>
      <Head title='Server Error' />

      <ErrorPage message='Internal Server Error.' statusCode={500} />
    </>
  )
}

export default Error500
