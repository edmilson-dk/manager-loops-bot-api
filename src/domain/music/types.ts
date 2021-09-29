export type CreateMusicType = {
  name: string;
  artist: string;
  url: string;
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
  createdAt: string;
  updatedAt: string;
};
