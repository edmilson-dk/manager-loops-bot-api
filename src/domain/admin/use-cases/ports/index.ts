import { Either } from "../../../../_shared/either";
import { AdminDBType } from "../../types";
import { NotFoundAdminError } from "../errors/not-found-admin-error";

export type FindAdminResponse = Either<NotFoundAdminError, AdminDBType>;
