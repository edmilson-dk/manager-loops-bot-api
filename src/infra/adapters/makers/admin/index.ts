import { AdminUseCases } from "../../../../application/use-cases/admin";
import { LoginAdminController } from "../../../presentation/controllers/admin/login-admin-controller";
import { BaseController } from "../../../presentation/controllers/base-controller";
import { PrismaPgAdminRepository } from "../../../repositories/prisma/admin/admin-repository";

export function makeLoginAdminController(): BaseController {
  const repository = new PrismaPgAdminRepository();
  const usecases = new AdminUseCases(repository);
  const controller = new LoginAdminController(usecases);

  return controller;
}
