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

**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Install](#install)
- [Usage](#usage)
- [Options](#options)
    - [`Controller` declaration](#controller-declaration)
    - [Middlewares support](#middlewares-support)
- [Example](#example)
- [License](#license)

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

### `Controller` declaration

There are three kinds of `Controller` for this package:

- Plain function

```js
exports.api = (req, res) => {
  res.send('API');
};
```

- Object

Property |  Type  | Required | Default | Note
---------|--------|----------|---------|-------
method   | String |    No    |  `GET`  | one of ['GET', 'POST', 'PUT', 'DELETE']
params   | Array  |    No    |  `[]`   |
middlewares | Array | No     |  `[]`   | Array of middlewares, see below
handler  | Function | Yes    |   --    | 

e.g.

```js
exports.api = {
  method: 'GET',
  params: [':id'],
  handler(req, res) {
    res.send('API');
  }
};
```

### Middlewares support 

This package also support `middlewares` in `controller`.

e.g.

```js
exports.api = {
  method: 'GET',
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
