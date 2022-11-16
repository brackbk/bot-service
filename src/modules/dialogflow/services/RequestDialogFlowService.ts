import { injectable, inject } from 'tsyringe';
import apiDialogFlow from '@config/dialogflow';
// import AppError from '@shared/errors/AppError';
import { ObjectID } from 'typeorm';
import IResponseDialogFlowDTO from '../dtos/IResponseDialogFlowDTO';

interface IRequest {
  msg: string;
  session: string;
}
@injectable()
class RequestDialogService {

  public async execute({
    msg, session }: IRequest): Promise<IResponseDialogFlowDTO | undefined> {
    const dialogflowResponse = await apiDialogFlow.request(msg, session);

    return dialogflowResponse;

  }
}

export default RequestDialogService;
