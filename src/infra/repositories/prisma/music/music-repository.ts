import { prismaDB } from "../index";
import { IMusicRepository } from "../../../../application/repositories/music";
import { CreateMusicType, MusicDBType } from "../../../../domain/music/types";
import { MusicMapper } from "../../../../domain/mappers/music";

export class MusicRepository implements IMusicRepository {
  async addMusic(music: CreateMusicType): Promise<{ position: number }> {
    const lastMusicByPosition = await prismaDB.music.findMany({
      orderBy: { position: "desc" },
    });

    const newPosition = lastMusicByPosition[0]?.position + 1 ?? 0;

    const position = await prismaDB.music.create({
      data: {
        artist: music.artist,
        id: music.id,
        name: music.name,
        url: music.url,
        position: newPosition,
      },
      select: {
        position: true,
      },
    });

    return position;
  }

  async getMusics(): Promise<MusicDBType[]> {
    const data = await prismaDB.music.findMany({
      orderBy: { position: "asc" },
    });

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

  async dropMusicById(id: string): Promise<void> {
    await prismaDB.music.delete({
      where: { id },
    });
  }
}
