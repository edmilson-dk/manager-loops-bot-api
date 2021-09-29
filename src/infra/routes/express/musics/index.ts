import { Router } from "express";

import { adaptRoute } from "../../../adapters/express-adapter";
import { makeAddMusicController } from "../../../adapters/makers/musics";

export const musicRouter: Router = Router();

musicRouter.post("/add", adaptRoute(makeAddMusicController()));
