import { prismaDB } from "../index";
import { IAdminRepository } from "../../../../application/repositories/admin";
import { AdminDBType } from "../../../../domain/admin/types";

export class PrismaPgAdminRepository implements IAdminRepository {
  constructor() {}

  async findAdmin(email: string): Promise<AdminDBType | null> {
    const admin = await prismaDB.admin.findUnique({ where: { email } });

    if (admin) {
      return {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        createdAt: admin.createdAt.toISOString(),
        updatedAt: admin.updatedAt.toISOString(),
        password: admin.password,
      };
    }

    return null;
  }
}
