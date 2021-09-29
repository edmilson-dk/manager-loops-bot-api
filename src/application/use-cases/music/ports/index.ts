import { Either } from "../../../../_shared/either";
import { InvalidUrlError } from "../errors/invalid-url-error";
import { NotFoundMusicError } from "../errors/not-found-music-error";
import { MusicInfosType } from "../../../services/music/types";

export type AddMusicResponse = Either<InvalidUrlError | NotFoundMusicError, MusicInfosType>;
