import dotenv from "dotenv";
dotenv.config();
import path from "path";

import { CreateMusicInputType, MusicFileInfosType } from "../../../domain/music/types";
import { IMusicUseCases } from "../../../domain/music/use-cases";
import { generateUUID } from "../../../helpers";
import { left, right } from "../../../_shared/either";
import { isValidUrl } from "../../../_shared/validations";
import { IMusicRepository } from "../../repositories/music";
import { IMusicServices } from "../../services/music";
import { InvalidUrlError } from "../../../domain/music/errors/invalid-url-error";
import { AddMusicResponse, GetMusicResponse, GetMusicsResponse } from "../../../domain/music/ports";
import { NotFoundMusicError } from "../../../domain/music/errors/not-found-music-error";
import { Sockets } from "../../../_shared/sockets";
import { SOCKET_EVENTS } from "../../../_shared/events";

const saveYTMusicFrom = path.resolve(__dirname + "../../../../../musics/youtube");

export class MusicUseCases implements IMusicUseCases {
  private readonly musicRepository: IMusicRepository;
  private readonly musicServices: IMusicServices;

  constructor(musicRepository: IMusicRepository, musicServices: IMusicServices) {
    this.musicRepository = musicRepository;
    this.musicServices = musicServices;
  }

  async addMusic(music: CreateMusicInputType, socket: Sockets): Promise<AddMusicResponse> {
    const urlValidation = isValidUrl(music.url);

    if (!urlValidation) {
      return left(new InvalidUrlError(music.url));
    }

    const infos = await this.musicServices.getMusicInfosByUrl(music.url);
    const id = generateUUID();

    const position = await this.musicRepository.addMusic({
      artist: music.artist,
      url: music.url,
      name: infos.name,
      id,
    });

    const musicInfos = {
      id,
      name: infos.name,
      artist: music.artist,
      url: music.url,
      position: position.position,
    };

    const downloadData = {
      saveName: id,
      saveToPath: `${saveYTMusicFrom}/${id}.mp3`,
      url: music.url,
    };

    await this.musicServices.downloadUrlMusic(downloadData, async () => {
      console.log("Download complete");
      console.log(`Saving to ${saveYTMusicFrom}/${id}.mp3`);
      socket.ioServer.emit(SOCKET_EVENTS.addedNewMusic, musicInfos);
    });

    return right(musicInfos);
  }

  async getMusics(): Promise<GetMusicsResponse> {
    const musics = await this.musicRepository.getMusics();
    return musics;
  }

  async getMusic(id: string): Promise<GetMusicResponse> {
    const musicOrNull = await this.musicRepository.getMusic(id);

    if (!musicOrNull) {
      return left(new NotFoundMusicError(id));
    }

    const fileInfos = {
      fileName: `${musicOrNull.id}.mp3`,
      filePath: `${saveYTMusicFrom}/${musicOrNull.id}.mp3`,
    };

    const musicInfos: MusicFileInfosType = {
      ...musicOrNull,
      ...fileInfos,
    };

    return right(musicInfos);
  }

  async dropMusic(id: string, socket: Sockets): Promise<void> {
    const musicOrNull = await this.musicRepository.getMusic(id);

    if (!musicOrNull) {
      return;
    }

    const filePath = `${saveYTMusicFrom}/${musicOrNull.id}.mp3`;

    await this.musicRepository.dropMusicById(id);
    await this.musicServices.deleteFile(filePath);

    socket.ioServer.emit(SOCKET_EVENTS.droppedMusic, {
      id,
      name: musicOrNull.name,
      position: musicOrNull.position,
    });

    return;
  }
}
