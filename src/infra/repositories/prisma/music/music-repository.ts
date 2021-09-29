import { prismaDB } from "../index";
import { IMusicRepository } from "../../../../application/repositories/music";
import { CreateMusicType } from "../../../../domain/music/types";

export class MusicRepository implements IMusicRepository {
  async addMusic(music: CreateMusicType): Promise<void> {
    await prismaDB.music.create({
      data: {
        artist: music.artist,
        id: music.id,
        name: music.name,
        url: music.url,
      },
    });
  }
}
