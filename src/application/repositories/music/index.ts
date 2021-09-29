import { GetMusicsResponse } from "../../../domain/music/ports";
import { CreateMusicType, MusicDBType } from "../../../domain/music/types";

export interface IMusicRepository {
  addMusic: (music: CreateMusicType) => Promise<void>;
  getMusics: () => Promise<GetMusicsResponse>;
  getMusic: (id: string) => Promise<MusicDBType | null>;
}
