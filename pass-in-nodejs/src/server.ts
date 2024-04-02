import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { eventRoute } from "./routes/event-route";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(eventRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log(`🚀 HTTP server listening on port 3333`);
  });
