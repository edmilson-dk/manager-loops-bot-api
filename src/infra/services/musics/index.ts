import ytdl from "ytdl-core";

import { IMusicServices } from "../../../application/services/music";
import { InvalidUrlError } from "../../../application/use-cases/music/errors/invalid-url-error";
import { left, right } from "../../../_shared/either";
import { isValidUrl } from "../../../_shared/validations";
import { MusicInfosType } from "../../../application/services/music/types";

export class MusicServices implements IMusicServices {
  constructor() {}

  async getMusicInfosByUrl(url: string): Promise<MusicInfosType> {
    const info = await ytdl.getInfo(url);

    return {
      name: info.videoDetails.title,
    };
  }
}
