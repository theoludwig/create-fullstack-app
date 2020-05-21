/* Modules */
import path from 'path';
import express from "express";
import dotenv from 'dotenv';
dotenv.config({
    path: path.join(__dirname, "..", (process.env.NODE_ENV === 'production') ? '.env.production' : '.env')
});

/* Files Imports & Variables */
import sequelize from './assets/utils/sequelize';
import { PORT } from './assets/config/config';
import { get404, get500 } from './controllers/errors';
const app = express();

/* Middlewares */
import helmet from 'helmet';
import { redirectToHTTPS } from 'express-http-to-https';
import morgan from 'morgan';
import cors from 'cors';
app.use(helmet());
app.use(redirectToHTTPS([/localhost:(\d{4})/]));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

/* Routes */
app.use(express.static(path.join(__dirname, "..", "public")));
app.use('/posts', require('./routes/posts'));

/* Errors Handling */
app.use(get404);
app.use(get500);

/* Server */
// sequelize.sync({ force: true })
sequelize.sync()
    .then(() => {
        app.listen(PORT, () =>  console.log('\x1b[36m%s\x1b[0m', `Started on port ${PORT}.`));
    })
    .catch((error) => console.error(error));