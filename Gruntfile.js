module.exports = function(grunt) {

  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    kollab: {
      app: 'app',
      dev: '_dev',
      dist: '_dist'
    },
    clean: {
      grunticon: {
        src: ['<%= kollab.app %>/svgs/grunticon', '<% kollab.app %>/svgs/images']
      },
      server: [
        '_dev'
      ],
      dist: [
        '_dist'
      ]
    },
    grunticon: {
      icons: {
        options: {
          src: '<%= kollab.app %>/svgs/',
          dest: '<%= kollab.app %>/svgs/grunticon',
          pngfolder: '<%= kollab.app %>/images/',
          datasvgcss: '_icons.data.svg.scss',
          datapngcss: '_icons.data.png.scss',
          urlpngcss: '_icons.fallback.scss'
        }
      }
    },
    compass: {
      options: {
        sassDir: '<%= kollab.app %>/_scss',
        imagesDir: '<%= kollab.app %>/img',
        generatedImagesDir: '<%= kollab.app %>/img',
        javascriptsDir: '<%= kollab.app %>/js',
        fontsDir: '<%= kollab.app %>/fonts',
        assetCacheBuster: 'none',
        require: [
          'sass-globbing',
          'toolkit',
          'rgbapng'
        ]
      },
      server: {
        options: {
          cssDir: '<%= kollab.dev %>/css',
          environment: 'development',
          outputStyle: 'expanded',
          relativeAssets: true,
          raw: 'line_numbers = :true\n'
        }
      },
      dist: {
        options: {
          cssDir: '<%= kollab.dist %>/css',
          environment: 'production',
          outputStyle: 'compressed',
          force: true
        }
      }
    },
    watch: {
      compass: {
        files: ['<%= kollab.app %>/_scss/**/*.scss'],
        tasks: ['compass:server']
      },
      jekyll: {
        files: [
          '<%= kollab.app %>/**/*.{html,yml,md,mkd,markdown}'
        ],
        tasks: ['jekyll:server', 'copy:server']
      },
      js: {
        files: ['<%= kollab.app %>/js/*.js','<%= kollab.app %>/js/vendor/*.js'],
        tasks: ['concat:server', 'uglify:server']
      },
      copy: {
        files: [
          '<%= kollab.app %>css/*}',
          '<%= kollab.app %>img/*}',
          '<%= kollab.app %>js/*}'
        ],
        tasks: ['copy:server']
      }
    },
    jekyll: {
      options: {
        // bundleExec: true,
        config: '_config.yml',
        src: '<%= kollab.app %>'
      },
      dist: {
        options: {
          dest: '<%= kollab.dist %>',
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '_dev'
        }
      }
    },
    copy: {
      grunticon: {
        files: [
          {expand: true, flatten: true, src: ['svgs/images/**'], dest: '../images/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['svgs/grunticon/*.scss'], dest: 'scss/partials/utility/'},
        ]
      },
      server: {
        files: [
          { expand: true, cwd: '<%= kollab.app %>/css', src: '**/*.css', dest: '<%= kollab.dev %>/css' },
          { expand: true, cwd: '<%= kollab.app %>/img', src: '**', dest: '<%= kollab.dev %>/img' },
          { expand: true, cwd: '<%= kollab.app %>/js', src: '**/*.js', dest: '<%= kollab.dev %>/js' }
        ]
      },
      dist: {
        files: [
          {expand: true, src: ['../images/**'], dest: '_dist/images'},
          {expand: true, src: ['js/no-concat/modernizr.js'], dest: '_dist/'},
        ]
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      server: {
        src: ['<%= kollab.app %>/js/vendor/*.js','<%= kollab.app %>/js/*.js'],
        dest: '<%= kollab.dev %>/js/compiled.js'
      },
      dist: {
        src: ['<%= kollab.app %>/js/vendor/*.js','<%= kollab.app %>/js/*.js'],
        dest: '_dist/js/compiled.js'
      }
    },
    uglify: {
      server: {
        files: {
          '<%= kollab.dev %>/js/compiled.min.js': '<%= kollab.dev %>/js/compiled.js'
        }
      },
      dist: {
        files: {
          '_dist/js/compiled.min.js': '_dist/js/compiled.js'
        }
      }
    },
    concurrent: {
      server: [
        'compass:server',
        'jekyll:server'
      ],
      dist: [
        'compass:dist',
        'copy:dist'
      ]
    }
  });

  // Create svg stylesheets and fallback from svgs
  grunt.registerTask('images', ['grunticon', 'copy:grunticon', 'clean:grunticon']);

  // Development build on all assets
  grunt.registerTask(
    'serve',
    'Serves the Jekyll Site for development',
    ['clean:server', 'jekyll:server', 'compass:server', 'copy:server', 'watch' ]
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
