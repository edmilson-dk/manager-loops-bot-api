import dotenv from "dotenv";
dotenv.config();

import { server } from "./app/express";

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
