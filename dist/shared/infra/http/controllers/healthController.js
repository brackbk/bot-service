"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class HealthController {
  async check(request, response) {
    return response.json({
      "status": response.status
    });
  }

}

exports.default = HealthController;