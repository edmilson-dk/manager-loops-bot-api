import { IMusicUseCases } from "../../../../domain/music/use-cases";
import { HttpRequest, HttpResponse } from "../../http/ports";
import { ok, serverError } from "../../http/responses";
import { BaseController } from "../base-controller";

export class GetMusicsController implements BaseController {
  private readonly musicUseCase: IMusicUseCases;

  constructor(musicUseCase: IMusicUseCases) {
    this.musicUseCase = musicUseCase;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const musics = await this.musicUseCase.getMusics();
      return ok({ musics }, 200);
    } catch (err) {
      return serverError("Interval server error");
    }
  }
}
