import { prismaDB } from "../index";
import { IMusicRepository } from "../../../../application/repositories/music";
import { CreateMusicType, MusicDBType } from "../../../../domain/music/types";

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

  async getMusics(): Promise<MusicDBType[]> {
    const data = await prismaDB.music.findMany();

    return data.map((music) => {
      return {
        id: music.id,
        name: music.name,
        artist: music.artist,
        url: music.url,
        createdAt: music.createdAt.toISOString(),
        updatedAt: music.updatedAt.toISOString(),
      };
    });
  }
}
