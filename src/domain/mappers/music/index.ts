import { MusicDBType } from "../../music/types";

export class MusicMapper {
  public static toDto(data: any): MusicDBType {
    return {
      id: data.id,
      name: data.name,
      artist: data.artist,
      url: data.url,
      position: data.position,
      createdAt: data.createdAt.toISOString(),
      updatedAt: data.updatedAt.toISOString(),
      duration: data.duration,
    };
  }
}
