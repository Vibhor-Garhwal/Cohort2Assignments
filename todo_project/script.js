function createChild(title, description, id) {
    `
    <div>
        <div> title </div>
        <div> Description </div>
        <button id="id"> Mark as Done </button>
    </div>
    `
  const child = document.createElement("div");
    const firstgrandchild = document.createElement("div");
    firstgrandchild.innerHTML = title;

    const secondgrandchild = document.createElement('div');
    secondgrandchild.innerHTML = description;
    
    const thirdgrandchild = document.createElement('button');
    thirdgrandchild.innerHTML = 'Mark as Done';

    // thirdgrandchild.setAttribute('id', id);
    thirdgrandchild.setAttribute('onclick', `done(${id})`);

    child.appendChild(firstgrandchild);
    child.appendChild(secondgrandchild);
    child.appendChild(thirdgrandchild);

    child.setAttribute('id', id);
    return child;
}

function done(id) {
    let parent = document.getElementById(id);
    parent.children[2].innerHTML = 'Done';
}

let id = 0;
function addTodo() {
    //get the title and the description from the input 
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
    
//   console.log(title, description);

    //create the child for the title and the description
//   const childDiv = document.createElement("div");
//   childDiv.innerHTML = title;
    //     document.getElementById("container").appendChild(childDiv);
    let x = createChild(title, description, id++);
    console.log(x);
    document.getElementById('container').appendChild(x);

//     const originalHTML = document.getElementById("container").innerHTML;
    
//   document.getElementById("container").innerHTML =
//     originalHTML +
//     `<div>
//     <div>${title}</div>
//     <div>${description}</div>
//     <button>Mark as Done</button>
//     </div>`;
}
