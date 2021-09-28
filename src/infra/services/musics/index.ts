import ytdl from "ytdl-core";

import { IMusicServices } from "../../../application/services/music";
import { InvalidUrlError } from "../../../application/services/music/errors/invalid-url-error";
import { GetMusicInfosByUrlResponse } from "../../../application/services/music/ports";
import { left, right } from "../../../_shared/either";
import { isValidUrl } from "../../../_shared/validations";

export class MusicServices implements IMusicServices {
  constructor() {}

  async getMusicInfosByUrl(url: string): Promise<GetMusicInfosByUrlResponse> {
    const urlValidation = isValidUrl(url);

    if (!urlValidation) {
      return left(new InvalidUrlError(url));
    }

    const info = await ytdl.getInfo(url);

    return right({
      name: info.videoDetails.title,
    });
  }
}
