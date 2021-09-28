import { FindAdminResponse } from "./ports";

export interface IAdminUseCase {
  findAdmin: (email: string) => Promise<FindAdminResponse>;
}
