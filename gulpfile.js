const gulp = require('gulp');
const gulpNgConfig = require('gulp-ng-config');
const gnf = require('gulp-npm-files');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const ngAnnotate = require('gulp-ng-annotate');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const nodemon = require('gulp-nodemon');

gulp.task('default', ['prod']);

gulp.task('prod', ['set-prod', 'build']);

gulp.task('dev', ['set-dev', 'build', 'watch:js', 'watch:html', 'watch:css', 'watch:images', 'dev:server']);

gulp.task('build', ['libs', 'images', 'js', 'html', 'css']);


gulp.task('set-prod', function () {
    return process.env.NODE_ENV = 'production';
});

gulp.task('set-dev', function () {
    return process.env.NODE_ENV = 'development';
});

gulp.task('js', ['config'], function () {
    if (process.env.NODE_ENV == 'development') {
        return gulp.src(['public/**/*.js'])
            .pipe(concat('app.js'))
            .pipe(gulp.dest('assets'));
    } else {
        return gulp.src(['public/**/*.js'])
            .pipe(sourcemaps.init())
            .pipe(concat('app.js'))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('assets'));
    }
});

gulp.task('config', function () {
    return gulp.src('config.json')
        .pipe(gulpNgConfig('sampleit.config', {environment: process.env.NODE_ENV}))
        .pipe(gulp.dest('public'));
});

gulp.task('libs', function () {
    gulp.src(['static_modules/**/*.*']).pipe(gulp.dest('assets/libs'));
    gulp.src(gnf(), {base: './node_modules'}).pipe(gulp.dest('assets/libs'));
});

gulp.task('html', function () {
    gulp.src(['public/**/*.html'])
        .pipe(gulp.dest('assets'));
});

gulp.task('css', function () {
    gulp.src('public/css/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('assets'))
});

gulp.task('images', function () {
    gulp.src(['public/images/*.*'])
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('assets/images'))
});

// Dev Tasks

// Start Node Server (Express Web App)
gulp.task('dev:server', function () {
    nodemon({
        script: 'server.js',
        ext: 'js'
    });
});

gulp.task('watch:js', ['js'], function () {
    gulp.watch('public/**/*.js', ['js']);
});

gulp.task('watch:html', ['html'], function () {
    gulp.watch('public/**/*.html', ['html']);
});

gulp.task('watch:css', ['css'], function () {
    gulp.watch('public/**/*.styl', ['css']);
});

gulp.task('watch:images', ['images'], function () {
    gulp.watch('public/images/*.*', ['images']);
});
