// Modify values below to change file structure and/or selection of files
var root = 'src/',	
	sass = root + "sass/**/*.scss",
	js = root + "js/**/*.js",
	images = root + 'assets/img/**/*',
	video = root + 'assets/video/**/*',
	svg =  root + 'assets/svg/*.svg',
	fonts = root + 'assets/fonts/**/*',
	html = root + 'html/**/*.html';

	dist = 'dist/',	
	distCSS = dist + 'css/',
	distJS = dist + 'scripts/',
	distImages = dist + 'img/',
	distVideo = dist + 'video/',
	distSVG = dist + 'svg/',
	distFonts = dist + 'fonts/',
	distHTML = dist + '',


	injectSourceCSS = distCSS + '/**/*.css',
	injectSourceJS = distJS + '/**/*.js',


	partials = root + 'html/partials/**/*.html';

// These settings change how the output of gulp are processed
// isBuild will determine if css and js will be minified
// createSourcemaps will determine if sassFormat will create sourcemaps
// fileVersion adds a date marker to your files: "?28390120"
const settings = {
	isBuild: false,
	createSourcemaps: false,
	fileVersion: false
};

// Place all files you want to work on here. Example: "index.html" or "html/index.html"
// Standard is all HTML files
const Injectpages = [
	html
];

module.exports  = {
	base: root,	
	sass: sass,
	js: js,
	images: images,
	video: video,
	svg:  svg,
	fonts: fonts,


	dist: dist,	
	distCSS: distCSS,
	distJS: distJS,
	distImages: distImages,
	distVideo: distVideo,
	distSVG: distSVG,
	distFonts: distFonts,


	injectSourceCSS: injectSourceCSS,
	injectSourceJS: injectSourceJS,
	html: html,
	distHTML: distHTML,

	partials: partials,

	settings: settings,

	Injectpages: Injectpages,
}