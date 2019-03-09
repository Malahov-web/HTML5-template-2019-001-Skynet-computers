
var gulp = require('gulp'),

	uglify = require('gulp-uglify'),  // Подключаем Uglify

    sass = require('gulp-sass'),  // Подключаем Sass пакет	
	
	browserSync = require('browser-sync'),  // Подключаем Browser Sync
	
	concat = require('gulp-concat'), // Подключаем  Gulp Concat
	
	sourcemaps = require('gulp-sourcemaps'),  // Подключаем Gulp Sourcemaps  ( создает карту, чтобы в инспекторе браузера показывать строку стиля в sass-файле   )
	
	glob = require('glob'),
	
	//gulpicon = require('gulpicon/tasks/gulpicon');
	
	//svgSprite = require("gulp-svg-sprites");

	
	//minifyCSS = require('gulp-csso');  // CSS минификатор
	
	//htmlValidator = require gulp-htmlhint HTML валидатор
	//htmlHint = require('gulp-htmlhint');  // HTML валидатор
	
	//csslint = require('gulp-csslint');  //  CSS линтер
	
	plumber = require('gulp-plumber'),  // Преодхраняет остановку задачи из-за ошибки
	
	autoprefixer = require('gulp-autoprefixer'),
	
	csslint = require('gulp-csslint');

var iconfont = require('gulp-iconfont');
var runTimestamp = Math.round(Date.now()/1000);	

var async = require('async');
var consolidate = require('gulp-consolidate');
var svgmin = require('gulp-svgmin');
var rename = require('gulp-rename');
// переменная с именем нашего шрифта (на выбор)
var fontName = 'themify';
	

var js_owl = 'app/libs/owl.carousel/dist/owl.carousel.min.js';
	
	// SASS - компиляция
	gulp.task('css', function(){ // Создаем таск "sass"
		
		//return gulp.src('app/sass/*.sass') // Берем все sass файлы из папки sass 
		return gulp.src('app/css/*.css') // Берем все sass файлы из папки sass 		


			.pipe(autoprefixer())

			//.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
			//.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
	});


	// SCSS - компиляция
	gulp.task('scss', function(){ // Создаем таск "scss"		
		return gulp.src('app/sass/**/*.scss') // Берем все scss файлы из папки sass 

		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass()) // Преобразуем scss в CSS посредством gulp-sass
		// .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении			
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
	


	// Browser-sync - автообновление старниц
    gulp.task('browser-sync', function() { // Создаем таск browser-sync
        browserSync({ // Выполняем browser Sync
            server: { // Определяем параметры сервера
                baseDir: 'app' // Директория для сервера - app
            },
            notify: false // Отключаем уведомления
        });
    });
	
	
	

	// Процесс разработки проекта
	gulp.task('watch', ['browser-sync', 'scss'], function() {
		
		//gulp.watch('app/sass/*.sass', ['build']);
		//gulp.watch('app/sass/*.sass', ['sass']);
		
		
		//gulp.watch('app/sass/*.+(sass|scss)', ['sass', 'scss']);  // 24.07
		gulp
			.watch('app/sass/**/*.+(scss|scss)', [ 'scss']); // Наблюдение за sass файлами в папке app/sass
		//gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
		
	});

	gulp.task('watchjs', ['browser-sync', 'js'], function() {
	// gulp.task('watchjs', ['browser-sync'], function() {
		
		gulp.watch('app/js/*.js', ['js']);		
		
	});	
	
	
	
	// Сборка шрифтов
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


gulp.task('makesvgfont', ['Svgmin', 'Iconfont']);   // Срабатывает по частям, за 2 запуска)


// gulp.task('minify', function () {
//     gulp.src('app/js/min/scripts.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('app/js/min'));
// });


// JS - сборка
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