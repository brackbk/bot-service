import { Request, Response } from 'express';
import { container } from 'tsyringe';

import RequestDialogFlowService from '@modules/dialogflow/services/RequestDialogFlowService';
import ConversionService from '@modules/rdstation/services/ConversionService';
import AppError from '@shared/errors/AppError';

export default class DialogFlowController {
  public async intent(request: Request, response: Response): Promise<Response> {
    const { msg, session } = request.body;
    let uuuidGenerated: any;
    const requestDialogFlow = container.resolve(RequestDialogFlowService);
    const apiKey = process.env.RDSTATION_API_KEY || "";
    const dialogflow = await requestDialogFlow.execute({
      msg,
      session,
    });

    try {
      const conversion = new ConversionService(apiKey);
        if(dialogflow?.parameters){
          if (dialogflow?.parameters?.email
            && dialogflow?.parameters?.number
            && dialogflow?.parameters?.nome
          ) {

            uuuidGenerated = await conversion.send({
              email: dialogflow?.parameters?.email?.stringValue,
              name: dialogflow?.parameters?.nome.structValue?.fields?.original?.stringValue,
              personal_phone: dialogflow?.parameters?.number?.stringValue,
              mobile_phone: dialogflow?.parameters?.number?.stringValue,
              tags: ['lead-cold'],
              conversion_identifier: dialogflow?.parameters?.email?.stringValue,
              available_for_mailing: true,
              traffic_source: "chatbot ( Whats ) ",
            });
          }
          
      }

      return response.json({
        code: response.statusCode,
        messages: dialogflow?.messages,
        contexts: dialogflow?.parameters,
      });
    } catch (error) {
      console.log(error);
      throw new AppError("Problem to return response from dialogFlow or RdStation")
    }


  }

}
