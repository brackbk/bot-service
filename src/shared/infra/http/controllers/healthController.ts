import { Request, Response } from 'express';

export default class HealthController {
  public async check(request: Request, response: Response): Promise<Response> {

    return response.json({
      "status": response.status
    });
  }


}
