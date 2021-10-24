import express, { json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import http from "http";

import { router } from "../../../infra/routes/express";
import { Sockets } from "../../../_shared/sockets";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const socket = new Sockets(server);

socket.onStartEvents();

app.use((req, res, next) => {
  req.io = socket;
  return next();
});

app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api", router);

export { app, server, socket };
