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
var terser = require('gulp-terser');
var pipeline = require('readable-stream').pipeline;
var babelify = require('babelify').configure({ presets: ['@babel/preset-env'] });

// --- Vue-utilities ---
var browserify = require('gulp-browserify');
var vueify = require('vueify');

// --- Server utitlities ---
var server = require('browser-sync').create();


/*
___________________________________________________________________________

---------------------------------- TASKS ----------------------------------
___________________________________________________________________________

*/


// *** Vue-syntax compilation and JS-files minification ***
gulp.task('bundle', () => {
  return gulp.src('./source/components/app.js')
    .pipe(browserify({
      transform: [
        babelify,
        vueify
      ]
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('source/js/modules'));
});

gulp.task('minification', () => {
  return gulp.src('source/js/modules/**/*.js')
    .pipe(terser())
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('source/js'));
});


// *** Removing tasks ***
gulp.task('delscript', () => {
  return del('source/scripts.min.js');
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

  gulp.watch('source/components/**/*.{vue,js}', gulp.series('bundle', 'delscript', 'minification', 'refresh'));
  gulp.watch('source/js/modules/**/*.js', gulp.series('delscript', 'minification', 'refresh'));
  gulp.watch('*.html', gulp.series('refresh'));
});

gulp.task('refresh', done => {
  server.reload();
  done();
});


// *** Main tasks ***
gulp.task('start', gulp.series('delscript', 'minification', 'server'));