const defaultTask = require('./gulp-files/tasks/defaultTask');
const watchTask = require('./gulp-files/tasks/watchTask');
const gulp = require('gulp');

gulp.task('default', () => defaultTask());
gulp.task('watch', () => watchTask());