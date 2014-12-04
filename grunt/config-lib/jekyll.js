module.exports = {
  options: {
    config: '_config.yml',
    src: '<%= pkg.config.app %>'
  },
  dist: {
    options: {
      dest: '<%= pkg.config.dist %>',
    }
  },
  server: {
    options: {
      dest: '_dev'
    }
  }
};
