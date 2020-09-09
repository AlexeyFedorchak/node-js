const async = require('async');
async.series([
    callback => {
        setTimeout(() => {
            console.log('First');
            callback();
        }, 1000);
    },

    callback => {
        setTimeout(() => {
            console.log('Second');
            callback();
        }, 500);
    },

    callback => {
        setTimeout(() => {
            console.log('Third');
            callback();
        }, 100);
    }
]);