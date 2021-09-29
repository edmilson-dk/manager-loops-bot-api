import { MusicInfosType } from "./types";

export interface IMusicServices {
  getMusicInfosByUrl(url: string): Promise<MusicInfosType>;
}
