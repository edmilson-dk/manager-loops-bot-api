import fs from "fs";

import { GetLocalMusicStreamType, MusicDownloadUrlType, MusicInfosType } from "./types";

export interface IMusicServices {
  getMusicInfosByUrl(url: string): Promise<MusicInfosType>;
  downloadUrlMusic(props: MusicDownloadUrlType, callback: Function): Promise<string>;
  getLocalMusicStream(props: GetLocalMusicStreamType): Promise<fs.ReadStream>;
  deleteFile(path: string): Promise<void>;
  getLocalMusicsFiles(filesPath: string): Promise<string[]>;
}
