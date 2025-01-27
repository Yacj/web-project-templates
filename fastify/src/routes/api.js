module.exports = async function (fastify, opts) {
    fastify.get('/test', async (request, reply) => {
        return { key: 'value' }; // 响应会被包装成统一格式
    });
    fastify.get('/error', async (request, reply) => {
        const error = new Error('This is a custom error');
        error.statusCode = 501; // 设置特定的错误码
        throw error;
    });
}
