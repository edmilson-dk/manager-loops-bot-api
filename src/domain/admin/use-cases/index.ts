import { FindAdminResponse } from "./ports";

export interface IAdminUseCase {
  findAdmin: (email: string, password: string) => Promise<FindAdminResponse>;
}
