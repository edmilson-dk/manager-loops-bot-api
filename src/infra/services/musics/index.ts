import ytdl from "ytdl-core";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

import { IMusicServices } from "../../../application/services/music";
import {
  GetLocalMusicStreamType,
  MusicDownloadUrlType,
  MusicInfosType,
} from "../../../application/services/music/types";

export class MusicServices implements IMusicServices {
  constructor() {}

  async getMusicInfosByUrl(url: string): Promise<MusicInfosType> {
    const info = await ytdl.getInfo(url);

    return {
      name: info.videoDetails.title,
    };
  }

  async downloadUrlMusic(
    { saveName, saveToPath, url }: MusicDownloadUrlType,
    callback: Function,
  ): Promise<string> {
    const saveMusicStream = fs.createWriteStream(saveToPath);

    const readableStream = ytdl(url, {
      quality: "highestaudio",
      filter: "audioonly",
    });

    readableStream.pipe(saveMusicStream).on("finish", () => {
      callback();
    });

    return saveToPath;
  }

  async getLocalMusicStream(props: GetLocalMusicStreamType): Promise<fs.ReadStream> {
    const readableStream = fs.createReadStream(props.filePath);
    console.log(`${props.fileName} is streaming`);
    return readableStream;
  }
}
