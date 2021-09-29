import { AddMusicResponse, GetMusicsResponse } from "../ports";
import { CreateMusicInputType } from "../types";

export interface IMusicUseCases {
  addMusic: (music: CreateMusicInputType) => Promise<AddMusicResponse>;
  getMusics: () => Promise<GetMusicsResponse>;
}
