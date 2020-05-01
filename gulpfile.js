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
const uglify = require('gulp-uglify-es').default;

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
const config = require('./gulp-config');

// Select the html files to inject css and js into
const pagesToInject = config.Injectpages;

// HTML files to inject into
const basePages = config.Injectpages;

/**
 * Tasks =========================================================================================
 */


//
// SVG
// --------------------------------------------------
function svg() {
	return gulp.src(config.svg)
		// .pipe(svgmin(function(file) { // Minify and clean up svg files
		// 	const prefix = path.basename(file.relative, path.extname(file.relative));
		// 	return {
		// 		plugins: [
		// 			{ cleanupIDs: { prefix: prefix + "-", minify: true } },
		// 			{ removeDoctype: true },
		// 			{ removeComments: true },
		// 			{ cleanupNumericValues: { floatPrecision: 2 } },
		// 			{ removeAttrs: { attrs: '(fill|stroke)' } }
		// 		]
		// 	}
		// }) )
		// .pipe(svgstore({ inlineSvg: true })) // Combine into 1 sprite sheet
		// .pipe(cheerio(function($) { // Modify resulting <svg> element
		// 	$('svg').attr('style', 'display:none');
		// }))
		// .pipe(rename('combined.svg'))
		.pipe(gulp.dest( config.distSVG))
};


//
// IMAGES
// --------------------------------------------------
function images() {
	return gulp.src(config.images)
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest(config.distImages))
};


//
// VIDEO
// --------------------------------------------------
function video() {
    return gulp.src(config.video)
        .pipe(gulp.dest(config.distVideo))
};


//
// FONTS
// --------------------------------------------------
function fonts() {
	return gulp.src(config.fonts)
		.pipe(gulp.dest(config.dist))
};


//
// INJECT STYLES AND HTML
// --------------------------------------------------
function injectToHTML() {

	let sources = [
		config.injectSourceCSS, config.injectSourceJS
	];

	const d = "?" + Date.now();

	return gulp.src(basePages)
		.pipe(gulpif(config.settings.fileVersion, 
			inject(gulp.src(sources, {read: false}), {
			addRootSlash: false,
			ignorePath: config.dist,
			addSuffix: d
		}), inject(gulp.src(sources, {read: false}), {
			addRootSlash: false,
			ignorePath: config.dist
		})))
		.pipe(inject(gulp.src([config.partials]), {
			starttag: '<!-- inject:partial:{{path}} -->',
			relative: true,
			transform: function (filePath, file) {
			  // return file contents as string
			  return file.contents.toString('utf8')
			}
		}))
		.pipe(fileInclude().on('error', function() {
			console.log(arguments);
		}))
		.pipe( gulp.dest( config.dist ) )
};


//
// SASS - auto-prefix and minify
// Uses browserslist from package.json
// --------------------------------------------------
function sassFormat() {
	return gulp.src(config.sass)
		.pipe(gulpif(config.settings.createSourcemaps, sourcemaps.init()))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulpif(config.settings.isBuild, cleanCSS({compatibility: 'ie8'})))
		.pipe(gulpif(config.settings.createSourcemaps, sourcemaps.write('./maps')))
		.pipe(gulp.dest(config.distCSS))
};


//
// JAVASCRIPT - Concat and uglify
// --------------------------------------------------
function JSFormat() {
	return gulp.src(config.js)
		.pipe(concat('combined.js'))
		.pipe(gulpif(config.settings.isBuild, uglify()))
		.pipe(gulp.dest(config.distJS))
};


//
// CLEAN
// --------------------------------------------------
function clean() {
	return del( config.dist + '*' );
};


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
			baseDir: config.dist
			}
	});
	done();
}

function watch (){
	gulp.watch(config.js, gulp.series(JSFormat, reload));
	gulp.watch(config.sass, gulp.series(sassFormat, reload));
	gulp.watch(config.images, gulp.series(images));
	gulp.watch(config.video, gulp.series(video));
	gulp.watch(config.svg, gulp.series(svg));
	gulp.watch(config.fonts, gulp.series(fonts));
	gulp.watch(config.html, gulp.series(injectToHTML, reload));
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
exports.JSFormat = JSFormat;
exports.injectToHTML = injectToHTML;
exports.serve = serve;
exports.watch = watch;
exports.reload = reload;
