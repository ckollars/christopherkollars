module.exports = {
  server: {
    files: {
      '<%= pkg.config.dev %>/js/compiled.min.js': '<%= pkg.config.app %>/js/compiled.js'
    }
  },
  dist: {
    files: {
      '<%= pkg.config.dist %>/js/compiled.min.js': '<%= pkg.config.app %>/js/compiled.js'
    }
  }
};
