/* Modules */
const next            = require('next');
const express         = require("express");
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

/* Variables */
const PORT   = process.env.PORT || 3000;
const dev    = process.env.NODE_ENV !== "production";
const app    = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    /* Middlewares */
    server.use(redirectToHTTPS([/localhost:(\d{4})/]));

    /* Routes */
    server.all("*", (req, res) => {
        return handle(req, res);
    });

    /* Server */
    server.listen(PORT, (error) => {
        if (error) throw error;
        console.log(`> Ready on http://localhost:${PORT}`);
    });
});