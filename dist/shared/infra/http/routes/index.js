"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _dialogflow = _interopRequireDefault(require("../../../../modules/dialogflow/infra/http/routes/dialogflow.routes"));

var _rdstation = _interopRequireDefault(require("../../../../modules/rdstation/infra/http/routes/rdstation.routes"));

var _health = _interopRequireDefault(require("./health.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/dialogflow', _dialogflow.default);
routes.use('/rdstation/conversion', _rdstation.default);
routes.use(_health.default);
var _default = routes;
exports.default = _default;