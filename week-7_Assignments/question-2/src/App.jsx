import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { buttonAtom } from './atoms'

function App() {
  const [color, setColor] = useState('black');
  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);
  
  return (
    <>
      <h1>Background Color changing App</h1>
      <ColorButton buttonColor={'yellow'} />
      <ColorButton buttonColor={'white'} />
      <ColorButton buttonColor={'black'} />
      <ColorButton buttonColor={'green'} />
      <ColorButton buttonColor={'blue'} />
      <ColorButton buttonColor={'red'} />
    </>
  )
}

function ColorButton({ buttonColor }) {
  // const [color, changeColor] = useState('#ffffff')
  return (
    <button onClick={() => {
      document.body.style.backgroundColor = buttonColor;
    }} style={{ margin: '10px' }}>{buttonColor}</button>
  )

}
export default App
