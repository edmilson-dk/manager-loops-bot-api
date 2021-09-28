import { IAdminUseCase } from "../../../domain/admin/use-cases";
import { NotFoundAdminError } from "../../../domain/admin/use-cases/errors/not-found-admin-error";
import { FindAdminResponse } from "../../../domain/admin/use-cases/ports";
import { left, right } from "../../../_shared/either";
import { IAdminRepository } from "../../repositories/admin";

export class AdminUseCases implements IAdminUseCase {
  private readonly repository: IAdminRepository;

  constructor(repository: IAdminRepository) {
    this.repository = repository;
  }

  async findAdmin(email: string): Promise<FindAdminResponse> {
    const userOrNull = await this.repository.findAdmin(email);

    if (!userOrNull) {
      return left(new NotFoundAdminError(email));
    }

    return right(userOrNull);
  }
}
