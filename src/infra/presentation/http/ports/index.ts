import fs from "fs";

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
  rest?: any;
}
