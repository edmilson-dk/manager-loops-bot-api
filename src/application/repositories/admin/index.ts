import { AdminDBType } from "../../../domain/admin/types";

export interface IAdminRepository {
  findAdmin: (email: string) => Promise<AdminDBType | null>;
}
