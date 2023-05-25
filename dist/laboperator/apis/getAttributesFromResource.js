"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _camelcaseKeys = _interopRequireDefault(require("camelcase-keys"));
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getAttributesFromResource = raw => {
  const resource = raw.data || raw;
  const relationships = _lodash.default.reduce(resource.relationships, (prev, value, key) => {
    const relationKey = Array.isArray(value.data) ? `${key}Ids` : `${key}Id`;
    const relationValue = Array.isArray(value.data) ? value.data.map(relation => relation.id) : value.data.id;
    return {
      ...prev,
      [relationKey]: relationValue
    };
  }, {});
  return {
    id: resource.id,
    type: resource.type,
    ...(0, _camelcaseKeys.default)(resource.attributes, {
      deep: true
    }),
    ...relationships
  };
};
var _default = getAttributesFromResource;
exports.default = _default;