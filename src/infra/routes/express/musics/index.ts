import { Router } from "express";

import { adaptRoute } from "../../../adapters/express-adapter";
import { makeAddMusicController } from "../../../adapters/makers/musics";
import { authMiddleware } from "../middlewares/auth";

export const musicRouter: Router = Router();

musicRouter.post("/add", authMiddleware, adaptRoute(makeAddMusicController()));
