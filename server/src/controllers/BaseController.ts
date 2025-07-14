import { Response } from "express";

export class BaseController {
  success<T>(res: Response, data: T, message = "Success") {
    return res.status(200).json({ success: true, message, data });
  }

  error(res: Response, error: Error & { statusCode?: number }) {
    const status = error.statusCode || 500;
    return res.status(status).json({ success: false, message: error.message });
  }
}
