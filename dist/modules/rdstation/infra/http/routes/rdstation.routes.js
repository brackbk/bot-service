"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _RdStationController = _interopRequireDefault(require("../controllers/RdStationController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rdStationRouter = (0, _express.Router)();
const rdStationController = new _RdStationController.default();
rdStationRouter.post('/create', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string().required(),
    tag: _celebrate.Joi.string().required()
  }
}), rdStationController.create);
rdStationRouter.post('/listBySegmentation', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required()
  }
}), rdStationController.listBySegmentation);
rdStationRouter.get('/leadsQuantity', rdStationController.getAllLeadsQuantity);
var _default = rdStationRouter;
exports.default = _default;