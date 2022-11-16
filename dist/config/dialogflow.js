"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const dialogflow = require('@google-cloud/dialogflow-cx'); //projects/table-talks-pub/locations/global/agents/e8a2d864-133a-4868-bcdf-a728cb8dbdad


const apiDialogFlow = {
  request: async (msg, session) => {
    const credentials = {
      client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
      private_key: process.env.DIALOGFLOW_PRIVATE_KEY
    };
    const sessionClient = new dialogflow.SessionsClient({
      projectId: process.env.DIALOGFLOW_PROJECT_ID,
      credentials
    });
    const languageCode = 'pt-BR';
    const agentId = 'e8a2d864-133a-4868-bcdf-a728cb8dbdad';
    const location = 'global';
    const sessionPath = sessionClient.projectLocationAgentSessionPath(process.env.DIALOGFLOW_PROJECT_ID, location, agentId, session);
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: msg
        },
        languageCode: 'pt-BR'
      },
      queryParams: {
        payload: {
          data: ''
        }
      }
    };
    const responses = await sessionClient.detectIntent(request);
    console.log(responses);

    try {
      const result = responses[0].queryResult;
      return {
        query: result.queryText,
        response: result.fulfillmentText,
        messages: result.fulfillmentMessages,
        action: result.action,
        contexts: result.outputContexts,
        parameters: result.parameters,
        intent: result.intent ? result.intent.displayName : " No intent matched."
      };
    } catch (error) {
      console.log(error);
    }
  }
};
var _default = apiDialogFlow;
exports.default = _default;