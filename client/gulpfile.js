var gulp = require('gulp');
var replace = require('gulp-replace');

var now = Date.now();

gulp.task('add-querystring-to-index', function () {
  return gulp.src(['dist/browser/index.html'])
    .pipe(replace('.css', '.css?t=' + now))
    .pipe(replace('.js', '.js?t=' + now))
    .pipe(gulp.dest('dist/browser/'));
});
