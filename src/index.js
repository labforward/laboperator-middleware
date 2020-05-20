/* eslint-disable import/no-dynamic-require */

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const helpers = require('./helpers');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// relative to working directory, so that each specialized middleware
// can provide their own custom routes
require(path.resolve('./src/routes'))(app);

// default 404 routes
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  const status = err.status || 500;

  res.status(status);
  res.json(helpers.jsonResponse(status, err.message));
});

module.exports = app;
