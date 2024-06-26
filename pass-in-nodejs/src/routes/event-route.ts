import { FastifyInstance } from "fastify";
import { createEventController } from "../controllers/create-event-controller";
import { getEventAttendeesController } from "../controllers/get-event-attendees-controller";
import { getEventController } from "../controllers/get-event-controller";
import { registerForEventController } from "../controllers/register-for-event-controller";

export async function eventRoute(app: FastifyInstance) {
  app.register(createEventController);
  app.register(registerForEventController);
  app.register(getEventController);
  app.register(getEventAttendeesController);
}
