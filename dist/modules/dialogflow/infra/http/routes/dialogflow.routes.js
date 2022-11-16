"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _DialogFlowController = _interopRequireDefault(require("../controllers/DialogFlowController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dialogflowRouter = (0, _express.Router)();
const dialogflowController = new _DialogFlowController.default();
dialogflowRouter.post('/intent', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    msg: _celebrate.Joi.string().required(),
    session: _celebrate.Joi.string().required()
  }
}), dialogflowController.intent);
var _default = dialogflowRouter;
exports.default = _default;