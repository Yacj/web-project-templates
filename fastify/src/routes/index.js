const userRoutes = require('./user');
const userRoot = require('./root');
const apiRoutes = require('./api');
module.exports = async function (fastify, opts) {
    fastify.register(userRoot, { prefix: '/' })
    fastify.register(apiRoutes, { prefix: '/api' });
    fastify.register(userRoutes, { prefix: '/api/users' });
};
