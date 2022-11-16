"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dialogflow = _interopRequireDefault(require("../../../config/dialogflow"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let RequestDialogService = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class RequestDialogService {
  async execute({
    msg,
    session
  }) {
    const dialogflowResponse = await _dialogflow.default.request(msg, session);
    return dialogflowResponse;
  }

}) || _class);
var _default = RequestDialogService;
exports.default = _default;