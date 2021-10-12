export type MusicInfosType = {
  name: string;
  duration: number;
};

export type MusicDownloadUrlType = {
  saveToPath: string;
  url: string;
  saveName: string;
};

export type GetLocalMusicStreamType = {
  filePath: string;
  fileName: string;
};
