const fs = require('fs');

fs.readFile('a.txt','utf-8',(err, data) => {
    console.log(data);
})

let a = 0;
for (i = 0; i < 1000000000; i++)
{
    a += i;
}