module.exports = {
  options: {
    separator: ';'
  },
  server: {
    src: ['<%= pkg.config.app %>/js/*.js'],
    dest: '<%= pkg.config.app %>/js/compiled.js'
  },
  dist: {
    src: ['<%= pkg.config.app %>/js/vendor/*.js','<%= pkg.config.app %>/js/*.js'],
    dest: '_dist/js/compiled.js'
  }
};
