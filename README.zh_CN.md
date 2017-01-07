# express-load-router

Express 自动路由加载模块

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![David deps][david-image]][david-url]

[npm-image]: https://img.shields.io/npm/v/express-load-router.svg
[npm-url]: https://npmjs.com/package/express-load-router
[download-image]: https://img.shields.io/npm/dm/express-load-router.svg
[download-url]: https://npmjs.com/package/express-load-router
[david-image]: https://img.shields.io/david/SFantasy/express-load-router.svg
[david-url]: https://david-dm.org/SFantasy/express-load-router

- [安装](#%E5%AE%89%E8%A3%85)
  - [使用](#%E4%BD%BF%E7%94%A8)
    - [可选项](#%E5%8F%AF%E9%80%89%E9%A1%B9)
    - [`Controller` 声明方式](#controller-%E5%A3%B0%E6%98%8E%E6%96%B9%E5%BC%8F)
    - [中间件支持](#%E4%B8%AD%E9%97%B4%E4%BB%B6%E6%94%AF%E6%8C%81)
  - [例子](#%E4%BE%8B%E5%AD%90)
  - [协议](#%E5%8D%8F%E8%AE%AE)

## 安装

```
npm i express-load-router -S
```

## 使用

```js
const path = require('path');
const express = require('express');
const loadRouter = require('express-load-router');

const app = express();

// Use `path.join(__dirname, 'path/to/folder')` here
loadRouter(app, path.join(__dirname, 'controllers'));
```

### 可选项

```js
loadRouter(app, path.join(__dirname, 'controllers'), options);
```

     选项    |  类型 | 默认值
---------------|-------|---------
`excludeRules` | Array | `[]`
`rewriteRules` | Map   | `new Map()`

### `Controller` 声明方式

使用此模块的时候，有三种 `Controller` 的声明方式：

- 函数

```js
exports.api = (req, res) => {
  res.send('API');
};
```

- 对象

属性 |  类型  | 是否必须 | 默认 | 备注
---------|--------|----------|---------|-------
method   | String |    No    |  `GET`  | 枚举值 ['GET', 'POST', 'PUT', 'DELETE']
params   | Array  |    No    |  `[]`   |
middlewares | Array | No     |  `[]`   | 中间件数组，详见下方文档
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

### 中间件支持

模块支持在 `controller` 中使用 `middlewares`

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

## 例子

见 [example](example/).

## 协议

The [MIT License](LICENSE)
