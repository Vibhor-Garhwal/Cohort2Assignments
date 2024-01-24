import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [todos, setTodos] = useState([{
    title: "title 1",
    description:"description 1"
  }])

  function onClickHandler() {
    const newtitle = document.getElementById('newtitle').value;
    console.log(newtitle);
    const newdescription = document.getElementById('newdescription').value;

    setTodos([...todos, { title: newtitle, description: newdescription }]);

  }
  return (
    <>
      <Inputdiv addtodo={onClickHandler}/>
        {todos.map(todo => {
        return <Todo title={todo.title} description={todo.description}/>
      })}
    </>
  )
}

function Todo(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{ props.description}</p>
    </div>
  )
}
function Inputdiv({ addtodo }) {
  return (
    <div>
        <input placeholder='Title' id='newtitle' type='text'></input>
        <br/>
        <input type='text' placeholder='Description' id='newdescription'></input>
        <br />
        <br />
      <button onClick={() => addtodo({
          title: document.getElementById('newtitle').value,
          description: document.getElementById('newdescription').value,
        })}>Add Todo</button>
        {/* {console.log('all reloaded')} */}
      </div>
  )
}
export default App
