import Exception from '../exception/Exception';
import AccessTokenService from './AccessTokenService';
import rdStationConfig from "@config/rdstation";
import { AxiosResponse } from 'axios';

export default class ApiResource {
    accessTokenService:AccessTokenService;
    /**
     * Constructor
     *
     * @param {AccessTokenService} $accessTokenService
     */
    constructor($accessTokenService: AccessTokenService) {
        this.accessTokenService = $accessTokenService;
    }

  
    /**
     *
     * @param {string} method
     * @param {string} endpoint
     * @param {Object} data
     * @param {Object} headers
     */


    private async typeAxiosRequest(method: string, endpoint: string, data: object, headers: object) {
        switch (method) {
            case "POST":
                return await rdStationConfig.post(endpoint, data, headers)
            case "GET":
                return await rdStationConfig.get(endpoint, headers)
            case "PUT":
                return await rdStationConfig.put(endpoint, data, headers)
            case "PATH":
                return await rdStationConfig.patch(endpoint, data, headers)
        }
    }

    public async request(method: string, endpoint: string, data: object = {}, headers: object = {}, fetchInitOpts: object = {}) {
        const token = await this.accessTokenService.getToken()
        const config = { headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` } }
        try {
            const response = await this.typeAxiosRequest(method, endpoint, data, config)
            return response;
        } catch (e: any) {
            console.log(e);
            // invalid access token? refresh and try again
            // if (e.hasErrorType(Exception.TYPE_UNAUTHORIZED)) {
            //     this.accessTokenService.refresh();
            //     return await this.typeAxiosRequest(method, endpoint, data, headers)
            // } else {
            //     throw e;
            // }
        }
    }
}
