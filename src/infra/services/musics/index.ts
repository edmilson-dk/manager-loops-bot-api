import ytdl from "ytdl-core";
import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import EventEmitter from "events";

import { IMusicServices } from "../../../application/services/music";
import {
  MusicDownloadType,
  MusicDownloadUrlType,
  MusicInfosType,
  MusicUploadType,
} from "../../../application/services/music/types";

const eventEmitter = new EventEmitter();
const storage = new Storage({
  keyFilename: process.env.FIREBASE_KEYS_JSON,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const bucketName = process.env.FIREBASE_STORAGE_BUCKET as string;
const bucket = storage.bucket(bucketName);

export class MusicServices implements IMusicServices {
  constructor() {}

  async getMusicInfosByUrl(url: string): Promise<MusicInfosType> {
    const info = await ytdl.getInfo(url);

    return {
      name: info.videoDetails.title,
    };
  }

  async uploadMusic(musicInfos: MusicUploadType): Promise<this> {
    const fileReference = bucket.file(musicInfos.saveName);

    const fileStream = fileReference.createWriteStream({
      metadata: {
        contentType: "audio/mpeg",
      },
    });

    const readableStream = fs.createReadStream(musicInfos.filePath);
    readableStream.pipe(fileStream);

    fileStream.on("finish", () => {
      console.log(`${musicInfos.saveName} uploaded to ${bucketName}`);
    });

    return this;
  }

  async downloadUrlMusic({ saveName, saveToPath, url, fn }: MusicDownloadUrlType): Promise<string> {
    const saveMusicStream = fs.createWriteStream(saveToPath);

    const readableStream = ytdl(url, {
      quality: "highestaudio",
      filter: "audioonly",
    });

    readableStream.pipe(saveMusicStream).on("finish", () => {
      console.log(`${saveName} downloaded to ${saveToPath}`);
      eventEmitter.emit("downloaded", {
        saveName,
        saveToPath,
      });
      fn();
    });

    return saveToPath;
  }

  async downloadMusic(props: MusicDownloadType): Promise<string> {
    storage
      .bucket(bucketName)
      .file(props.fileName)
      .createReadStream()
      .pipe(fs.createWriteStream(props.saveToPath))
      .on("finish", () => {
        console.log(`${props.fileName} from firebase downloaded to ${props.saveToPath}`);
      });

    return props.saveToPath;
  }
}
