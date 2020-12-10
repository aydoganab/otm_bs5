let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    terser = require('gulp-terser'),
    browserSync = require('browser-sync').create();


gulp.task('sass', function () {
    return gulp.src('./scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({browserlist: [">= 1%", "last 1 major version", "not dead", "Chrome >= 60", "Firefox >= 60", "Edge >= 16", "iOS >= 10", "Safari >= 10", "Android >= 6", "not Explorer <= 11"]}))
        .pipe(csso())
        .pipe(rename("otm_bs5.css"))
        .pipe(gulp.dest("app"))
});