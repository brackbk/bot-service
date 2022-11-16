import { ObjectID } from "typeorm";

export default interface IResponseDialogFlowDTO {
  query: string;
  response: string;
  messages:string;
  action: string;
  contexts: Object[];
  parameters: any;
  intent: string;
}
