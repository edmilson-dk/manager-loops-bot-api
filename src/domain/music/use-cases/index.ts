import { Sockets } from "../../../_shared/sockets";
import { AddMusicResponse, GetMusicResponse, GetMusicsResponse } from "../ports";
import { CreateMusicInputType } from "../types";

export interface IMusicUseCases {
  addMusic: (music: CreateMusicInputType, socket: Sockets) => Promise<AddMusicResponse>;
  getMusics: () => Promise<GetMusicsResponse>;
  getMusic: (id: string) => Promise<GetMusicResponse>;
}
