import dotenv from "dotenv";
import { Boot } from "../_shared/boot";
dotenv.config();

import { server, socket } from "./app/express";

const boot = new Boot(socket);
const PORT = process.env.PORT || 8080;

socket.ioServer.on("updated_musics", async () => {
  await boot.updateMusicsFiles();
});

server.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await boot.bootstrap();
});
