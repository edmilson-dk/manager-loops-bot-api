import dotenv from "dotenv";
import { Boot } from "../_shared/boot";
dotenv.config();

import { server, socket } from "./app/express";

const boot = new Boot(socket);
const PORT = process.env.PORT || 8080;

server.on("request", async () => {
  console.log("Updating musics");
  await boot.bootstrap();
});

server.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await boot.bootstrap();
});
