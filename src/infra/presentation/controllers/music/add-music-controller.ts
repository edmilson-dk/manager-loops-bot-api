import { IMusicServices } from "../../../../application/services/music";
import { IMusicUseCases } from "../../../../domain/music/use-cases";
import { HttpRequest, HttpResponse } from "../../http/ports";
import { badRequest, ok, serverError } from "../../http/responses";
import { BaseController } from "../base-controller";
import { MissingParamError } from "../errors/missing-params-error";

export class AddMusicController implements BaseController {
  private readonly musicUseCase: IMusicUseCases;
  private readonly musicServices: IMusicServices;

  constructor(musicUseCase: IMusicUseCases, musicServices: IMusicServices) {
    this.musicUseCase = musicUseCase;
    this.musicServices = musicServices;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { url, artist } = httpRequest.body;

      if (!url || !artist) {
        return badRequest(new MissingParamError("Url is required"));
      }

      const infosOrError = await this.musicServices.getMusicInfosByUrl(url);

      if (infosOrError.isLeft()) {
        return badRequest(infosOrError.value, 400);
      }

      const musicInfos = infosOrError.value;
      await this.musicUseCase.addMusic({
        name: musicInfos.name,
        artist,
        url,
      });

      return ok({ music: musicInfos }, 201);
    } catch (err) {
      return serverError("Interval server error");
    }
  }
}
