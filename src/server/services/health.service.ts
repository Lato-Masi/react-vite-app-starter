
import { Router, Request, Response } from 'express';

class HealthService {
  public getHealth(): { status: string } {
    return { status: 'UP' };
  }
}

export default new HealthService();
