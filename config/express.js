require('module-alias/register');
const http = require('http');
const fs = require('fs-extra');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const ErrorMiddleware = require('../errors/middleware');
const cors = require('cors');
const helmet = require('helmet');
const Envs = require('./envs');
const Client = require('./client');
const Utils = require('./utils');

const setup = () => {
  const app = express();

  if (Envs.get('maintenanceMode')) {
    app.use('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/maintenance.html'));
    });
    return app;
  }

  app.use(Utils.requireHTTPS);
  app.use(Utils.redirectNonWWW);

  app.disable('x-powered-by');

  app.use(express.static(path.join(__dirname, '../client/build'), { index: false }));
  app.use(express.static(path.join(__dirname, '../public'), { index: false }));

  // parse body params and attache them to req.body
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // lets you use HTTP verbs such as PUT or DELETE
  // in places where the client doesn't support it
  app.use(methodOverride());

  // secure apps by setting various HTTP headers
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
    frameguard: false,
  }));

  // enable CORS - Cross Origin Resource Sharing
  app.use(cors({
    origin: true,
    credentials: true,
  }));

  // enable cookies
  app.use(cookieParser());

  app.set('trust proxy', true);

  // Serve index.html
  app.get('*', async (req, res) => {
    const content = await Client.prepare(req);
    return res.send(content);
  });

  // Error handling
  ErrorMiddleware.setup(app);

  const httpServer = http.createServer(app);
  return httpServer;
};

module.exports = {
  setup,
};
