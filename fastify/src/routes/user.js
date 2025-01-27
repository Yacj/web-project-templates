const User = require('../models/user');

module.exports = async function (fastify, opts) {
    // 获取用户列表
    fastify.get('/', {
        schema: {
            description: '获取用户列表',
            tags: ['users'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                        message: { type: 'string' },
                        data: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number' },
                                    username: { type: 'string' }
                                }
                            }
                        }
                    }
                }
            }
        },
        handler: async (request, reply) => {
            return await User.findAll({
                attributes: ['id', 'username']
            });
        }
    });

    // 用户登录
    fastify.post('/login', {
        schema: {
            description: '用户登录',
            tags: ['users'],
            body: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' }
                }
            }
        },
        handler: async (request, reply) => {
            const { username, password } = request.body;
            const user = await User.findOne({ where: { username, password } });

            if (!user) {
                throw new Error('Invalid credentials');
            }

            const token = fastify.jwt.sign({ id: user.id });
            return { token };
        }
    });
};
