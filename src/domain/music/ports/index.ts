import { Either } from "../../../_shared/either";
import { InvalidUrlError } from "../errors/invalid-url-error";
import { NotFoundMusicError } from "../errors/not-found-music-error";
import { MusicInfosType } from "../../../application/services/music/types";
import { MusicDBType, MusicFileInfosType } from "../types";

export type AddMusicResponse = Either<InvalidUrlError | NotFoundMusicError, MusicInfosType>;
export type GetMusicsResponse = MusicDBType[];
export type GetMusicResponse = Either<NotFoundMusicError, MusicFileInfosType>;
