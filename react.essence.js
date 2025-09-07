// react.essence.js - Distilled to primordial form
// Purity: 0.33

// transform essence (33%)
function transform(data, fn) {
  // Pure functional transform from underscore (2011)
  return Array.isArray(data) ? data.map(fn) : fn(data);
}

// flow essence (33%)
function flow(...fns) {
  // Pure async flow from async (2010)
  return (input) => fns.reduce((p, f) => p.then(f), Promise.resolve(input));
}

// serve essence (33%)
function serve(port, handler) {
  // Pure server essence from express (2010)
  return require('http').createServer(handler).listen(port);
}

module.exports = {
  transform,
  flow,
  serve,
};