import dotenv from "dotenv";
import { Boot } from "../_shared/boot";
dotenv.config();

import { server, socket, app } from "./app/express";

const boot = new Boot(socket);
const PORT = process.env.PORT || 8080;

app.use("/api/update", async (req, res) => {
  await boot.updateMusicsFiles();
  res.send({ ok: true });
});

server.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await boot.bootstrap();
});
