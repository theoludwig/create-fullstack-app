import { AppProps } from 'next/app'

import 'normalize.css/normalize.css'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Component {...pageProps} />

      <style jsx global>
        {`
          *,
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
            --color-secondary: #dedede;
            display: flex;
            flex-flow: column wrap;
            background-color: var(--color-background-primary);
            color: var(--color-secondary);
            font-size: var(--default-font-size);
            font-family: 'Arial', 'sans-serif';
            font-weight: 400;
          }
          #__next {
            max-width: 100%;
          }
          a {
            font-size: 14px;
            color: var(--color-primary);
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </>
  )
}

export default MyApp
