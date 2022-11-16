"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _RequestDialogFlowService = _interopRequireDefault(require("../../../services/RequestDialogFlowService"));

var _ConversionService = _interopRequireDefault(require("../../../../rdstation/services/ConversionService"));

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DialogFlowController {
  async intent(request, response) {
    const {
      msg,
      session
    } = request.body;
    let uuuidGenerated;

    const requestDialogFlow = _tsyringe.container.resolve(_RequestDialogFlowService.default);

    const apiKey = process.env.RDSTATION_API_KEY || "";
    const dialogflow = await requestDialogFlow.execute({
      msg,
      session
    });

    try {
      const conversion = new _ConversionService.default(apiKey);
      dialogflow === null || dialogflow === void 0 ? void 0 : dialogflow.contexts.map(async data => {
        var _data$parameters, _data$parameters2, _data$parameters3;

        if (data !== null && data !== void 0 && (_data$parameters = data.parameters) !== null && _data$parameters !== void 0 && _data$parameters.fields["email.original"] && data !== null && data !== void 0 && (_data$parameters2 = data.parameters) !== null && _data$parameters2 !== void 0 && _data$parameters2.fields["number.original"] && data !== null && data !== void 0 && (_data$parameters3 = data.parameters) !== null && _data$parameters3 !== void 0 && _data$parameters3.fields["nome.original"]) {
          var _data$parameters4, _data$parameters5, _data$parameters6, _data$parameters7, _data$parameters8;

          uuuidGenerated = await conversion.send({
            email: data === null || data === void 0 ? void 0 : (_data$parameters4 = data.parameters) === null || _data$parameters4 === void 0 ? void 0 : _data$parameters4.fields["email.original"]["stringValue"],
            name: data === null || data === void 0 ? void 0 : (_data$parameters5 = data.parameters) === null || _data$parameters5 === void 0 ? void 0 : _data$parameters5.fields["nome.original"]["stringValue"],
            personal_phone: data === null || data === void 0 ? void 0 : (_data$parameters6 = data.parameters) === null || _data$parameters6 === void 0 ? void 0 : _data$parameters6.fields["number.original"]["stringValue"],
            mobile_phone: data === null || data === void 0 ? void 0 : (_data$parameters7 = data.parameters) === null || _data$parameters7 === void 0 ? void 0 : _data$parameters7.fields["number.original"]["stringValue"],
            tags: ['Whatsapp', 'chatbot', 'start Talking', 'registered', 'oportunity'],
            conversion_identifier: data === null || data === void 0 ? void 0 : (_data$parameters8 = data.parameters) === null || _data$parameters8 === void 0 ? void 0 : _data$parameters8.fields["email.original"]["stringValue"],
            available_for_mailing: true,
            traffic_source: "chatbot ( Whats ) "
          });
        }
      });
      return response.json({
        code: response.statusCode,
        messages: dialogflow === null || dialogflow === void 0 ? void 0 : dialogflow.messages,
        contexts: dialogflow === null || dialogflow === void 0 ? void 0 : dialogflow.contexts
      });
    } catch (error) {
      throw new _AppError.default("Problem to return response from dialogFlow or RdStation");
    }
  }

}

exports.default = DialogFlowController;