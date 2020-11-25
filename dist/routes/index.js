"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../helpers");

var _default = app => {
  const laboperator = require('../laboperator');

  app.get('/', (_req, res) => {
    res.json((0, _helpers.jsonResponse)(200));
  });
  app.get('/auth/callback', (0, _helpers.propagateErrors)(async (req, res) => {
    await laboperator.apis.authorizeUser(req.query);
    res.format({
      'application/json': () => {
        res.json((0, _helpers.jsonResponse)(200));
      },
      'text/html': () => {
        res.send('<script>window.close()</script>');
      }
    });
  }));
};

exports.default = _default;