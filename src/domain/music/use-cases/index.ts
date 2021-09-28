import { CreateMusicType } from "../types";

export interface IMusicUseCases {
  addMusic: (music: CreateMusicType) => Promise<void>;
}
