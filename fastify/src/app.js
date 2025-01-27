require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const responseFormatter = require('./middlewares/response-formatter');

// 注册插件
fastify.register(require('@fastify/cors'));
fastify.register(require('./plugins/swagger'));
fastify.register(require('./plugins/auth'));
fastify.register(require('./plugins/cache'));

// 注册中间件
fastify.addHook('onRequest', responseFormatter);
fastify.setErrorHandler(errorHandler);

// 注册路由
fastify.register(routes);

// 启动服务器
const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT });
        console.log(`Server is running on port ${process.env.PORT}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
