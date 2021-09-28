import { Router } from "express";

import { adminRouter } from "./admin";

export const router: Router = Router();

router.use("/admin", adminRouter);
