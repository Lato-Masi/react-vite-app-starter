
import { Router } from 'express';
import PingController from './ping.controller';

const router = Router();

router.get('/', PingController.ping);

export default router;
