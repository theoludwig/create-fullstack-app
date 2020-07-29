require('dotenv').config();

const app = require('fastify')({ logger: true });
const cors = require('fastify-cors');
const db = require('./database/db');
const routes = require('./routes/routes');

const env = process.env; // environment variables
const port = env.PORT || 5000;
// plugins
app.register(cors); // cors activating
app.register(db); // mongoose connecting

// routes
routes.map((route) => app.route(route));

const start = async () => {
	try {
		await app.listen(port);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
start();
