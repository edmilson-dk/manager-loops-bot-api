import { HttpRequest, HttpResponse } from "../http/ports";

export interface BaseController {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>;
}
