import { Either } from "../../../../_shared/either";
import { AdminDBType } from "../../types";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { NotFoundAdminError } from "../errors/not-found-admin-error";

export type FindAdminResponse = Either<NotFoundAdminError | InvalidCredentialsError, AdminDBType>;
