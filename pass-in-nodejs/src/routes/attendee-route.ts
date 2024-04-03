import { FastifyInstance } from "fastify";
import { checkInController } from "../controllers/check-in-controller";
import { getAttendeeBadgeController } from "../controllers/get-attendee-badge-controller";

export async function attendeeRoute(app: FastifyInstance) {
  app.register(getAttendeeBadgeController);
  app.register(checkInController);
}
