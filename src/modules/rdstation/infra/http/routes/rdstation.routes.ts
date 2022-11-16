import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import RdStationController from '../controllers/RdStationController';

const rdStationRouter = Router();
const rdStationController = new RdStationController();

rdStationRouter.post(
  '/create',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      tag: Joi.string().required(),
    },
  }),
  rdStationController.create,
);


rdStationRouter.post(
  '/listBySegmentation',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
    },
  }),
  rdStationController.listBySegmentation,
);


rdStationRouter.post(
  '/getByEmail',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  rdStationController.getByEmail,
);

rdStationRouter.get(
  '/leadsQuantity',
  rdStationController.getAllLeadsQuantity,
);






export default rdStationRouter;
