import { IAdminUseCase } from "../../../../domain/admin/use-cases";
import { FindAdminResponse } from "../../../../domain/admin/use-cases/ports";
import { AdminMapper } from "../../../../domain/mappers/admin";
import { createJWT } from "../../../../_shared/security/jwt-token";
import { HttpRequest, HttpResponse } from "../../http/ports";
import { badRequest, ok, serverError } from "../../http/responses";
import { BaseController } from "../base-controller";
import { MissingParamError } from "../errors/missing-params-error";

export class LoginAdminController implements BaseController {
  private readonly adminUseCases: IAdminUseCase;

  constructor(adminUseCases: IAdminUseCase) {
    this.adminUseCases = adminUseCases;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      if (!email || !password) {
        return badRequest(new MissingParamError("Email and password are required"));
      }

      const userOrError: FindAdminResponse = await this.adminUseCases.findAdmin(email, password);

      if (userOrError.isLeft()) {
        return badRequest(userOrError.value, 400);
      }

      const data = AdminMapper.fromDTO(userOrError.value);
      const token = createJWT({ email: data.email, name: data.name });

      return ok({ admin: data, token }, 200);
    } catch (err) {
      return serverError("Interval server error");
    }
  }
}
