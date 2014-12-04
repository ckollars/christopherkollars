module.exports = function (grunt) {
  'use strict';

  // Create svg stylesheets and fallback from svgs
  grunt.registerTask(
    'images',
    ['grunticon', 'copy:grunticon', 'clean:grunticon']
  );

  // Development build on all assets
  grunt.registerTask(
    'server',
    'Serves the Jekyll Site for development',
    ['jekyll:server', 'compass:server', 'concat:server', 'uglify:server',  'copy:images', 'watch' ]
  );

  // Development build on all assets
  grunt.registerTask(
    'dev',
    'Compiles all of the assets moves them to correct places for the theme to run on development',
    ['images', 'compass:dev', 'concat:dev', 'uglify:dev']
  );

  // Distribution build on all assets. These then will need to be
  // manually moved to correct directories from "_dist" directory
  grunt.registerTask(
    'dist',
    'Compiles all of the assets and copies the files to the distribution directory.',
    ['clean:dist', 'jekyll:dist', 'compass:dist', 'concat:dist', 'uglify:dist', 'copy:dist']
  );
};
