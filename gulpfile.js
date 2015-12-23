var gulp = require('gulp');
var gnf = require('gulp-npm-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
var nodemon = require('gulp-nodemon');

// Set the default task to be "build" for now.
gulp.task('default', ['build']);

gulp.task('deploy', ['build', 'dev:server']);

gulp.task('build', ['libs', 'images', 'js', 'html', 'css']);

gulp.task('dev', ['libs', 'images', 'watch:js', 'watch:html', 'watch:css', 'dev:server']);

// Start Node Server (Express Web App)
gulp.task('dev:server', function () {
    nodemon({
        script: 'server.js',
        ext: 'js'
    });
});

gulp.task('libs', function () {
    gulp.src(gnf(), {base: './node_modules'}).pipe(gulp.dest('assets/libs'));
});

gulp.task('js', function () {
    gulp.src(['public/app.js', 'public/**/*.js'])
        //        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        //        .pipe(ngAnnotate())
        //        .pipe(uglify())
        //        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets'));
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
        .pipe(gulp.dest('assets'))
});

// Asset Watch tasks
gulp.task('watch:js', ['js'], function () {
    gulp.watch('public/**/*.js', ['js']);
});

gulp.task('watch:html', ['html'], function () {
    gulp.watch('public/**/*.html', ['html']);
});

gulp.task('watch:css', ['css'], function () {
    gulp.watch('public/**/*.styl', ['css']);
});

