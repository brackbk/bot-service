import AuthenticationService from "../services/AuthenticationService";
import { IAuthenticationDTO } from "./IAuthenticationDTO";

export default interface IAuthenticateDTO {
    auth: AuthenticationService;
    token: string;
    expiresIn: number;
    refreshToken: string;
  }
  