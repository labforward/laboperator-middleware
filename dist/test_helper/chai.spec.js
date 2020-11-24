"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _chaiSubset = _interopRequireDefault(require("chai-subset"));

var _dirtyChai = _interopRequireDefault(require("dirty-chai"));

var _sinonChai = _interopRequireDefault(require("sinon-chai"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

_chai.default.use(_chaiSubset.default);

_chai.default.use(_dirtyChai.default);

_chai.default.use(_sinonChai.default);

global.expect = _chai.default.expect;
global.chai = _chai.default;
global.request = _chai.default.request;