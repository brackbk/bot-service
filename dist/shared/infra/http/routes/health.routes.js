"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _healthController = _interopRequireDefault(require("../controllers/healthController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const healthRouter = (0, _express.Router)();
const healthController = new _healthController.default();
healthRouter.get('/health', healthController.check);
var _default = healthRouter;
exports.default = _default;