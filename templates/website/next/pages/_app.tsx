import { AppProps } from 'next/app'

/* Global CSS (and Fonts) Imports */
import 'styles/normalize.css'
import theme from 'styles/theme'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Component {...pageProps} />

      <style jsx global>{`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          #__next {
            min-height: 100vh;
          }
          body {
            display: flex;
            flex-flow: column wrap;
            background-color: ${theme.colors.background};
            color: ${theme.colors.text};
            font-family: ${theme.fontFamily};
            font-weight: 400;
            font-size: 18px;
          }
        `}
      </style>
    </>
  )
}

export default MyApp
