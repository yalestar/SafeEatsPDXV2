var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var  exec = require('child_process').exec;

gulp.task('styles', function() {
  return gulp.src('app/styles/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('browsersync', function(cb) {
  return browserSync({
    server: {
      baseDir: './views'
    }
  }, cb);
});

gulp.task('serve', ['styles'], function(cb) {
  exec('node index.js', function (err, stdout, stderr) {
    console.log('stdout');
    console.log("ERR", err);
    cb(err);
  });
  // browserSync({
  //   notify: false,
  //   port: 9000,
  //   server: {
  //     //baseDir: ['.tmp', 'app'],
  //     baseDir: './views',
  //     routes: {
  //       '/bower_components': 'bower_components'
  //     }
  //   }
  // });

  // gulp.watch([
  //     'index.html',
  //     'app/*.html',
  //     'app/scripts/**/*.js',
  //     'handlers/**/*.js',
  //     'app/images/**/*'
  //   ])
  //   .on('change', browserSync.reload);

  // gulp.watch('app/styles/**/*.css', ['styles']);
  // gulp.watch('app/fonts/**/*', ['fonts']);
});

gulp.task('scripts', function() {
  return gulp.src('public/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
  gulp.watch('*.html', ['styles', browserSync.reload]);
  gulp.watch('app/css/*.css', ['styles', browserSync.reload]);
  gulp.watch('app/js/*.js', ['scripts', browserSync.reload]);
  gulp.watch('app/img/*', ['images', browserSync.reload]);
});

gulp.task('default', ['styles', 'scripts', 'browsersync', 'watch']);
