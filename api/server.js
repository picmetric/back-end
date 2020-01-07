const express = require('express');
const sessions = require('express-session');
const KnexSessionStore = require('connect-session-knex')(sessions);

const apiRouter = require('./api-router');
const signedUrl = require('../images/image-route');
const configureMiddleware = require('./configure-middleware.js');
const knex = require('../data/db-config');

const server = express();

const sessionConfiguration = {
  name: 'users',
  secret: 'iamuser',
  saveUninitialized: true,
  resave: false,
  store: new KnexSessionStore({
    knex,
    tablename: 'sessions',
    createtable: true,
    clearInterval: 1000 * 60 * 10,
    sidfieldname: 'sid'
  }),
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true
  }
};

configureMiddleware(server);

server.use(sessions(sessionConfiguration));

server.use('/api', apiRouter);

server.use('/images', signedUrl);

module.exports = server;
