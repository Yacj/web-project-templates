const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
  fastify.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET,
  })

  fastify.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify()
    }
    catch (err) {
      reply.code(401).send({
        success: false,
        message: 'Unauthorized',
        data: null,
      })
      console.table('Authentication failed error', err)
    }
  })
})
