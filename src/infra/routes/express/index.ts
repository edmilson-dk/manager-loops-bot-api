import { Router } from "express";

import { adminRouter } from "./admin";
import { musicRouter } from "./musics";

export const router: Router = Router();

router.use("/admin", adminRouter);
router.use("/musics", musicRouter);
