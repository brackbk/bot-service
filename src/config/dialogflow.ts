import IResponseDialogFlowDTO from "@modules/dialogflow/dtos/IResponseDialogFlowDTO";
import AppError from "@shared/errors/AppError";

const dialogflow = require('@google-cloud/dialogflow-cx');

const apiDialogFlow = {
    request: async (msg: string, session: string): Promise<IResponseDialogFlowDTO | undefined> => {
        const credentials = {
            client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
            private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
        };

        const sessionClient = new dialogflow.SessionsClient({
            projectId: process.env.DIALOGFLOW_PROJECT_ID,
            credentials,
        });

        const sessionPath = sessionClient.projectLocationAgentSessionPath(
            process.env.DIALOGFLOW_PROJECT_ID,
            process.env.DIALOGFLOW_LOCATION,
            process.env.DIALOGFLOW_AGENT_ID,
            session
        );

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: msg,
                },
                languageCode: 'pt-BR',
            },
            queryParams: {
                payload: {
                    data: '',
                },
            },
        };

        const [response] = await sessionClient.detectIntent(request);
             
        try {
            const result = response.queryResult;
            return {
                query: result,
                response: result.responseMessages,
                messages: result.responseMessages,
                action: result.action,
                contexts: result.outputContexts,
                parameters: result.parameters?.fields,
                intent: result.intent ? result.intent.displayName : " No intent matched."
            }
        } catch (error) {
            console.log(error);
        }
    },
}

export default apiDialogFlow