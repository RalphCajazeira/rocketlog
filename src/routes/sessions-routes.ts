import { Router } from "express";

import { SessionsController } from "@/controllers/sessions-controllers";

const sessionsRoutes = Router();
const sessionController = new SessionsController();

sessionsRoutes.post("/", sessionController.create);

export { sessionsRoutes };
