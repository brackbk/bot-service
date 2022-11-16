import AccessTokenService from "./AccessTokenService";
import rdStationConfig from "@config/rdstation";
import { IAuthenticationDTO } from "../dtos/IAuthenticationDTO";

class AuthenticationService {

    iAuthenticationDTO: IAuthenticationDTO

    constructor(clientId: string, clientSecret: string) {

        this.iAuthenticationDTO = {
            clientId,
            clientSecret
        };
        // this.iAuthenticationDTO.clientId = clientId;
        // this.iAuthenticationDTO.clientSecret = clientSecret;
        // console.log(this.iAuthenticationDTO.clientId);
    }


    public async getAccessToken(code: string): Promise<AccessTokenService> {
        const config = { headers: { 'Content-Type': 'application/json' } }
        const response = await rdStationConfig.post('/auth/token', {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            code: code
        },
            config);

        if (!response) {
            throw new Error('Authentication::getAccessToken(): Request failed on response.');
        }

        const data: any = response.data;

        return new AccessTokenService({
            auth: this,
            token: data['access_token'],
            expiresIn: data['expires_in'],
            refreshToken: data['refresh_token']
        });
    }

    public async refreshAccessToken(refreshToken: string): Promise<AccessTokenService> {
        const fields = {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            refresh_token: refreshToken
        };
        const config = { headers: { 'Content-Type': 'application/json' } }

        const response = await rdStationConfig.post('/auth/token', fields, config);

        if (!response) {
            throw new Error('Could not refresh access token.');
        }

        const data: any = response.data;

        return new AccessTokenService({
            auth: this,
            token: data['access_token'],
            expiresIn: data['expires_in'],
            refreshToken: data['refresh_token']
        });
    }

    get clientId() {
        return this.iAuthenticationDTO.clientId;
    }

    set clientId(val: string) {
        this.iAuthenticationDTO.clientId = val;
    }

    get clientSecret() {
        return this.iAuthenticationDTO.clientSecret;
    }

    set clientSecret(val: string) {
        this.iAuthenticationDTO.clientSecret = val;
    }
}

export default AuthenticationService