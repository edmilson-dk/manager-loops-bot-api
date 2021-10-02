export class MissingParamError extends Error implements ControllerError {
  constructor(message: string) {
    super(message);
    this.name = "MissingParamError";
  }
}
