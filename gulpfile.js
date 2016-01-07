var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var browsersync = require('browser-sync');

gulp.task('styles', function() {
  return gulp.src('public/css/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist/'));
});
gulp.task('browsersync', function(cb) {
  return browsersync({
    server: {
      baseDir: './'
    }
  }, cb)
});

gulp.task('serve', ['styles'], function(cb) {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.css', ['styles']);
  gulp.watch('app/fonts/**/*', ['fonts']);
})

gulp.task('scripts', function() {
  return gulp.src('public/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});
gulp.task('watch', function() {
  gulp.watch('app/css/*.css', ['styles', browsersync.reload]);
  gulp.watch('app/js/*.js', ['scripts', browsersync.reload]);
  gulp.watch('app/img/*', ['images', browsersync.reload]);
});

gulp.task('default', ['styles', 'scripts', 'browsersync', 'watch']);
