'use strict';

var gulp = require('gulp');

// --- Helper utilities ---
var rename = require('gulp-rename');
var del = require('del');

// --- Preprocessor utilities ---
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');


// --- JS-utilities ---
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;

// --- Server utitlities ---
var server = require('browser-sync').create();


/*
___________________________________________________________________________

---------------------------------- TASKS ----------------------------------
___________________________________________________________________________

*/

// *** JS-files handling ***
gulp.task('scripts', () => {
	return pipeline(
		gulp.src('source/js/modules/**/*.js'),
    uglify(),
    concat('scripts.min.js'),
    gulp.dest('source/js')
	);
});


// *** Raising the server ***
gulp.task('server', () => {
  server.init({
    server: '',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/js/**/*.js', gulp.series('scripts', 'refresh'));
  gulp.watch('*.html', gulp.series('refresh'));
});

gulp.task('refresh', done => {
  server.reload();
  done();
});


// *** Main tasks ***
gulp.task('start', gulp.series('server'));