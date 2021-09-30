import { HttpRequest, HttpResponse, HttpStreamResponse } from "../http/ports";

export interface BaseController {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse | HttpStreamResponse>;
}
