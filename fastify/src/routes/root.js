module.exports = async function (fastify, opts) {
    fastify.get('/', async (req, res) => {
        res.send('Hello World!');
    });
}
