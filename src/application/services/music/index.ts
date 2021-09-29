import { MusicDownloadType, MusicDownloadUrlType, MusicInfosType, MusicUploadType } from "./types";

export interface IMusicServices {
  getMusicInfosByUrl(url: string): Promise<MusicInfosType>;
  uploadMusic(musicInfos: MusicUploadType): Promise<this>;
  downloadUrlMusic(props: MusicDownloadUrlType): Promise<string>;
  downloadMusic(props: MusicDownloadType): Promise<string>;
}
