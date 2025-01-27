const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
  fastify.register(import('@fastify/swagger'), {
    swagger: {
      info: {
        title: 'API Documentation',
        version: '1.0.0',
      },
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'JWT Authorization',
        },
      },
    },
  })
  fastify.register(import('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
    },
  })
})
