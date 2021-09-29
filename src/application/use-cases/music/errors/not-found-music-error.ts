export class NotFoundMusicError extends Error implements UseCaseError {
  constructor(url: string) {
    super(`Music with url ${url} not found`);
    this.name = "NotFoundMusicError";
  }
}
