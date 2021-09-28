import { AdminDBType } from "../types";

export interface IAdminUseCase {
  findAdmin: (id: string) => Promise<AdminDBType | null>;
}
