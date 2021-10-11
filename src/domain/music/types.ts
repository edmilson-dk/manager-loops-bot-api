export type CreateMusicType = {
  name: string;
  artist: string;
  url: string;
  duration: number;
  id: string;
};

export type CreateMusicInputType = {
  url: string;
  artist: string;
};

export type MusicDBType = {
  id: string;
  name: string;
  artist: string;
  url: string;
  duration: number;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export type MusicFileInfosType = MusicDBType & {
  fileName: string;
  filePath: string;
};

export type MusicType = {
  id: string;
  name: string;
  artist: string;
  url: string;
  position: number;
  duration: number;
};
