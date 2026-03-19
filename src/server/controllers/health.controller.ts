
import { Request, Response } from 'express';
import HealthService from '../services/health.service';

class HealthController {
  public getHealth(req: Request, res: Response): void {
    const health = HealthService.getHealth();
    res.status(200).send(health);
  }
}

export default new HealthController();
