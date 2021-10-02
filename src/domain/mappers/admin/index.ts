import { AdminDTO } from "../../admin/types";

export class AdminMapper {
  static fromDTO(response: any): AdminDTO {
    return {
      id: response.id,
      name: response.name,
      email: response.email,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
  }
}
