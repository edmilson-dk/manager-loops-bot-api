import JWT, { VerifyCallback } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function createJWT(payload: any, expires = "3d") {
  const token = JWT.sign(payload, process.env.SECRET as string, {
    expiresIn: expires,
  });

  return token;
}

export function verifyJWT(token: string, callback: VerifyCallback) {
  JWT.verify(token, process.env.SECRET as string, callback);
}
