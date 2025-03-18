const fp = require('fastify-plugin')
const NodeCache = require('node-cache')

module.exports = fp(async (fastify, opts) => {
  const cache = new NodeCache()

  fastify.decorate('cache', cache)
})
