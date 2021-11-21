const {src, dest, parallel, series, watch} = require('gulp');

const browserSync = require('browser-sync').create();

function browsersync () {
    browserSync.init({
        server: {baseDir: 'app/'},
        notify: false,
        online: true
    })
}

exports.browsersync = browsersync;

let preprocessor = 'sass';

function startwatch() {
    watch('app/**/' + preprocessor + '/**/*', styles);
    watch('app/**/*.html').on('change', browserSync.reload);
}

const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');

function styles() {
	return src('app/' + preprocessor + '/main.' + 'scss') 
	.pipe(eval(preprocessor)())
	.pipe(concat('app.min.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) 
	.pipe(cleancss( { level: { 1: { specialComments: 0 } } } )) 
    .pipe(dest('app/css/')) 
	.pipe(browserSync.stream())
}

exports.styles = styles;

exports.default = parallel(styles, browsersync, startwatch);