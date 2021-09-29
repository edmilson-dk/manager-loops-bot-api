export class InvalidUrlError extends Error implements UseCaseError {
  constructor(url: string) {
    super(`Invalid url: ${url}`);
    this.name = "InvalidUrlError";
  }
}
