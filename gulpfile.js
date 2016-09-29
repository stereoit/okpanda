var gulp         = require('gulp')
  , browserSync  = require('browser-sync').create()
  , sass         = require('gulp-sass')
  , notifier 	   = require('node-notifier')
  , sourcemaps   = require('gulp-sourcemaps')
  , postcss      = require('gulp-postcss')
  , autoprefixer = require('autoprefixer')
  , cssnano      = require('cssnano')

function sassErrorHandler (error) {
	notifier.notify({
        title: 'Sass compilation error',
        message: error.message
  	});
	sass.logError.call(this,error);
}


gulp.task('deploy', ['sass', 'media'], function() {});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'media'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

// copy various media to dist folder
gulp.task('media', function () {
   gulp.src('fonts/**/*.{ttf,woff,eot,svg}').pipe(gulp.dest('dist/fonts'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    var processors = [
      autoprefixer({browsers: ['last 1 version']}),
      cssnano(),
    ];

    return gulp.src("stylesheets/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sassErrorHandler))
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
