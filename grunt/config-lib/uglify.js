module.exports = {
  server: {
    files: {
      '<%= pkg.config.dev %>/js/compiled.min.js': '<%= pkg.config.app %>/js/compiled.js'
    }
  },
  dist: {
    files: {
      '_dist/js/compiled.min.js': '_dist/js/compiled.js'
    }
  }
};
