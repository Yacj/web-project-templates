module.exports = async (request, reply) => {
  const send = reply.send

  reply.send = function (payload) {
    const swaggerRoutes = ['/docs', '/swagger.json']
    if (swaggerRoutes.some(route => request.url.startsWith(route))) {
      return send.call(this, payload)
    }

    // 如果 payload 已经是一个标准格式的错误响应，直接发送
    if (payload && payload.success === false) {
      return send.call(this, payload)
    }

    // 如果 payload 是错误对象，直接发送
    if (payload instanceof Error) {
      return send.call(this, payload)
    }

    // 统一响应格式
    return send.call(this, {
      success: true,
      message: 'success',
      data: payload,
      code: 200,
    })
  }
}
