import { Either } from "../../../_shared/either";
import { InvalidUrlError } from "../errors/invalid-url-error";
import { NotFoundMusicError } from "../errors/not-found-music-error";
import { MusicDBType, MusicFileInfosType, MusicType } from "../types";

export type AddMusicResponse = Either<InvalidUrlError | NotFoundMusicError, MusicType>;
export type GetMusicsResponse = MusicDBType[];
export type GetMusicResponse = Either<NotFoundMusicError, MusicFileInfosType>;
