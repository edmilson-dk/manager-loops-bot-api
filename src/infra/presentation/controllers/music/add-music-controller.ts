import { IMusicUseCases } from "../../../../domain/music/use-cases";
import { HttpRequest, HttpResponse } from "../../http/ports";
import { badRequest, ok, serverError } from "../../http/responses";
import { BaseController } from "../base-controller";
import { MissingParamError } from "../errors/missing-params-error";

export class AddMusicController implements BaseController {
  private readonly musicUseCase: IMusicUseCases;

  constructor(musicUseCase: IMusicUseCases) {
    this.musicUseCase = musicUseCase;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { url, artist } = httpRequest.body;

      if (!url || !artist) {
        return badRequest(new MissingParamError("Url is required"));
      }

      const infosOrError = await this.musicUseCase.addMusic({
        url,
        artist,
      });

      if (infosOrError.isLeft()) {
        return badRequest(infosOrError.value, 400);
      }

      const music = infosOrError.value;
      const infos = {
        url,
        artist,
        name: music.name,
        id: music.id,
        position: music.position,
      };

      httpRequest.rest.io.emit("addNewMusic", infos);

      return ok({ infos }, 201);
    } catch (err) {
      console.log(err);
      return serverError("Interval server error");
    }
  }
}
