import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ConversionService from '@modules/rdstation/services/ConversionService';
import AppError from '@shared/errors/AppError';
import ContactService from '@modules/rdstation/services/ContactService';
import AccessTokenService from '@modules/rdstation/services/AccessTokenService';
import AuthenticationService from '@modules/rdstation/services/AuthenticationService';

export default class RdStationController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, tag } = request.body;

        const apiKey = process.env.RDSTATION_API_KEY || "";

        try {
            const conversion = new ConversionService(apiKey);
            const conversionResponse = await conversion.send({
                email,
                tags: [tag],
                conversion_identifier: email,
                available_for_mailing: true,
                traffic_source: "hotsite",
            });

            return response.json(conversionResponse.data);
        } catch (error) {
            console.log(error)
            throw new AppError("Problem to return response from rdStation")
        }


    }
    public async listBySegmentation(request: Request, response: Response): Promise<Response> {
        const { id } = request.body;
        const clientId = process.env.RDSTATION_CLIENT_ID || "";
        const clientSecret = process.env.RDSTATION_CLIENT_SECRET || "";
        const refreshToken = process.env.RDSTATION_REFRESH_TOKEN || "";
        let dataListUsers: object[] = []
        try {
            const authenticationService = new AuthenticationService(
                clientId,
                clientSecret
            )
            const accessToken = await authenticationService.refreshAccessToken(refreshToken);
            const contactService = new ContactService(accessToken);

            const contacts = await contactService.segmentations(id)

                
            dataListUsers = await Promise.all(contacts.data["contacts"].map( async (element: any) => {
                let dataResp = await contactService.getByEmail(element.email)
                return {
                    email: dataResp.data.email,
                    tel: dataResp.data.mobile_phone,
                    name: element.name,
                    created_at: element.created_at,
                };
            }));
            // dataListUsers = await Promise.all(dataListUsers);
            return response.json({contacts: dataListUsers});
        } catch (error) {
            console.log(error)
            throw new AppError("Problem to return response from rdStation")
        }
    }


    public async getByEmail(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
        const clientId = process.env.RDSTATION_CLIENT_ID || "";
        const clientSecret = process.env.RDSTATION_CLIENT_SECRET || "";
        const refreshToken = process.env.RDSTATION_REFRESH_TOKEN || "";
        let dataListUsers: object[] = []
        try {
            const authenticationService = new AuthenticationService(
                clientId,
                clientSecret
            )
            const accessToken = await authenticationService.refreshAccessToken(refreshToken);
            const contactService = new ContactService(accessToken);

            const contact:any = await contactService.getByEmail(email);

            const { name, mobile_phone } = contact.data;
            const dataContact = {
                email,
                name,
                mobile_phone
            }
            return response.json(dataContact);
        } catch (error) {
            console.log(error)
            throw new AppError("Problem to return response from rdStation")
        }
    }

    public async getAllLeadsQuantity(request: Request, response: Response): Promise<Response> {
        const { withFunil } = request.query;

        const clientId = process.env.RDSTATION_CLIENT_ID || "";
        const clientSecret = process.env.RDSTATION_CLIENT_SECRET || "";
        const refreshToken = process.env.RDSTATION_REFRESH_TOKEN || "";

        try {
            const authenticationService = new AuthenticationService(
                clientId,
                clientSecret
            )
            const accessToken = await authenticationService.refreshAccessToken(refreshToken);
            const contactService = new ContactService(accessToken);

            const totalLeads = await contactService.countAllLead();
            const totalLeadsByFunil = await contactService.countAllLeadByFunil();
            const dataReturn = {
                total_leads: totalLeads,
                funil: {},
            };

            if (withFunil) {
                dataReturn.funil = totalLeadsByFunil.map((stage: any) => {
                    stage.percentil = (stage.quantity * 100) / (totalLeads || 1);
                    return stage;
                });
            }

            return response.json(dataReturn);
        } catch (error) {
            console.log(error)
            throw new AppError("Problem to return response from rdStation")
        }
    }

}
