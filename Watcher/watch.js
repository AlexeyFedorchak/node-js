const WatcherLogic = require('./Logic');
const watcher = new WatcherLogic('./Watching', './Processed');
const fs = require('fs');

watcher.on('process', (file) => {
	console.log('Changes detected in ' + file + '. Renaming..');
	const watchFile = `${watcher.watchDir}/${file}`;
	const processedFile = `${watcher.processedDir}/${file.toLowerCase()}`;

	fs.rename(watchFile, processedFile, err => {
		if (err) throw err;
	});
});

console.log('Watching..');
watcher.start();