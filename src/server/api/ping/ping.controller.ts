
import { Request, Response } from 'express';
import PingService from './ping.service';

class PingController {
  static async ping(req: Request, res: Response) {
    const message = await PingService.ping();
    res.status(200).send({ message });
  }
}

export default PingController;
