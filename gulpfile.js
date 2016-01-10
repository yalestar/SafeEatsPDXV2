var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var exec = require('child_process').exec;
var server = require('gulp-develop-server');
var livereload = require( 'gulp-livereload');
var babel = require('gulp-babel');

gulp.task('styles', function() {
  return gulp.src('app/styles/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist/'));
});

var options = {
  path: './app/index.js'
};

var serverFiles = [
    './app/index.js',
    './app/routes.js'
];
 
gulp.task( 'server:start', function() {
    server.listen( options, livereload.listen );
});
 
// If server scripts change, restart the server and then livereload. 
gulp.task( 'default', [ 'server:start' ], function() {
  function restart( file ) {
    server.changed( function( error ) {
      if( ! error ) livereload.changed( file.path );
    });
  }
 
  gulp.watch( serverFiles ).on( 'change', restart );
});

gulp.task('browsersync', function(cb) {
  return browserSync({
    server: {
      baseDir: './views'
    }
  }, cb);
});

// gulp.task('serve', ['styles'], function(cb) {
//   // exec('node app/index.js', function (err, stdout, stderr) {
//   //   console.log('running on port 9000');
//   //   console.log("ERR", err);
//   //   cb(err);
//   // });
//   browserSync({
//     notify: false,
//     port: 9000,
//     server: {
//       baseDir: './app/views',
//       routes: {
//         '/bower_components': 'app/bower_components'
//       }
//     }
//   });

//   gulp.watch([
//       'app/*.html',
//       'app/scripts/**/*.js',
//       'handlers/**/*.js',
//       'app/images/**/*'
//     ])
//     .on('change', browserSync.reload);

//   gulp.watch('app/styles/**/*.css', ['styles']);
// });

gulp.task('scripts', function() {
  return gulp.src('*.js')
    .pipe(babel())
    .pipe(concat('all.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
  gulp.watch('*.html', ['styles', browserSync.reload]);
  gulp.watch('app/styles/*.css', ['styles', browserSync.reload]);
  gulp.watch('app/js/*.js', ['scripts', browserSync.reload]);
});

// gulp.task('default', ['styles', 'scripts', 'browsersync', 'watch']);
