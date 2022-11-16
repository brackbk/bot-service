import { Router } from 'express';

import HealthController from '../controllers/healthController';


const healthRouter = Router();
const healthController = new HealthController();

healthRouter.get(
    '/health',
    healthController.check,
  );

export default healthRouter;
