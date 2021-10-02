import { GetMusicsResponse } from "../../../domain/music/ports";
import { CreateMusicType, MusicDBType } from "../../../domain/music/types";

export interface IMusicRepository {
  addMusic: (music: CreateMusicType) => Promise<{ position: number }>;
  getMusics: () => Promise<GetMusicsResponse>;
  getMusic: (id: string) => Promise<MusicDBType | null>;
  dropMusicById: (id: string) => Promise<void>;
}
