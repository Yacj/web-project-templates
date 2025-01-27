const fp = require('fastify-plugin');
const NodeCache = require('node-cache');

module.exports = fp(async function (fastify, opts) {
    const cache = new NodeCache();

    fastify.decorate('cache', cache);
});
