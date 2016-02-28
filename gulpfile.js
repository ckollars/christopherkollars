var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    eslint = require('gulp-eslint'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    favicons = require('gulp-favicons'),
    uglify = require('gulp-uglify');


/**
 * CSS
 */

gulp.task('css', function () {
    return gulp.src('./_scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: [
        '> 5%',
        'ie 10'
      ],
      remove: true,
      cascade: true
    }))
    .pipe(gulp.dest('./_site/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano({processImport: false}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./_site/css/'))
    .pipe(browserSync.reload({stream:true}));
});


/**
 * ES Lint
 */

gulp.task('lint', function() {
  return gulp.src('./js/*.js')
    .pipe(eslint({
      rules: {
        'quotes': 0,
        'no-multi-spaces': [
          1, {
            'exceptions': {
              'VariableDeclarator': true
            }
          }
        ]
      },
      globals: {
        'jQuery':            false,
        '$':                 true,
        'imagesLoaded':      false,
        'Modernizr':         false,
        'templateDirectory': false,
        'Handlebars':        false,
        'IconicJS':          false,
        'ajaxpagination':    false
      },
      envs: [
        'browser'
      ]
    }))
    .pipe(eslint.format());
});

/**
 * Javascripts
 */
gulp.task('js', function(){
  return gulp.src([
      './js/plugins/**/*.js',
      './js/*.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .on('error', handleError)
    .pipe(sourcemaps.write('./maps/'))
    .pipe(gulp.dest('./_site/js/'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    // Documentaion on browser sync is at: browsersync.io
    // It's really rad.
    browserSync.init(null, {
        proxy: "commonhouse.dev",
        open: false
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'lint', 'js', 'browser-sync'], function () {
    gulp.watch("-/scss/**/*.scss", ['css']);
    gulp.watch(["-/js/**/*.js", "!-/js/vendor/**.*.js"], ['lint', 'js']);
    gulp.watch("./**/*.php", ['bs-reload']);
});


// Handle errors
function handleError (error) {
  //If you want details of the error in the console
  console.log('WARNING!', error.message.toString());
  this.emit('end');
}
