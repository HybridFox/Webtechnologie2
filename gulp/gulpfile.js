const gulp = require("gulp");
const sass = require("gulp-sass");
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const exec = require('gulp-exec');

gulp.task('image', function () {
    gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images'));
});

gulp.task('sass', function () {
    return gulp.src('./src/sass/app.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('babel', function () {
    return gulp.src('./src/js/app.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./public/javascript'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('babel:watch', function () {
    gulp.watch('./src/js/app.js', ['babel']);
});

gulp.task('server', function () {
    exec('forever -w bin/www', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});


gulp.task('run', ['sass:watch', 'image', 'babel:watch']);