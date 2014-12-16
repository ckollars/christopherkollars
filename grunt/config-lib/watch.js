module.exports = {
  options: {
    livereload: true,
    reload: false
  },
  compass: {
    files: ['<%= pkg.config.app %>/_scss/**/*.scss'],
    tasks: ['compass:server']
  },
  jekyll: {
    files: [
      '<%= pkg.config.app %>/**/*.{html,yml,md,mkd,markdown}'
    ],
    tasks: ['jekyll:server', 'compass:server', 'concat:server', 'uglify:server', 'copy:images']
  },
  js: {
    files: ['<%= pkg.config.app %>/js/*.js', '<%= pkg.config.app %>/js/vendor/*.js'],
    tasks: ['concat:server', 'uglify:server']
  }
};
