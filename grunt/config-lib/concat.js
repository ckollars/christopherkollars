module.exports = {
  options: {
    separator: ';'
  },
  server: {
    src: ['<%= pkg.config.app %>/js/*.js', '!<%= pkg.config.app %>/js/compiled.js', '<%= pkg.config.app %>/js/vendor/*.js'],
    dest: '<%= pkg.config.app %>/js/compiled.js'
  },
  dist: {
    src: ['<%= pkg.config.app %>/js/vendor/*.js','<%= pkg.config.app %>/js/*.js'],
    dest: '_dist/js/compiled.js'
  }
};
