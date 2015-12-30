// gulpfile.js =-=-=-=-=-=-=-=-=-=-=-=-=-=-=

var gulp     = require('gulp');
var sass     = require('gulp-sass');
var concat   = require('gulp-concat');
var uglify   = require('gulp-uglify');

gulp.task('styles', function() {
  gulp.src('./src/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'))
});

// watch files for live reload
gulp.task('watch', function() {
    gulp.watch('app/index.html', ['html']);
    gulp.watch('src/sass/**/*.scss', ['styles']);
});

gulp.task('default', ['watch', 'styles']);  // took out 'open', 'connect'

gulp.task('build', ['styles', 'minifyStyles', 'minifyJs']);