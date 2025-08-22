import { Router } from "express";

import { DeliveriesLogsController } from "@/controllers/deliveries-logs-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveryLogsRouter = Router();
const deliveriesLogsController = new DeliveriesLogsController();

deliveryLogsRouter.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "admin"]),
  deliveriesLogsController.create
);

deliveryLogsRouter.get(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "admin", "customer"]),
  deliveriesLogsController.index
);

deliveryLogsRouter.get(
  "/:delivery_id",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "admin", "customer"]),
  deliveriesLogsController.show
);

export { deliveryLogsRouter };
