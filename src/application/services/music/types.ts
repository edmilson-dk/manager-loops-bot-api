export type MusicInfosType = {
  name: string;
};

export type MusicUploadType = {
  saveName: string;
  filePath: string;
};

export type MusicDownloadUrlType = {
  saveToPath: string;
  url: string;
  saveName: string;
  fn: Function;
};

export type MusicDownloadType = {
  saveToPath: string;
  fileName: string;
};
