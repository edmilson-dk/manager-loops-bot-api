export class InvalidUrlError extends Error implements ServicesError {
  constructor(url: string) {
    super(`Invalid url: ${url}`);
    this.name = "InvalidUrlError";
  }
}
