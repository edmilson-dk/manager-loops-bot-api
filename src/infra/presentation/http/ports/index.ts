import fs from "fs";

import { Sockets } from "../../../../_shared/sockets";

export interface HttpResponse {
  statusCode: number;
  body: any;
}
export interface HttpStreamResponse {
  statusCode: number;
  body: fs.ReadStream;
}

export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
  io: Sockets;
  rest?: any;
}
