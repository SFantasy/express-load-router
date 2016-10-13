/**
 * Compose middlewares
 *
 * @param middlewares
 * @returns {Function}
 */
function compose(middlewares) {
  if (!Array.isArray(middlewares)) throw 'middlewares should be an Array of functions.';

  for (const fn of middlewares) {
    if (typeof fn !== 'function') throw 'middleware should be a function';
  }

  return (req, res, next) => {
    (function iterate(i, max) {
      if (i === max) return next();
      middlewares[i](req, res, iterate.bind(this, i + 1, max));
    })(0, middlewares.length);
  }
}

module.exports = compose;
