"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AccessTokenService = _interopRequireDefault(require("./AccessTokenService"));

var _rdstation = _interopRequireDefault(require("../../../config/rdstation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthenticationService {
  constructor(clientId, clientSecret) {
    this.iAuthenticationDTO = void 0;
    this.iAuthenticationDTO = {
      clientId,
      clientSecret
    }; // this.iAuthenticationDTO.clientId = clientId;
    // this.iAuthenticationDTO.clientSecret = clientSecret;
    // console.log(this.iAuthenticationDTO.clientId);
  }

  async getAccessToken(code) {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await _rdstation.default.post('/auth/token', {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: code
    }, config);

    if (!response) {
      throw new Error('Authentication::getAccessToken(): Request failed on response.');
    }

    const data = response.data;
    return new _AccessTokenService.default({
      auth: this,
      token: data['access_token'],
      expiresIn: data['expires_in'],
      refreshToken: data['refresh_token']
    });
  }

  async refreshAccessToken(refreshToken) {
    const fields = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: refreshToken
    };
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await _rdstation.default.post('/auth/token', fields, config);

    if (!response) {
      throw new Error('Could not refresh access token.');
    }

    const data = response.data;
    return new _AccessTokenService.default({
      auth: this,
      token: data['access_token'],
      expiresIn: data['expires_in'],
      refreshToken: data['refresh_token']
    });
  }

  get clientId() {
    return this.iAuthenticationDTO.clientId;
  }

  set clientId(val) {
    this.iAuthenticationDTO.clientId = val;
  }

  get clientSecret() {
    return this.iAuthenticationDTO.clientSecret;
  }

  set clientSecret(val) {
    this.iAuthenticationDTO.clientSecret = val;
  }

}

var _default = AuthenticationService;
exports.default = _default;