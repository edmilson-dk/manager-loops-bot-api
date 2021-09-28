export class NotFoundAdminError extends Error implements UseCaseError {
  constructor(email: string) {
    super(`Admin with email ${email} not found`);
    this.name = "NotFoundAdminError";
  }
}
