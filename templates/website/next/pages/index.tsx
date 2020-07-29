import Head from 'components/Head'

const Home: React.FC = () => {
  return (
    <>
      <Head />

      <p>Hello world! 👋</p>

      <style jsx>{`
        p {
          margin-left: 15px;
        }
      `}
      </style>
    </>
  )
}

export default Home
