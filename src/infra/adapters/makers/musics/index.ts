import { MusicUseCases } from "../../../../application/use-cases/music";
import { BaseController } from "../../../presentation/controllers/base-controller";
import { AddMusicController } from "../../../presentation/controllers/music/add-music-controller";
import { MusicRepository } from "../../../repositories/prisma/music/music-repository";
import { MusicServices } from "../../../services/musics";

export function makeAddMusicController(): BaseController {
  const musicServices = new MusicServices();
  const musicRepository = new MusicRepository();
  const musicUseCases = new MusicUseCases(musicRepository, musicServices);
  const controller = new AddMusicController(musicUseCases);
  return controller;
}
