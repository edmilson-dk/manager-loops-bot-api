import { IMusicUseCases } from "../../../../domain/music/use-cases";
import { HttpRequest, HttpResponse } from "../../http/ports";
import { badRequest, ok, serverError } from "../../http/responses";
import { BaseController } from "../base-controller";
import { MissingParamError } from "../errors/missing-params-error";

export class DropMusicController implements BaseController {
  private readonly musicUseCase: IMusicUseCases;

  constructor(musicUseCase: IMusicUseCases) {
    this.musicUseCase = musicUseCase;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      if (!id) {
        return badRequest(new MissingParamError("id"));
      }

      await this.musicUseCase.dropMusic(id, httpRequest.rest.io);

      return ok({ message: "Music deleted" });
    } catch (err) {
      return serverError("Interval server error");
    }
  }
}
