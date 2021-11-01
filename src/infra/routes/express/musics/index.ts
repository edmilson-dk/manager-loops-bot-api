import { Router } from "express";

import { adaptRoute, adaptRouteWithSendFileStream } from "../../../adapters/express-adapter";
import {
  makeAddMusicController,
  makeDownloadMusicFileController,
  makeDropMusicController,
  makeGetMusicsController,
} from "../../../adapters/makers/musics";
import { authMiddleware } from "../middlewares/auth";

export const musicRouter: Router = Router();

musicRouter.post("/add", adaptRoute(makeAddMusicController()));
musicRouter.get("/list", adaptRoute(makeGetMusicsController()));
musicRouter.get("/download/:id", adaptRouteWithSendFileStream(makeDownloadMusicFileController()));
musicRouter.delete("/drop/:id", adaptRoute(makeDropMusicController()));
