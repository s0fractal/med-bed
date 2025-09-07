// lodash.essence.js - Distilled to primordial form
// Purity: 1.00

// transform essence (100%)
function transform(data, fn) {
  // Pure functional transform from underscore (2011)
  return Array.isArray(data) ? data.map(fn) : fn(data);
}

module.exports = {
  transform,
};