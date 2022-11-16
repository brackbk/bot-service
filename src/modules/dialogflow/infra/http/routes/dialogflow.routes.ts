import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import DialogFlowController from '../controllers/DialogFlowController';

const dialogflowRouter = Router();
const dialogflowController = new DialogFlowController();

dialogflowRouter.post(
  '/intent',
  celebrate({
    [Segments.BODY]: {
      msg: Joi.string().required(),
      session: Joi.string().required(),
    },
  }),
  dialogflowController.intent,
);

export default dialogflowRouter;
