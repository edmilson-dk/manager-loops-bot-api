import { Request } from "express";

import { Sockets } from "../../src/_shared/sockets";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      io: Sockets;
    }
  }
}
