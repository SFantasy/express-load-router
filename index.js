'use strict';

// Module dependencies
const glob = require('glob');

const METHOD_ENUM = ['get', 'post', 'put', 'delete'];

function loadRouter(app, root, options) {
  const opt = options || {};

  glob.sync(`${root}/**/*.js`).forEach((file) => {
    const filePath = file.replace(/\.[^.]*$/, '');
    const controller = require(filePath);
    const url = filePath.replace(root, '').replace(/\/index$/, '');
    const methods = Object.keys(controller);

    // Handle options
    const excludeRules = opt.excludeRules || [];
    const rewriteRules = opt.rewriteRules || new Map();

    methods.forEach((method) => {
      let handler = controller[method];
      let modifiedUrl = url;
      const methodLower = method.toLowerCase();

      switch (typeof handler) {
        case 'object':
          modifiedUrl += `/${handler.params.join('/')}`;
          handler = handler.handler;
          break;
        case 'function':
          // Nothing to do with the pure handler.
          break;
        default:
          throw Error('[load-router]: invalid router definition: ', modifiedUrl);
      }

      if (excludeRules.indexOf(modifiedUrl) !== -1) {
        // Nothing to-do with the excluded rules
      } else if (METHOD_ENUM.indexOf(methodLower) !== -1) {
        app[methodLower](rewriteRules.has(modifiedUrl) ?
          rewriteRules.get(modifiedUrl) :
          modifiedUrl, handler);
      } else {
        throw Error('[load-router]: invalid method: ', methodLower);
      }
    });
  });
}

module.exports = loadRouter;
