// gulpfile.js =-=-=-=-=-=-=-=-=-=-=-=-=-=-=

var gulp     = require('gulp');
var sass     = require('gulp-sass');
var concat   = require('gulp-concat');
var uglify   = require('gulp-uglify');

gulp.task('stylesDev', function() {
  gulp.src('./src/sass/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('stylesProd', function() {
  gulp.src('./src/sass/styles.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('js', function() {
  gulp.src('./src/js/script.js')
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('compressJs', function() {
  gulp.src('./src/js/script.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
})


// watch files for live reload
gulp.task('watch', function() {
    gulp.watch('app/index.html', ['html']);
    gulp.watch('src/sass/**/*.scss', ['stylesDev']);
});

gulp.task('default', ['watch', 'stylesDev', 'js']);  // took out 'open', 'connect'

gulp.task('build', ['stylesProd', 'compressJs']);