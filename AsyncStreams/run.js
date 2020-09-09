const fs = require('fs');
const async = require('async');
const tasks = [];
const wordCounts = {};
const filesDir = './text';
let completedTasks = 0;
let executionTime = 0;

function checkIfComplete() {
    completedTasks++;

    if (completedTasks === tasks.length) {
        for (let word in wordCounts) {
            console.log(`${word}: ${wordCounts[word]}`);
        }
        executionTime = (new Date).getMilliseconds() - executionTime;
        console.log('Execution time: ' + executionTime + ' milliseconds');
    }
}

function addWordCount(word) {
    wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1;
}

function countWordsInText(text) {
    const words = text
        .toString()
        .toLowerCase()
        .split(/\W+/)
        .sort();

    words
        .filter(word => word)
        .map(word => addWordCount(word));
}

executionTime = (new Date).getMilliseconds();

fs.readdir(filesDir, (err, files) => {
    if (err) throw err;

    files.map(file => {
        const task = (file => {
            return () => {
                fs.readFile(file, (err, text) => {
                    if (err) throw err;

                    countWordsInText(text);
                    checkIfComplete();
                });
            }
        })(`${filesDir}/${file}`);

        tasks.push(task);
    });

    tasks.map(x => x());
});