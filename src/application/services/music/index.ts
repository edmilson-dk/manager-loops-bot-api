import { GetMusicInfosByUrlResponse } from "./ports";

export interface IMusicServices {
  getMusicInfosByUrl(url: string): Promise<GetMusicInfosByUrlResponse>;
}
