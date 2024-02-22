import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
function App() {
  const [username, setUsername] = useState("vibhor");
  useEffect(() => {
    axios.get(`https://api.github.com/users/${username}`).then((res) => {
      setUsername(res.data.login);
    })
  }, [username]);

  const handleChange = (event) => {
    setUsername(event.target.value);
  }
  const handleClick = () => {
    //handle on  click function
    
  }
  return (
    <div>
      <input onChange={handleChange}></input>
      <button onClick={handleClick}>Process Input</button>
      <h1>{username}</h1>
    </div>
  )
}
export default App

/**  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    // Process the user input here
    console.log('User input:', inputValue);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter text..."
      />
      <button onClick={handleButtonClick}>Process Input</button>
    </div>
  );
 * 
 */