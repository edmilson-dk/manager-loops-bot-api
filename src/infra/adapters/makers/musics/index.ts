import { MusicUseCases } from "../../../../application/use-cases/music";
import { BaseController } from "../../../presentation/controllers/base-controller";
import { AddMusicController } from "../../../presentation/controllers/music/add-music-controller";
import { DownloadMusicFileController } from "../../../presentation/controllers/music/download-muisc-file-controller";
import { GetMusicsController } from "../../../presentation/controllers/music/get-musics-controller";
import { MusicRepository } from "../../../repositories/prisma/music/music-repository";
import { MusicServices } from "../../../services/musics";

const musicServices = new MusicServices();
const musicRepository = new MusicRepository();
const musicUseCases = new MusicUseCases(musicRepository, musicServices);

export function makeAddMusicController(): BaseController {
  const controller = new AddMusicController(musicUseCases);
  return controller;
}

export function makeGetMusicsController(): BaseController {
  const controller = new GetMusicsController(musicUseCases);
  return controller;
}

export function makeDownloadMusicFileController(): BaseController {
  const controller = new DownloadMusicFileController(musicUseCases, musicServices);
  return controller;
}
