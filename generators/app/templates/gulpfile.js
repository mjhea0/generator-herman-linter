(function() {

  'use strict';

  const path = require('path');
  const gulp = require('gulp');
  const prefix = require('gulp-autoprefixer');
  const minify = require('gulp-minify-css');
  const rename = require('gulp-rename');
  const jshint = require('gulp-jshint');
  const plumber = require('gulp-plumber');
  const concat = require('gulp-concat');
  const uglify = require('gulp-uglify');
  const jscs = require('gulp-jscs');

  const fileNameBase = 'main';

  gulp.task('lint', ['jshint', 'jscs']);
  gulp.task('build', ['js', 'css']);

  gulp.task('css', () => {
    gulp.src(path.join('src', 'css', '*.css'))
    .pipe(plumber())
    .pipe(prefix({cascade: true}))
    .pipe(gulp.dest(path.join('dist', 'css')))
    .pipe(rename('main.min.css'))
    .pipe(minify())
    .pipe(gulp.dest(path.join('dist', 'css')));
  });

  gulp.task('js', () => {
    gulp.src(path.join('src', 'js', '*.js'))
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(path.join('dist', 'js')))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.join('dist', 'js')));
  });

  gulp.task('jshint', () => {
    return gulp.src([path.join('src', 'js', '*.js')])
    .pipe(plumber())
    .pipe(jshint({
      esnext: true
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
  });

  gulp.task('jscs', () => {
    return gulp.src(path.join('src', 'js', '*.js'))
    .pipe(plumber())
    .pipe(jscs())
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));
  });

}());
