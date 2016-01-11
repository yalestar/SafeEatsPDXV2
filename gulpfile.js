var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
// var server = require('gulp-develop-server');
var mainBowerFiles = require('main-bower-files')
var nodemon = require('gulp-nodemon');
var livereload = require( 'gulp-livereload');
var babel = require('gulp-babel');

gulp.task('styles', function() {
  return gulp.src('app/styles/*.css')
    .pipe(concat('all.css'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('server', function (cb) {
    var started = false;
    return nodemon({
        script: 'app/index.js'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task( 'default', ['server' ], function() { });
