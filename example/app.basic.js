// Module dependencies
const path = require('path');
const express = require('express');
const loadRouter = require('..');

const app = express();

loadRouter(app, path.join(__dirname, 'controllers'), {
  excludeRules: [
    '/product/list'
  ]
});

app.listen(4000);
