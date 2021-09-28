import { Either } from "../../../../_shared/either";
import { InvalidUrlError } from "../errors/invalid-url-error";
import { NotFoundMusicError } from "../errors/not-found-music-error";
import { MusicInfosType } from "../types";

export type GetMusicInfosByUrlResponse = Either<
  InvalidUrlError | NotFoundMusicError,
  MusicInfosType
>;
