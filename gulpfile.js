let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify=require('gulp-uglify'),
    browserSync = require('browser-sync').create();

//SASS
gulp.task('sass', function () {
    return gulp.src('./scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({browserlist: [">= 1%", "last 1 major version", "not dead", "Chrome >= 60", "Firefox >= 60", "Edge >= 16", "iOS >= 10", "Safari >= 10", "Android >= 6", "not Explorer <= 11"]}))
        //.pipe(csso())
        .pipe(rename("otm_bs5.css"))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//JS
gulp.task('js', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.js','node_modules/bootstrap/dist/js/bootstrap.bundle.js'])
        //.pipe(uglify())
        .pipe(concat('otm_bs5.js'))
        .pipe(gulp.dest("app/js"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//Font Awesome
gulp.task('fa', function () {
    return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
        .pipe(gulp.dest("app/css/fonts"))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//BrowserSync
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: ['./app'],
            index: 'index.html',
            watchEvents: ["add", "change", 'unlink']
        }
    });
});

//Watch
gulp.task('watch', function () {
    gulp.watch('scss/*.scss', gulp.series('sass'));
    gulp.watch("app/*.html").on("change", browserSync.reload);
});

//DEFAULT
gulp.task('default', gulp.series('sass', 'js', 'fa', gulp.parallel('browserSync', 'watch')));