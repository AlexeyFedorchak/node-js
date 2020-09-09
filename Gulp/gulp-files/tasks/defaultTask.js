const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

const defaultTask = function () {
    return gulp.src('app/*.jsx')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["@babel/preset-env", "@babel/preset-react"]
        }))
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
};

module.exports = defaultTask;