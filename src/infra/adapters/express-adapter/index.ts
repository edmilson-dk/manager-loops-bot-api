import { Request, Response } from "express";

import { BaseController } from "../../presentation/controllers/base-controller";
import { HttpRequest } from "../../presentation/http/ports";

export const adaptRoute = (controller: BaseController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      rest: { ...req },
    };

    const httpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};

export const adaptRouteWithSendFileStream = (controller: BaseController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      rest: { ...req },
    };

    const httpResponse = await controller.handle(httpRequest);
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Disposition", `attachment; filename=${req.params.id}`);
    httpResponse.body.pipe(res);
  };
};
