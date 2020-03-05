/*
* variables ===================================================================================== 
*/

//SVG processing
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const cheerio = require('gulp-cheerio');

//Sass processing
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

//Javascript processing
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

//Image processing
const imagemin = require('gulp-imagemin');

//Inject processing
const inject = require('gulp-inject');
const fileInclude = require('gulp-file-include');

// Gulp + gulp tools
const gulp = require('gulp');
const del = require('del');
const gulpif = require('gulp-if');
const rename = require("gulp-rename");

// Browsersync
const browserSync = require('browser-sync');

// Paths
const path = require('path');
const paths = require('./paths');

const settings = {
	isBuild: false,
	openBrowser: true,
	createSourcemaps: false
};

const pagesToInject = [
    "index.html"
];

const basePages = [],
	distPages = [];

pagesToInject.forEach(function(element) {
	basePages.push(paths.base + element);
	distPages.push(paths.dist + element);
});

/**
 * Tasks =========================================================================================
 */


//
// SVG
// --------------------------------------------------
function svg() {
	return gulp.src(paths.svg)
		.pipe(svgmin(function(file) { // Minify and clean up svg files
			const prefix = path.basename(file.relative, path.extname(file.relative));
			return {
				plugins: [
					{ cleanupIDs: { prefix: prefix + "-", minify: true } },
					{ removeDoctype: true },
					{ removeComments: true },
					{ cleanupNumericValues: { floatPrecision: 2 } },
					{ removeAttrs: { attrs: '(fill|stroke)' } }
				]
			}
		}) )
		.pipe(svgstore({ inlineSvg: true })) // Combine into 1 sprite sheet
		.pipe(cheerio(function($) { // Modify resulting <svg> element
			$('svg').attr('style', 'display:none');
		}))
		.pipe(rename('combined.svg'))
		.pipe(gulp.dest( paths.distSVG))
};


//
// IMAGES
// --------------------------------------------------
function images() {
	return gulp.src(paths.images)
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(paths.distImages))
};


//
// VIDEO
// --------------------------------------------------
function video() {
    return gulp.src(paths.video)
        .pipe(gulp.dest(paths.distVideo))
};


//
// FONTS
// --------------------------------------------------
function fonts() {
	return gulp.src(paths.fonts)
		.pipe(gulp.dest(paths.dist))
};


//
// INJECT STYLES AND HTML
// --------------------------------------------------
function injectToHTML() {

	let sources = [
		paths.injectSourceCSS, paths.injectSourceJS
	];

	return gulp.src(basePages)
		.pipe(inject(gulp.src(sources, {read: false}), {
			addRootSlash: false,
			ignorePath: paths.dist
		}))
		.pipe(fileInclude().on('error', function() {
			console.log(arguments);
		}))
		.pipe( gulp.dest( paths.dist ) )
};


//
// SASS - auto-prefix and minify
// Uses browserslist from package.json
// --------------------------------------------------
function sassFormat() {
	return gulp.src(paths.sass)
		.pipe(gulpif(settings.createSourcemaps, sourcemaps.init()))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulpif(settings.isBuild, cleanCSS({compatibility: 'ie8'})))
		.pipe(gulpif(settings.createSourcemaps, sourcemaps.write('./maps')))
		.pipe(gulp.dest(paths.distCSS))
};


//
// JAVASCRIPT - Concat and uglify
// --------------------------------------------------
function JSFormat() {
	return gulp.src(paths.js)
		.pipe(concat('combined.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.distJS))
};


//
// CLEAN
// --------------------------------------------------
function clean() {
	return del( paths.dist + '*' );
};


/* LINT - Out of order
// LINT - Out of order
// Make sure JS and CSS follow best practises
// --------------------------------------------------
// const jshint = require('gulp-jshint');

// function lintJS() {
// 	return gulp.src( paths.js)
// 		.pipe(jshint())
// 		.pipe(jshint.reporter('jshint-stylish') )
// 		.pipe(jshint.reporter('fail') ).on('error', function() {
// 			console.log( chalk.green("\n\nYou messed up   ") + chalk.yellow(cool()) + "\n\n" );
// 		})
 };

*/

//
// SERVE
// Set up BrowserSync server and host local dev site
// --------------------------------------------------
const server = browserSync.create();

function reload(done) {
	server.reload();
	done();
}

function serve(done) {
	server.init({
		server: {
			baseDir: paths.dist
			}
	});
	done();
}

function watch (){
	gulp.watch(paths.js, gulp.series(JSFormat, reload));
	gulp.watch(paths.sass, gulp.series(sassFormat, reload));
	gulp.watch(paths.images, gulp.series(images, reload));
	gulp.watch(paths.video, gulp.series(video, reload));
	gulp.watch(paths.svg, gulp.series(svg, reload));
	gulp.watch(paths.fonts, gulp.series(fonts, reload));
	gulp.watch(paths.watchHTML, gulp.series(injectToHTML, reload));
}


//
// TASK DEV
// --------------------------------------------------
const dev = gulp.series(clean, images, video, fonts, svg, sassFormat, JSFormat, injectToHTML, serve, watch);


//
// Exports
// --------------------------------------------------
exports.default = dev;
exports.dev = dev;
exports.clean = clean;
exports.sassFormat = sassFormat;
exports.images = images;
exports.video = video;
exports.fonts = fonts;
exports.svg = svg;
exports.scripts = JSFormat;
exports.injectToHTML = injectToHTML;
exports.serve = serve;
exports.watch = watch;
exports.reload = reload;
// exports.lintJS = lintJS;