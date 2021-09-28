import { AdminDBType } from "../../../domain/admin/types";

export interface IAdminRepository {
  findAdmin: (id: string) => Promise<AdminDBType | null>;
}
