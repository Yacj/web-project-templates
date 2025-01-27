module.exports = async (error, request, reply) => {
  const statusCode = error.statusCode || 500
  reply.code(statusCode).send({
    success: false,
    message: error.message || 'Internal Server Error',
    data: null,
    code: statusCode,
  })

  require('../utils/logger').error({
    error: error.message,
    stack: error.stack,
    path: request.url,
  })
}
