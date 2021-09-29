import { GetMusicsResponse } from "../../../domain/music/ports";
import { CreateMusicType } from "../../../domain/music/types";

export interface IMusicRepository {
  addMusic: (music: CreateMusicType) => Promise<void>;
  getMusics: () => Promise<GetMusicsResponse>;
}
