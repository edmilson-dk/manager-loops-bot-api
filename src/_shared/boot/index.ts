import path from "path";

import { MusicDBType } from "../../domain/music/types";
import { MusicRepository } from "../../infra/repositories/prisma/music/music-repository";
import { MusicServices } from "../../infra/services/musics";
import { SOCKET_EVENTS } from "../events";
import { Sockets } from "../sockets";

const saveYTMusicFrom = path.resolve(__dirname + "../../../../musics/youtube");

export class Boot {
  private musicServices = new MusicServices();
  private musicRepository = new MusicRepository();
  private readonly socket: Sockets;

  constructor(socket: Sockets) {
    this.socket = socket;
  }

  private async downloadMusic(music: MusicDBType) {
    await this.musicServices.downloadUrlMusic(
      {
        saveName: music.id,
        saveToPath: `${saveYTMusicFrom}/${music.id}.mp3`,
        url: music.url,
      },
      async () => {
        console.log("Music file updated");
        console.log(`Saving to ${saveYTMusicFrom}/${music.id}.mp3`);
        this.socket.io.emit(SOCKET_EVENTS.addedNewMusic, music);
      },
    );
  }

  public async updateMusicsFiles() {
    const musicsDb = await this.musicRepository.getMusics();

    await Promise.all(
      musicsDb.map(async (music) => {
        return await this.downloadMusic(music);
      }),
    );
  }

  private async reloadMusics() {
    const musicsDb = await this.musicRepository.getMusics();
    const musicsInMemory = await this.musicServices.getLocalMusicsFiles(saveYTMusicFrom);
    const removedFileNotUsed = musicsInMemory.filter((file) => file !== "file.txt");

    const musicsNotInMemory = musicsDb.filter((music) => {
      return !removedFileNotUsed.includes(`${music.id}.mp3`);
    });

    if (musicsNotInMemory.length > 0) {
      await Promise.all(
        musicsNotInMemory.map(async (music) => {
          return await this.downloadMusic(music);
        }),
      );
    }
  }

  async bootstrap() {
    await this.reloadMusics();
  }
}
