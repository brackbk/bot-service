"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rdstation = _interopRequireDefault(require("../../../config/rdstation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ApiResource {
  /**
   * Constructor
   *
   * @param {AccessTokenService} $accessTokenService
   */
  constructor($accessTokenService) {
    this.accessTokenService = void 0;
    this.accessTokenService = $accessTokenService;
  }
  /**
   *
   * @param {string} method
   * @param {string} endpoint
   * @param {Object} data
   * @param {Object} headers
   */


  async typeAxiosRequest(method, endpoint, data, headers) {
    switch (method) {
      case "POST":
        return await _rdstation.default.post(endpoint, data, headers);

      case "GET":
        return await _rdstation.default.get(endpoint, headers);

      case "PUT":
        return await _rdstation.default.put(endpoint, data, headers);

      case "PATH":
        return await _rdstation.default.patch(endpoint, data, headers);
    }
  }

  async request(method, endpoint, data = {}, headers = {}, fetchInitOpts = {}) {
    const token = await this.accessTokenService.getToken();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    try {
      const response = await this.typeAxiosRequest(method, endpoint, data, config);
      return response;
    } catch (e) {
      console.log(e); // invalid access token? refresh and try again
      // if (e.hasErrorType(Exception.TYPE_UNAUTHORIZED)) {
      //     this.accessTokenService.refresh();
      //     return await this.typeAxiosRequest(method, endpoint, data, headers)
      // } else {
      //     throw e;
      // }
    }
  }

}

exports.default = ApiResource;