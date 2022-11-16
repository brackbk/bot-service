import { Router } from 'express';

import dialogFlowRouter from '@modules/dialogflow/infra/http/routes/dialogflow.routes';
import rdStationRouter from '@modules/rdstation/infra/http/routes/rdstation.routes';
import healthRouter from './health.routes';

const routes = Router();

routes.use('/dialogflow', dialogFlowRouter);
routes.use('/rdstation/conversion', rdStationRouter);
routes.use(healthRouter);

export default routes;
