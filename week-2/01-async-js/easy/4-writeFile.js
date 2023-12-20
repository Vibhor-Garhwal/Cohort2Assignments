const fs = require('fs');
const prompt = require('prompt-sync')();

const input = prompt("What do you want to write in the file?: ");

function write() {
    return new Promise((resolve) => {
        fs.writeFile('a.txt', input, (err) => {
            if (err) throw err;
            else {
                console.log("file updated successfully");
            }
        });
        resolve(input);
    })
}

function read() {
    return new Promise((resolve => {
        fs.readFile('a.txt', 'utf-8', (err, data) => {
            if (err) throw err;
            else resolve(data);
        })
    }))
}

function print(data) {
    console.log(data);
}

write().then(read).then(print);

// let data = "Hello this is the new data which is updated in the file";
// fs.writeFile('a.txt', data, (err) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("data updated succesfully");
//     }
    
// })