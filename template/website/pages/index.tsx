import React, { Fragment } from 'react';
import Head from 'components/Head';

const Home: React.FC = () => {
    return (
        <Fragment>
            <Head />

            <p>Hello world! 👋</p>

            <style jsx>{`
                p {
                    margin-left: 15px;
                }
            `}</style>
        </Fragment>
    );
}

export default Home;