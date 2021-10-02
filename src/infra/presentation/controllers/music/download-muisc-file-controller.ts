import { IMusicServices } from "../../../../application/services/music";
import { IMusicUseCases } from "../../../../domain/music/use-cases";
import { HttpRequest, HttpStreamResponse } from "../../http/ports";
import { badRequest, ok, serverError } from "../../http/responses";
import { BaseController } from "../base-controller";
import { MissingParamError } from "../errors/missing-params-error";

export class DownloadMusicFileController implements BaseController {
  private readonly musicUseCase: IMusicUseCases;
  private readonly musicServices: IMusicServices;

  constructor(musicUseCase: IMusicUseCases, musicServices: IMusicServices) {
    this.musicUseCase = musicUseCase;
    this.musicServices = musicServices;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpStreamResponse> {
    try {
      const { id } = httpRequest.params;

      if (!id) {
        return badRequest(new MissingParamError("Id is required"));
      }

      const musicOrError = await this.musicUseCase.getMusic(id);

      if (musicOrError.isLeft()) {
        return badRequest(musicOrError.value, 400);
      }

      const music = musicOrError.value;
      const musicStream = await this.musicServices.getLocalMusicStream({
        fileName: music.fileName,
        filePath: music.filePath,
      });

      return ok(musicStream);
    } catch (err) {
      return serverError("Interval server error");
    }
  }
}
