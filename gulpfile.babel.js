'use strict';

import gulp from 'gulp';

// CSS
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
  html: {
    src: 'src/*.html',
    dest: 'dist/'
  },
  images: {
    src: 'src/img/*',
    dest: 'dist/img/'
  },
  scripts: {
    src: 'src/js/*.js',
    dest: 'dist/js/'
  },
  styles: {
    src: 'src/css/*.css',
    dest: 'dist/css/'
  }
};

// Minify HTML
export function html() {
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

export function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.scripts.dest));
}

export function styles() {
  return gulp.src(paths.styles.src)
    .pipe(postcss)()
    .pipe(gulp.dest(paths.styles.dest));
}
