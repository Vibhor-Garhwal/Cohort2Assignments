let count = 0;
function calling() {
    console.log(count);
    count++;
    setTimeout(calling, 1000);
}

calling()