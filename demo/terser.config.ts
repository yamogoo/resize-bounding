export default {
  mangle: {
    properties: {
      regex: /^data-testid/,
    },
  },
  compress: {
    dead_code: true,
    drop_debugger: true,
    conditionals: true,
    unused: true,
    toplevel: true,
    passes: 3,
  },
  output: {
    comments: false,
  },
};
