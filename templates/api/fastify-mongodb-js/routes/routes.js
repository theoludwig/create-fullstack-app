const handlers = require('./handlers');

const routes = [
	{
		method     : 'GET',
		url        : '/api',
		preHandler : [
			// Here you can use middleware(s)
		],
		handler    : handlers.home
	}
];

module.exports = routes;
