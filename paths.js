var root = 'src/',	
	sass = root + "sass/**/*.scss",
	js = root + "js/**/*.js",
	images = root + 'assets/img/**/*',
	video = root + 'assets/video/**/*',
	svg =  root + 'assets/svg/*.svg',
	fonts = root + 'assets/fonts/**/*',


	dist = 'dist/',	
	distCSS = dist + 'css/',
	distJS = dist + 'scripts/',
	distImages = dist + 'img/',
	distVideo = dist + 'video/',
	distSVG = dist + 'svg/',
	distFonts = dist + 'fonts/',


	injectSourceCSS = distCSS + '/**/*.css',
	injectSourceJS = distJS + '/**/*.js',
	watchHTML = root + '**/*.html';

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
	watchHTML: watchHTML,
}