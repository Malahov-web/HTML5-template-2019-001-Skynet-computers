
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
		return gulp.src('app/sass/*.scss') // ����� ��� scss ����� �� ����� sass 

		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass()) // ����������� scss � CSS ����������� gulp-sass
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		
		.pipe(gulp.dest('app/css')) // ��������� ���������� � ����� app/css
		.pipe(browserSync.reload({stream: true})) // ��������� CSS �� �������� ��� ���������			
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
	
	
	

	// ������� ���������� �������
	gulp.task('watch', ['browser-sync', 'scss'], function() {
		
		//gulp.watch('app/sass/*.sass', ['build']);
		//gulp.watch('app/sass/*.sass', ['sass']);
		
		
		//gulp.watch('app/sass/*.+(sass|scss)', ['sass', 'scss']);  // 24.07
		gulp
			.watch('app/sass/*.+(scss|scss)', [ 'scss']); // ���������� �� sass ������� � ����� app/sass
		//gulp.watch('app/*.html', browserSync.reload); // ���������� �� HTML ������� � ����� �������
		
	});
	
	
	
	
/*	
    gulp.task('concatcss', function() {
        return gulp.src([ // ����� ��� ����������� ����������
            //'app/libs/jquery/dist/jquery.min.js', // ����� jQuery
            //'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // ����� Magnific Popup
			
			'app/css/reset.css',
			'app/css/grid_24_r6.css',
			// 'app/css/fonts.css',
			// 'app/css/ui.css'
            ])
            .pipe(concat('default.min.css')) // �������� �� � ���� � ����� ����� libs.min.js
            .pipe(gulp.dest('app/css')); // ��������� � ����� app/js
    });
*/

/*
	gulp.task('common-js', function(){		
		return gulp.src([
				'app/js/common.js'
			])
		.pipe(concat('common.min.js')
		.pipe(uglify())
		.pipe(gulp.dest('app/js/'));

	});

	gulp.task('js', ['common-js'], function() {
		return gulp.src([
				'app/libs/jquery/dist/jquery.min.js',
				// �������
				'app/libs/jQuery.mmenu/dist/jquery.mmenu.all.js',
				'app/js/common.js', // ������ � �����				
			])
		.pipe(concat('scripts_2.min.js')
		.pipe(gulp.dest('app/js'))
		//.pipe(browserSync.reload({stream: true}));
	});
*/		