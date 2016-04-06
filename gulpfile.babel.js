'use strict';

import gulp from 'gulp';

// CSS
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import flexibility from 'postcss-flexibility';
import postcss from 'gulp-postcss';
import stylelint from 'stylelint';

// HTML
import htmlmin from 'gulp-htmlmin';

// Images
import imagemin from 'gulp-imagemin';

// Javascript
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';

// Utilities
import browserSync from 'browser-sync';
import del from 'del';
import rename from 'gulp-rename';

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

// Utility tasks
const clean = () => del([ 'dist/*' ]);
export { clean };

const copy = () =>
  gulp.src('src/*')
  .pipe(gulp.dest('dist'));
export { copy };

const reload = browserSync.reload;
export { reload };

// HTML tasks
export function html() {
  return gulp.src(paths.html.src, {since: gulp.lastRun('html')})
    .pipe(htmlmin({
      caseSensitive: true,
      // collapseBooleanAttributes: true,
      collapseWhitespace: true,
      // conservativeCollapse: true,
      // removeAttributeQuotes: true,
      keepClosingSlash: true,
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

export function images() {
  return gulp.src(paths.images.src, {since: gulp.lastRun('images')})
    .pipe(imagemin({
    optimizationLevel: 7,
    progressive: true,
    interlaced: true,
    multipass: true
    }))
    .pipe(gulp.dest(paths.images.dest));
}

export function scripts() {
  return gulp.src(paths.scripts.src, {since: gulp.lastRun('scripts')})
    .pipe(eslint())
    .pipe(babel())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.scripts.dest));
}

const processors = [
  stylelint,
  autoprefixer({browsers: ['last 2 versions']}),
  flexibility,
  csso({restructure: false})
];

export function styles() {
  return gulp.src(paths.styles.src, {since: gulp.lastRun('styles')})
    .pipe(postcss(processors))
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

export function watch() {
  browserSync.init({
    server: 'src'
    });
  gulp.watch(paths.html.src).on('change', reload);
  gulp.watch(paths.images.src).on('change', reload);
  gulp.watch(paths.scripts.src).on('change', reload);
  gulp.watch(paths.styles.src).on('change', reload);
}

const build = gulp.series (html, images, scripts, styles);
export { build };

export default gulp.series (build, watch);
