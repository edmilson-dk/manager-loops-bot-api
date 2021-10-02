import { Router } from "express";

import { adaptRoute } from "../../../adapters/express-adapter";
import { makeLoginAdminController } from "../../../adapters/makers/admin";

export const adminRouter: Router = Router();

adminRouter.post("/login", adaptRoute(makeLoginAdminController()));
