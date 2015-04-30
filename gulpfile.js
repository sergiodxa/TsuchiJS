var babel      = require('gulp-babel');
var browserify = require('gulp-browserify');
var gulp       = require('gulp');
var watch      = require('gulp-watch');

gulp.task('build:dev', function () {
  gulp.src('./src/browser.js')
    .pipe(browserify({
      transform: ['babelify']
    }))
    .pipe(gulp.dest('./test/'));
});

gulp.task('build:prod', function () {
  gulp.src('./src/index.js')
    .pipe(babel({
      modules: 'common'
    }))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function () {
  gulp.watch(['./src/*.js'], ['build:dev']);
});

gulp.task('default', ['build:dev', 'watch']);