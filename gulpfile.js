/*npm install --save-dev jshint gulp-jshint */
'use strict';

var gulp=require('gulp'),
    browserSync =require('browser-sync'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps');



gulp.task('refresh', ['ready'], function() {
   browserSync.reload();
});


gulp.task('ready',['styles','scripts','images'], function() {

//moving files
gulp.src('./src/*.html')
   .pipe(gulp.dest('./public'));

gulp.src('./dist/**')
   .pipe(gulp.dest('./public/dist'));

gulp.src('./src/app/*')
   .pipe(gulp.dest('./public/app'));

gulp.src('./src/templates/*')
   .pipe(gulp.dest('./public/templates'));

});


gulp.task('styles', function() {
  return gulp.src('./src/styles/*.scss')
        .pipe(sass().on('error',sass.logError)) 
        .pipe(sourcemaps.write())
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('scripts', function() {
  return gulp.src('./src/scripts/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});


gulp.task('images', function() {
  return gulp.src('src/images/*')
    /*.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))*/
    .pipe(gulp.dest('./dist/img'));
});


gulp.task('watch', function() {
    gulp.watch('src/*.html', ['refresh']);
    gulp.watch('src/styles/*.scss', ['refresh']);
    gulp.watch('src/images/*', ['refresh']);
    gulp.watch('src/scripts/*.js', ['refresh']);
    gulp.watch('src/templates/*.html', ['refresh']);
    gulp.watch('src/app/*', ['refresh']);
});

gulp.task('server',['ready'], function() {
    browserSync({
        server: {
            baseDir: ['public']
        }
    });

    gulp.start('watch');
    
}); 


gulp.task('default',['server']);
