"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ConversionService = _interopRequireDefault(require("../../../services/ConversionService"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _ContactService = _interopRequireDefault(require("../../../services/ContactService"));

var _AuthenticationService = _interopRequireDefault(require("../../../services/AuthenticationService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RdStationController {
  async create(request, response) {
    const {
      email,
      tag
    } = request.body;
    const apiKey = process.env.RDSTATION_API_KEY || "";

    try {
      const conversion = new _ConversionService.default(apiKey);
      const conversionResponse = await conversion.send({
        email,
        name: email,
        tags: [tag],
        conversion_identifier: email,
        available_for_mailing: true,
        traffic_source: "hotsite"
      });
      return response.json(conversionResponse.data);
    } catch (error) {
      console.log(error);
      throw new _AppError.default("Problem to return response from rdStation");
    }
  }

  async listBySegmentation(request, response) {
    const {
      id
    } = request.body;
    const clientId = process.env.RDSTATION_CLIENT_ID || "";
    const clientSecret = process.env.RDSTATION_CLIENT_SECRET || "";
    const refreshToken = process.env.RDSTATION_REFRESH_TOKEN || "";
    let dataListUsers = [];

    try {
      const authenticationService = new _AuthenticationService.default(clientId, clientSecret);
      const accessToken = await authenticationService.refreshAccessToken(refreshToken);
      const contactService = new _ContactService.default(accessToken);
      const contacts = await contactService.segmentations(id);
      dataListUsers = await Promise.all(contacts.data["contacts"].map(async element => {
        let dataResp = await contactService.getByEmail(element.email);
        return {
          email: dataResp.data.email,
          tel: dataResp.data.mobile_phone,
          name: element.name,
          created_at: element.created_at
        };
      })); // dataListUsers = await Promise.all(dataListUsers);

      return response.json({
        contacts: dataListUsers
      });
    } catch (error) {
      console.log(error);
      throw new _AppError.default("Problem to return response from rdStation");
    }
  }

  async getAllLeadsQuantity(request, response) {
    const {
      withFunil
    } = request.query;
    const clientId = process.env.RDSTATION_CLIENT_ID || "";
    const clientSecret = process.env.RDSTATION_CLIENT_SECRET || "";
    const refreshToken = process.env.RDSTATION_REFRESH_TOKEN || "";

    try {
      const authenticationService = new _AuthenticationService.default(clientId, clientSecret);
      const accessToken = await authenticationService.refreshAccessToken(refreshToken);
      const contactService = new _ContactService.default(accessToken);
      const totalLeads = await contactService.countAllLead();
      const totalLeadsByFunil = await contactService.countAllLeadByFunil();
      const dataReturn = {
        total_leads: totalLeads
      };

      if (withFunil) {
        dataReturn.funil = totalLeadsByFunil.map(stage => {
          stage.percentil = stage.quantity * 100 / (totalLeads || 1);
          return stage;
        });
      }

      return response.json(dataReturn);
    } catch (error) {
      console.log(error);
      throw new _AppError.default("Problem to return response from rdStation");
    }
  }

}

exports.default = RdStationController;