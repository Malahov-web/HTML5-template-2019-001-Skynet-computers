var gulp = require('gulp'),

	uglify = require('gulp-uglify'),  // ���������� Uglify

    sass = require('gulp-sass'),  // ���������� Sass �����	
	
	browserSync = require('browser-sync'),  // ���������� Browser Sync
	
	concat = require('gulp-concat'), // ����������  Gulp Concat
	
	sourcemaps = require('gulp-sourcemaps'),  // ���������� Gulp Sourcemaps  ( ������� �����, ����� � ���������� �������� ���������� ������ ����� � sass-�����   )
	
	glob = require('glob'),

	plumber = require('gulp-plumber'),  // ������������ ��������� ������ ��-�� ������
	
	autoprefixer = require('gulp-autoprefixer'),
	
	csslint = require('gulp-csslint');

var iconfont = require('gulp-iconfont');

var runTimestamp = Math.round(Date.now()/1000);	

var async = require('async');

var consolidate = require('gulp-consolidate');

var svgmin = require('gulp-svgmin');

var rename = require('gulp-rename');

var del = require('del'); // ���������� ���������� ��� �������� ������ � �����

var cleanCSS = require('gulp-clean-css');


// Vars
var fontName = 'themify';
var js_owl = 'app/libs/owl.carousel/dist/owl.carousel.min.js';
var js_selectric = 'app/libs/jquery-selectric/public/jquery.selectric.min.js';
	

	// SCSS - ����������
	gulp.task('scss', function(){ // ������� ���� "scss"		
		return gulp.src('app/sass/**/*.scss')

		.pipe(sourcemaps.init())
		.pipe(plumber())
		// .pipe(postcss(processors, {syntax: syntax_scss}))
		.pipe(sass()) // ����������� scss � CSS ����������� gulp-sass
		// .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		
		.pipe(gulp.dest('app/css')) 
		.pipe(browserSync.reload({stream: true}))
	});	


	// Browser-sync - �������������� �������
    gulp.task('browser-sync', function() { // ������� ���� browser-sync
        browserSync({ // ��������� browser Sync
            server: { // ���������� ��������� �������
                baseDir: 'app' // ���������� ��� ������� - app
            },
            notify: false // ��������� �����������
        });
    });
	
	
	// Svgmin - ����������� svg
	gulp.task('Svgmin', function () {
	    return gulp.src('app/images/svg-icons/*')
	        .pipe(svgmin({
	            plugins: [
	                { removeDimensions: true },
	                { cleanupListOfValues: true },
	                { cleanupNumericValues: true }
	            ]
	        }))
	        .pipe(rename(function (path) {
	            path.basename = path.basename.replace(/\ /g, "")
	        }))
	        .pipe(gulp.dest('app/images/svg-min'));
	});


	// Iconfont - ��������� ������
	gulp.task('Iconfont', function (done) {
	    var iconStream = gulp.src(['app/images/svg-min/*.svg'])
	        .pipe(iconfont({
	            fontName: fontName,
	            formats: ['ttf', 'eot', 'woff', 'svg', 'woff2'],
	            fixedWidth: true,
	            centerHorizontally: true,
	        }));
	    async.parallel([
	        function handleGlyphs(cb) {
	            iconStream.on('glyphs', function (glyphs, options) {
	                // gulp.src('app/images/svgfontstyle/css.css')
	                gulp.src('app/images/svgfontstyle/svgfontstyle.scss')
	                    .pipe(consolidate('lodash', {
	                        glyphs: glyphs,
	                        fontName: fontName,
	                        fontPath: '../fonts/',
	                        className: fontName,

	                    }))
	                    // .pipe(gulp.dest('app/css/'))
	                    .pipe(gulp.dest('app/sass/'))
	                    .on('finish', cb);
	            });
	        },
	        function handleFonts(cb) {
	            iconStream
	                .pipe(gulp.dest('app/fonts/'+fontName+'/'))
	                .on('finish', cb);
	        }
	    ], done);
	});	


	// JS - ������
	gulp.task('js', function() {
	  return  gulp.src(
	  	[
	  		js_owl,
	  		js_selectric,
	  		'app/js/*.js'

	  		//, 'app/js/menu-responsive/js/menu-responsive.js'
	  	]
	  	)
	    .pipe(concat('scripts.js'))
	    .pipe(uglify())
	    .pipe(rename('scripts.min.js'))
	    .pipe(gulp.dest('app/js/min/'));
	});	


	// Lint - stylelint
	var stylelint = require('stylelint');
	var postcss = require('gulp-postcss');
	var messages = require('postcss-browser-reporter');
	var syntax_scss = require('postcss-scss');

	var processors = [
	    stylelint({
	        reporters: [
	            {formatter: 'string', console: true}
	        ]
	        // ,fix: true
	    }),
	    messages({
	        selector: 'body:before'
	    })
	];

	gulp.task('clean', function() {
	    return del.sync('dist'); // ������� ����� dist ����� �������
	});


// ������
gulp.task('watch', ['browser-sync', 'scss'], function() {

	gulp.watch('app/sass/**/*.+(scss|scss)', [ 'scss']);	
});

gulp.task('watchjs', ['browser-sync', 'js'], function() {

	gulp.watch('app/js/*.js', ['js']);		
});	

gulp.task('makesvgfont', ['Svgmin', 'Iconfont']);

gulp.task('build', ['clean'],  function () {

	gulp.src('app/*.html')
		.pipe(gulp.dest('dist'))		

	gulp.src('app/css/**/*.css')
		.pipe(cleanCSS({compatibility: 'ie10'}))
		.pipe(gulp.dest('dist/css'))

	gulp.src('app/js/min/scripts.min.js')
		.pipe(gulp.dest('dist/js/min'))

	gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'))

	gulp.src('app/images/**/*')
		.pipe(gulp.dest('dist/images'))

	gulp.src('app/uploads/**/*')
		.pipe(gulp.dest('dist/uploads'))	
	
});

gulp.task('default', ['watch']);





