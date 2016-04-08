'use strict';

import gulp from 'gulp';

// CSS
import cssnano from 'cssnano';
import flexibility from 'postcss-flexibility';
import postcss from 'gulp-postcss';
import stylelint from 'stylelint';

// HTML
import htmlmin from 'gulp-htmlmin';

// Javascript
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';

// Utilities
import browserSync from 'browser-sync';

// Set up paths
const paths = {
  css: {
    src: 'src/css/*.css',
    dest: 'dist/css/'
  },
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  js: {
    src: 'src/js/*.js',
    dest: 'dist/js/'
  }
};

// Lint CSS

// Lint HTML


// Lint JavaScript


// Define PostCSS processor options
const processors = [
  flexibility,
  cssnano({
    discardUnused: false,
    mergeIndents: false,
    reduceIndents: false,
    zindex: false
  })
];

// Build CSS for production
export function buildcss() {
  return gulp.src(paths.css.src)
    .pipe(postcss)(processors)
    .pipe(gulp.dest(paths.css.dest));
}

// Build HTML for production
export function buildhtml() {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({
      // caseSensitive: true,
      // collapseBooleanAttributes: true,
      collapseWhitespace: true,
      // conservativeCollapse: true,
      // removeAttributeQuotes: true,
      // keepClosingSlash: true,
      removeComments: true,
      // removeEmptyAttributes: true,
      // removeOptionalTags: true,
      // removeRedundantAttributes: true,
      removeScriptLinkTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
      // useShortDoctype: true
    }))
    .pipe(gulp.dest(paths.html.dest));
}

// Build JavaScript for production
export function buildjs () {
  return gulp.src(paths.js.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.js.dest));
}

