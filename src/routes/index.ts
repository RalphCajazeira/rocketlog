import { Router } from "express";

import { userRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { deliveriesRoutes } from "./deliveries-routes";
import { deliveryLogsRouter } from "./delivery-logs-routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/deliveries", deliveriesRoutes);

routes.use("/deliveries-logs", deliveryLogsRouter);

export { routes };
