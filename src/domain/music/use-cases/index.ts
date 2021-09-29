import { AddMusicResponse } from "../../../application/use-cases/music/ports";
import { CreateMusicInputType } from "../types";

export interface IMusicUseCases {
  addMusic: (music: CreateMusicInputType) => Promise<AddMusicResponse>;
}
