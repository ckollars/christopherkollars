var gulp = require('gulp'),
    gutil = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    bourbon = require('bourbon').includePaths,
    cp = require('child_process');


var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn( 'jekyll' , ['build'], {stdio: 'inherit'})
    .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['css', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    },
    port: 3000
  });
});


/**
 * CSS
 */
gulp.task('css', function () {
  return gulp.src('./assets/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: ['assets/scss'].concat(bourbon),
        onError: browserSync.notify
    }))
    // .on('end', function(){ gutil.log('Almost there...'); })
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
    .pipe(gulp.dest('./_site/assets/css/'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/css'));
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
    gulp.watch('assets/scss/**/*.scss', ['css']);
    gulp.watch('assets/js/*.js', ['scripts']);
    gulp.watch(['*.html', '*.md', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);

// Handle errors
function handleError (error) {
  //If you want details of the error in the console
  console.log('WARNING!', error.message.toString());
  this.emit('end');
}
