import { prismaDB } from "../index";
import { IMusicRepository } from "../../../../application/repositories/music";
import { CreateMusicType, MusicDBType } from "../../../../domain/music/types";
import { MusicMapper } from "../../../../domain/mappers/music";

export class MusicRepository implements IMusicRepository {
  async addMusic(music: CreateMusicType): Promise<void> {
    const musicsCount = await prismaDB.music.count();

    await prismaDB.music.create({
      data: {
        artist: music.artist,
        id: music.id,
        name: music.name,
        url: music.url,
        position: musicsCount,
      },
    });
  }

  async getMusics(): Promise<MusicDBType[]> {
    const data = await prismaDB.music.findMany();

    return data.map((music) => {
      return MusicMapper.fromDto(music);
    });
  }

  async getMusic(id: string): Promise<MusicDBType | null> {
    const data = await prismaDB.music.findUnique({
      where: { id },
    });

    if (!data) return null;

    return MusicMapper.fromDto(data);
  }
}
