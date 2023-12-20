setInterval(() => {
    let date = new Date();
    let hours = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    console.log(`${hours}:${min}:${sec}`);
    setInterval(() => {
        console.clear();
    }, 999);
},1000)