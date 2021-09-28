import express, { json, urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";

import { router } from "../../../infra/routes/express";

const app: express.Application = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/api", router);

export { app };
