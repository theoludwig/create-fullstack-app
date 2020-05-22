import React, { Fragment } from 'react';

import Head from 'components/Head';
import styles from 'styles/errors.module.css';

const Error404: React.FC = () => {
    return (
        <Fragment>
            <Head />

            <p className={styles.errorParagraph}>404 Error ❌</p>
        </Fragment>
    );
}

export default Error404;