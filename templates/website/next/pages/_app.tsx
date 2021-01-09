import '@fontsource/roboto/400.css'

import 'normalize.css/normalize.css'

import { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Component {...pageProps} />

      <style jsx global>
        {`
          *::before,
          *::after {
            box-sizing: border-box;
          }
          html {
            font-size: 62.5%; /* 1 rem = 10px; 10px/16px = 62.5% */
          }
          body {
            --default-font-size: 1.6rem;
            --color-background-primary: #181818;
            --color-primary: #ffd800;
            --color-secondary: rgb(222, 222, 222);

            display: flex;
            flex-flow: column wrap;
            background-color: var(--color-background-primary);
            color: var(--color-secondary);
            font-size: var(--default-font-size);
            font-family: 'Roboto', 'Arial', 'sans-serif';
            font-weight: 400;
          }
          #__next {
            max-width: 100%;
          }
          a {
            color: var(--color-primary);
          }
        `}
      </style>
    </>
  )
}

export default App
