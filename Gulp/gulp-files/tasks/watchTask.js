const defaultTask = require('./defaultTask');
const watcher = require('gulp-watch');

const watchTask = function () {
    return watcher('app/*.jsx', defaultTask);
};

module.exports = watchTask;