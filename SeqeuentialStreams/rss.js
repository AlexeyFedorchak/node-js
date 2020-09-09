const fs = require('fs');
const request = require('request');
const htmlparser = require('htmlparser');
const configFilename = './rss_feed.txt';

function checkForRSSFile() {
    fs.exists(configFilename, (exists) => {
        if (!exists)
            return next(new Error(`Missing RSS file: ${configFilename}`));

        return next(null, configFilename);
    });
}

function readRSSFile() {
    fs.readFile(configFilename, (err, feedList) => {
        if (err) return next(err);

        feedList = feedList
            .toString()
            .split('item')
            .filter(x => x.search('https') > -1)
            .map(x =>
                x.replace("\n    ", '')
                    .replace('</', '')
                    .replace('>', '')
                    .replace("\n  ", ''))
            .splice(1, 2);

        const random = Math.floor(Math.random() * feedList.length);
        next(null, feedList[random]);
    });
}

function downloadRSSFeed(feedUrl) {
    request({ uri: feedUrl }, (err, res, body) => {
        if (err) return next(err);

        if (res.statusCode !== 200)
            return next(new Error('Abnormal response status!'));

        next(null, body);
    });
}

function parseRSSFeed(rss) {
    const handler = new htmlparser.RssHandler();
    const parser = new htmlparser.Parser(handler);
    parser.parseComplete(rss);

    if (!handler.dom.items)
        return next(new Error('No RSS items found'));

    const item = handler.dom.items.shift();
    console.log(item.title);
    console.log(item.link);
}

const tasks = [
    checkForRSSFile,
    readRSSFile,
    downloadRSSFeed,
    parseRSSFeed
];

function next(err, result) {
    if (err) throw err;

    const currentTask = tasks.shift();
    if (currentTask) {
        currentTask(result);
    }
}

next();

