import IAuthenticateDTO from "../dtos/IAuthenticateDTO";
import AuthenticationService from "./AuthenticationService";

class AccessTokenService {
    
    accessToken: IAuthenticateDTO

    constructor(data: IAuthenticateDTO) {
        this.accessToken = data
    }

    refresh() {
        if (!this.accessToken.auth) {
            throw new Error('No authentication exists on AccessToken. Try setting it calling the method AccessToken::setAuth(Authentication $auth).');
        }

        this.accessToken.auth.refreshAccessToken(this.accessToken.refreshToken);
    }

    getAuth() {
        return this.accessToken.auth;
    }

    setAuth(val: AuthenticationService) {
        this.accessToken.auth = val;
    }

    getToken() {
        return this.accessToken.token;
    }

    setToken(val: string) {
        this.accessToken.token = val;
    }

    getExpiresIn() {
        return this.accessToken.expiresIn;
    }

    setExpiresIn(val: number) {
        this.accessToken.expiresIn = val;
    }

    getRefreshToken() {
        return this.accessToken.refreshToken;
    }

    setRefreshToken(val: string) {
        this.accessToken.refreshToken = val;
    }
}

export default AccessTokenService;