var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    cp = require('child_process');

var messages = {
  jekyllDev: 'Running: $ jekyll build for dev',
  jekyllProd: 'Running: $ jekyll build for prod'
};

/**
 * Jekyll Site - Development build
 */
gulp.task('jekyll-dev', function (done) {
  browserSync.notify(messages.jekyllDev);
  return cp.spawn('jekyll', ['build', '--drafts', '--config', '_config.yml'], {stdio: 'inherit'})
 .on('close', done);
});

/**
 * Jekyll Site - Production build
 */
gulp.task('jekyll-prod', function (done) {
  browserSync.notify(messages.jekyllProd);
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
  .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-dev'], function () {
  browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['css', 'scripts', 'jekyll-dev'], function() {
  browserSync.init({
    server: "_site",
    port: 3000
  });
});

/**
 * CSS
 */

gulp.task('css', function () {
    return gulp.src('./_scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: ['scss'],
        onError: browserSync.notify
    }))
    .pipe(autoprefixer({
      browsers: [
        '> 5%',
        'ie 10'
      ],
      remove: true,
      cascade: true
    }))
    .pipe(cssnano({processImport: false}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./_site/css/'))
    .pipe(browserSync.reload({stream:true}))
});

/**
 * Javascripts
 */
gulp.task('scripts', function(){
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
    .pipe(browserSync.reload({stream:true, once: true}))
    .pipe(gulp.dest('js'));
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
  gulp.watch(['_scss/**/*.scss','_scss/*.scss'], ['css']);
  gulp.watch(['_js/**/*.js'], ['scripts']);
  gulp.watch(['index.html', '_layouts/*.html', '_posts/*', '_includes/*.html', '_drafts/*', '**/*.html'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);

gulp.task('build', ['scripts', 'css', 'jekyll-prod']);


// Handle errors
function handleError (error) {
  //If you want details of the error in the console
  console.log('WARNING!', error.message.toString());
  this.emit('end');
}
