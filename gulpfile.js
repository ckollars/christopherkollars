var gulp = require('gulp');
$ = require('gulp-load-plugins')(); // Note the extra parens

var config = {
     sassPath: './_scss',
     bowerDir: './bower_components' 
}

gulp.task('sass', function () {
  return sass(config.sassPath + '/styles.scss', {
      style: 'expanded',
      sourcemap: true
    })
    .pipe(autoprefixer({                                 // Autoprefixer all css
      browsers: [
        'last 20 versions',
        '> 5%',
        'ie 9',
        'ie 10'
      ],
      remove: true,
      cascade: true
    }))
    .pipe(gulp.dest('./_site/css/'))
    .pipe(minifycss())                                   // Minify the CSS
    .pipe(rename({suffix: '.min'}))                      // Rename it
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./_site/css/'))
    .pipe(livereload())                                  // Reloads server
    .pipe(notify('Sass prefixed, compiled & minified')); // Output to notification
});

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/styles.scss')
         .pipe(sass({
             style: 'expanded',
            sourcemap: true,
             loadPath: [
                 './_scss',
                 config.bowerDir + '/bourbon/app/assets/bourbon',
                 config.bowerDir + '/susy/sass/susy',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
         .pipe(gulp.dest('./public/css')); 
});

gulp.task('default', function() {
  // place code for your default task here
});
