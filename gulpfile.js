
const { src, dest, task, watch, parallel } = require('gulp');

const webpack = require('gulp-webpack');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const stream = require('webpack-stream');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const uglify = require('gulp-terser');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean-css');

const package = require('./package.json');

sass.compiler = require('node-sass');


task('ext', function() {
	return src('src/js/ext/*.js')
		.pipe(babel({
			presets: [
				'@babel/env'
			],
			plugins: [
				'@babel/plugin-transform-modules-umd'
			]
		}))
		.pipe(dest('pkg/js/ext'));
});


task('jquery', function() {
	return src('node_modules/jquery/dist/jquery.js')
		.pipe(babel({
			presets: [
				'@babel/env'
			],
			plugins: [
				'@babel/plugin-transform-modules-umd'
			]
		}))
		.pipe(dest('pkg/js/ext'));
});


task('bootstrap', function() {
	return src('node_modules/bootstrap/dist/js/bootstrap.bundle.js')
		.pipe(babel({
			presets: [
				'@babel/env'
			],
			plugins: [
				'@babel/plugin-transform-modules-umd'
			]
		}))
		.pipe(rename(function(path) {
			path.basename = 'bootstrap';
		}))
		.pipe(dest('pkg/js/ext'));
});


task('bootstrap_css', function() {
	return src('node_modules/bootstrap/dist/css/bootstrap.css')
		.pipe(dest('pkg/css/ext'));
});


task('fontawesome', function() {
	return src('node_modules/@fortawesome/fontawesome-free/js/all.js')
		.pipe(babel({
			presets: [
				'@babel/env'
			],
			plugins: [
				'@babel/plugin-transform-modules-umd'
			]
		}))
		.pipe(rename(function(path) {
			path.basename = 'fontawesome';
		}))
		.pipe(dest('pkg/js/ext'));
});


task('fontawesome_css', function() {
	return src('node_modules/@fortawesome/fontawesome-free/css/all.css')
		.pipe(rename(function(path) {
			path.basename = 'fontawesome-all';
		}))
		.pipe(dest('pkg/css/ext'));
});


task('jsrender', function() {
	return src('node_modules/jsrender/jsrender.js')
		.pipe(babel({
			presets: [
				'@babel/env'
			],
			plugins: [
				'@babel/plugin-transform-modules-umd'
			]
		}))
		.pipe(dest('pkg/js/ext'));
});


/**
 * MyAMS external modules tasks
 * These modules can be included into MyAMS "full" packages,
 * or required dynamically when using "core" packages.
 */

task('i18n_dev', function() {
	return src('src/js/i18n/*.js')
		.pipe(dest('pkg/js/dev/i18n'));
});


task('i18n_prod', function() {
	return src('src/js/i18n/*.js')
		.pipe(uglify())
		.pipe(dest('pkg/js/prod/i18n'));
});


task('mods_dev', function() {
	return src('src/js/mod-*.js')
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: [
				'@babel/env'
			],
			plugins: [
				'@babel/plugin-transform-modules-umd'
			]
		}))
		.pipe(rename(function(path) {
			path.basename += '-dev';
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('pkg/js/dev'));
});


task('mods_prod', function() {
	return src('src/js/mod-*.js')
		.pipe(babel({
			presets: [
				'@babel/env'
			],
			plugins: [
				'@babel/plugin-transform-modules-umd'
			]
		}))
		.pipe(uglify())
		.pipe(dest('pkg/js/prod'));
});


/**
 * Full tasks include MyAMS base features with all base modules
 * Mini-packages don't include jQuery and Bootstrap
 * *dev are built in development mode, *prod are optimized in production mode
 */

task('full_dev', function() {
	const config = require('./webpack.dev.js');
	return src('src/js/myams.js')
		.pipe(stream(config), webpack)
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/js/dev'));
});


task('full_prod', function() {
	const config = require('./webpack.prod.js');
	return src('src/js/myams.js')
		.pipe(stream(config), webpack)
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/js/prod'));
});


/**
 * Mini-packages don't include jQuery and Bootstrap
 * *dev are built in development mode, *prod are optimized in production mode
 */

task('mini_dev', function() {
	const config = require('./webpack-mini.dev.js');
	return src('src/js/myams-mini.js')
		.pipe(stream(config), webpack)
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/js/dev'));
});


task('mini_prod', function() {
	const config = require('./webpack-mini.prod.js');
	return src('src/js/myams-mini.js')
		.pipe(stream(config), webpack)
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/js/prod'));
});


/**
 * Core-packages don't include jQuery and Bootstrap and MyAMS external modules
 * *dev are built in development mode, *prod are optimized in production mode
 */

task('core_dev', function() {
	const config = require('./webpack-core.dev.js');
	return src('src/js/myams-core.js')
		.pipe(stream(config), webpack)
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/js/dev'));
});


task('core_prod', function() {
	const config = require('./webpack-core.prod.js');
	return src('src/js/myams-core.js')
		.pipe(stream(config), webpack)
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/js/prod'));
});


/**
 * Sass compilation tasks
 */

task('sass_dev', function() {
	return src('src/sass/myams.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/css/dev'));
});

task('sass_prod', function() {
	return src('src/sass/myams.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('$version$', package.version))
		.pipe(clean())
		.pipe(dest('pkg/css/prod'));
});


task('sass_emerald_dev', function() {
	return src('src/sass/emerald.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/css/dev'));
});


task('sass_emerald_prod', function() {
	return src('src/sass/emerald.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('$version$', package.version))
		.pipe(clean())
		.pipe(dest('pkg/css/prod'));
});


task('sass_darkmode_dev', function() {
	return src('src/sass/darkmode.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/css/dev'));
});


task('sass_darkmode_prod', function() {
	return src('src/sass/darkmode.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('$version$', package.version))
		.pipe(clean())
		.pipe(dest('pkg/css/prod'));
});


task('sass_lightmode_dev', function() {
	return src('src/sass/lightmode.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('$version$', package.version))
		.pipe(dest('pkg/css/dev'));
});


task('sass_lightmode_prod', function() {
	return src('src/sass/lightmode.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('$version$', package.version))
		.pipe(clean())
		.pipe(dest('pkg/css/prod'));
});


/**
 * Main tasks
 */
exports.jquery = task('jquery');
exports.bootstrap = task('bootstrap');
exports.bootstrap_css = task('bootstrap_css');
exports.fontawesome = task('fontawesome');
exports.fontawesome_css = task('fontawesome_css');

exports.ext = task('ext');

exports.i18n_dev = task('i18n_dev');
exports.i18n_prod = task('i18n_prod');

exports.mods_dev = task('mods_dev');
exports.mods_prod = task('mods_prod');

exports.full_dev = task('full_dev');
exports.full_prod = task('full_prod');
exports.mini_dev = task('mini_dev');
exports.mini_prod = task('mini_prod');
exports.core_dev = task('core_dev');
exports.core_prod = task('core_prod');


exports.default = function() {
	watch('src/sass/**/*.scss',
		parallel('sass_dev', 'sass_prod',
				 'sass_emerald_dev', 'sass_emerald_prod',
				 'sass_darkmode_dev', 'sass_darkmode_prod',
				 'sass_lightmode_dev', 'sass_lightmode_prod'));
	watch('src/js/i18n/*.js',
		parallel('i18n_dev', 'i18n_prod'));
	watch('src/js/mod-*.js',
		parallel('mods_dev', 'mods_prod'));
	watch(['pkg/css/prod/*.css', 'src/js/*.js'],
		parallel('full_dev', 'full_prod',
				 'mini_dev', 'mini_prod',
				 'core_dev', 'core_prod'));
};
