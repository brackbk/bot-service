"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class AccessTokenService {
  constructor(data) {
    this.accessToken = void 0;
    this.accessToken = data;
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

  setAuth(val) {
    this.accessToken.auth = val;
  }

  getToken() {
    return this.accessToken.token;
  }

  setToken(val) {
    this.accessToken.token = val;
  }

  getExpiresIn() {
    return this.accessToken.expiresIn;
  }

  setExpiresIn(val) {
    this.accessToken.expiresIn = val;
  }

  getRefreshToken() {
    return this.accessToken.refreshToken;
  }

  setRefreshToken(val) {
    this.accessToken.refreshToken = val;
  }

}

var _default = AccessTokenService;
exports.default = _default;