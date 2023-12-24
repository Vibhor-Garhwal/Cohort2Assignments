function createChild(title, description, id) {
    const child = document.createElement("div");
    const firstgrandchild = document.createElement('div');
    
}


function addTodo() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    console.log(title, description);

    const childDiv = document.createElement("div");
    childDiv.innerHTML = title;
    document.getElementById("container").appendChild(childDiv);



    const originalHTML = document.getElementById("container").innerHTML;
    document.getElementById("container").innerHTML = originalHTML + `<div>
    <div>${title}</div>
    <div>${description}</div>
    <button>Mark as Done</button>
    </div>`
}