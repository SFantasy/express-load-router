# express-load-router

Load routers from specific folders for Express.js

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![David deps][david-image]][david-url]

[npm-image]: https://img.shields.io/npm/v/express-load-router.svg
[npm-url]: https://npmjs.com/package/express-load-router
[download-image]: https://img.shields.io/npm/dm/express-load-router.svg
[download-url]: https://npmjs.com/package/express-load-router
[david-image]: https://img.shields.io/david/SFantasy/express-load-router.svg
[david-url]: https://david-dm.org/SFantasy/express-load-router

## Install

```
npm i express-load-router -S
```

## Usage

```js
const path = require('path');
const express = require('express');
const loadRouter = require('express-load-router');

const app = express();

// Use `path.join(__dirname, 'path/to/folder')` here
loadRouter(app, path.join(__dirname, 'controllers'));
```

### Options

```js
loadRouter(app, path.join(__dirname, 'controllers'), options);
```

     option    |  type | default 
---------------|-------|---------
`excludeRules` | Array | `[]`
`rewriteRules` | Map   | `new Map()`

### Middlewares

This package also support `middlewares` in `controller`.

e.g.

```js
exports.GET = {
  params: [':id'],
  middlewares: [
    function (req, res, next) {
      console.log('Middleware 1');
      next();
    },
    function (req, res, next) {
      console.log('Middleware 2');
      next();
    },
  ],
  handler(req, res) {
    return res.send(`product detail ${req.params.id}`);
  },
};

```

## Example

See [example](example/).

## License

The MIT License
