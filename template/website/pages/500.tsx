import React, { Fragment } from "react";

import Head from "components/Head";
import styles from "styles/errors.module.css";

const Error500: React.FC = () => {
    return (
        <Fragment>
            <Head />

            <p className={styles.errorParagraph}>500 Error ❌</p>
        </Fragment>
    );
};

export default Error500;
