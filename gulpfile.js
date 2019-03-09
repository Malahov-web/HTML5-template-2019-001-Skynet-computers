
var gulp = require('gulp'),

	uglify = require('gulp-uglify'),  // ���������� Uglify

    sass = require('gulp-sass'),  // ���������� Sass �����	
	
	browserSync = require('browser-sync'),  // ���������� Browser Sync
	
	concat = require('gulp-concat'), // ����������  Gulp Concat
	
	sourcemaps = require('gulp-sourcemaps'),  // ���������� Gulp Sourcemaps  ( ������� �����, ����� � ���������� �������� ���������� ������ ����� � sass-�����   )
	
	glob = require('glob'),
	
	//gulpicon = require('gulpicon/tasks/gulpicon');
	
	//svgSprite = require("gulp-svg-sprites");

	
	//minifyCSS = require('gulp-csso');  // CSS �����������
	
	//htmlValidator = require gulp-htmlhint HTML ���������
	//htmlHint = require('gulp-htmlhint');  // HTML ���������
	
	//csslint = require('gulp-csslint');  //  CSS ������
	
	plumber = require('gulp-plumber'),  // ������������ ��������� ������ ��-�� ������
	
	autoprefixer = require('gulp-autoprefixer'),
	
	csslint = require('gulp-csslint');

var iconfont = require('gulp-iconfont');
var runTimestamp = Math.round(Date.now()/1000);	

var async = require('async');
var consolidate = require('gulp-consolidate');
var svgmin = require('gulp-svgmin');
var rename = require('gulp-rename');
// ���������� � ������ ������ ������ (�� �����)
var fontName = 'themify';
	

var js_owl = 'app/libs/owl.carousel/dist/owl.carousel.min.js';
	
	// SASS - ����������
	gulp.task('css', function(){ // ������� ���� "sass"
		
		//return gulp.src('app/sass/*.sass') // ����� ��� sass ����� �� ����� sass 
		return gulp.src('app/css/*.css') // ����� ��� sass ����� �� ����� sass 		


			.pipe(autoprefixer())

			//.pipe(sass()) // ����������� Sass � CSS ����������� gulp-sass
			//.pipe(gulp.dest('app/css')) // ��������� ���������� � ����� app/css
	});


	// SCSS - ����������
	gulp.task('scss', function(){ // ������� ���� "scss"		
		return gulp.src('app/sass/**/*.scss') // ����� ��� scss ����� �� ����� sass 

		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass()) // ����������� scss � CSS ����������� gulp-sass
		// .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		
		.pipe(gulp.dest('app/css')) // ��������� ���������� � ����� app/css
		.pipe(browserSync.reload({stream: true})) // ��������� CSS �� �������� ��� ���������			
	});	
// var gulp = require('gulp');
// var sass = require('gulp-sass');
 
// gulp.task('sass', function () {
//   gulp.src('./sass/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./css'));
// });
 
// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });
	


	// Browser-sync - �������������� �������
    gulp.task('browser-sync', function() { // ������� ���� browser-sync
        browserSync({ // ��������� browser Sync
            server: { // ���������� ��������� �������
                baseDir: 'app' // ���������� ��� ������� - app
            },
            notify: false // ��������� �����������
        });
    });
	
	
	

	// ������� ���������� �������
	gulp.task('watch', ['browser-sync', 'scss'], function() {
		
		//gulp.watch('app/sass/*.sass', ['build']);
		//gulp.watch('app/sass/*.sass', ['sass']);
		
		
		//gulp.watch('app/sass/*.+(sass|scss)', ['sass', 'scss']);  // 24.07
		gulp
			.watch('app/sass/**/*.+(scss|scss)', [ 'scss']); // ���������� �� sass ������� � ����� app/sass
		//gulp.watch('app/*.html', browserSync.reload); // ���������� �� HTML ������� � ����� �������
		
	});

	gulp.task('watchjs', ['browser-sync', 'js'], function() {
	// gulp.task('watchjs', ['browser-sync'], function() {
		
		gulp.watch('app/js/*.js', ['js']);		
		
	});	
	
	
	
	// ������ �������
/*	gulp.task('Iconfont', function(){
		return gulp.src(['app/images/svg/*.svg'])
	    	.pipe(iconfont({
				fontName: 'myfont', // required
				prependUnicode: true, // recommended option
				formats: ['ttf', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available
				timestamp: runTimestamp, // recommended to get consistent builds when watching files
	   		}))
	        .on('glyphs', function(glyphs, options) {
	       		// CSS templating, e.g.
	        	console.log(glyphs, options);
	    	})
	    	.pipe(gulp.dest('app/fonts'));
	});*/


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


gulp.task('makesvgfont', ['Svgmin', 'Iconfont']);   // ����������� �� ������, �� 2 �������)


// gulp.task('minify', function () {
//     gulp.src('app/js/min/scripts.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('app/js/min'));
// });


// JS - ������
gulp.task('js', function() {
  return  gulp.src(
  	[
  		js_owl,
  		'app/js/*.js'

  		//, 'app/js/menu-responsive/js/menu-responsive.js'
  	]
  	)
    .pipe(concat('scripts.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('app/js/min/'));
});