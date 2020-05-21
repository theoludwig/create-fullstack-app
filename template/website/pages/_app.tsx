import { Fragment } from "react";
import { AppProps } from "next/app";

/* Global CSS (and Fonts) Imports */
import 'styles/normalize.css';
import theme from 'styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Fragment>
            <Component {...pageProps} />

            <style jsx global>{`
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
            `}</style>
        </Fragment>
    );
}

export default MyApp;