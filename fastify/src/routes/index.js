const apiRoutes = require('./api')
const userRoot = require('./root')
const userRoutes = require('./user')

module.exports = async function (fastify) {
  fastify.register(userRoot, { prefix: '/' })
  fastify.register(apiRoutes, { prefix: '/api' })
  fastify.register(userRoutes, { prefix: '/api/users' })
}
