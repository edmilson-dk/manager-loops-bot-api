import { IAdminUseCase } from "../../../domain/admin/use-cases";
import { InvalidCredentialsError } from "../../../domain/admin/use-cases/errors/invalid-credentials-error";
import { NotFoundAdminError } from "../../../domain/admin/use-cases/errors/not-found-admin-error";
import { FindAdminResponse } from "../../../domain/admin/use-cases/ports";
import { left, right } from "../../../_shared/either";
import { isValidEmail } from "../../../_shared/validations";
import { IAdminRepository } from "../../repositories/admin";

export class AdminUseCases implements IAdminUseCase {
  private readonly repository: IAdminRepository;

  constructor(repository: IAdminRepository) {
    this.repository = repository;
  }

  async findAdmin(email: string, password: string): Promise<FindAdminResponse> {
    const emailValidation = isValidEmail(email);

    if (!emailValidation) {
      return left(new InvalidCredentialsError());
    }

    const userOrNull = await this.repository.findAdmin(email);

    if (!userOrNull) {
      return left(new NotFoundAdminError(email));
    }

    if (userOrNull.password !== password) {
      return left(new InvalidCredentialsError());
    }

    return right(userOrNull);
  }
}
