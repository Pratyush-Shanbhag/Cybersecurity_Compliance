import Fastify from 'fastify';
import cors from '@fastify/cors';
import formSubmitRoutes from './routes/form-submit.mjs'
const fastify = Fastify({ logger: true });

fastify.register(formSubmitRoutes)

fastify.register(cors, {
    origin: '*', // Allow all origins. You can specify an array of origins if you want to restrict it.
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server is running at port 3000`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
