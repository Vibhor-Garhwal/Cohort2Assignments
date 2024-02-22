import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
// import { useHistory } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/sendotp' element={<SendOtp />}></Route>
          <Route path='/verifyotp' element={<VerifyOtp />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function SendOtp() {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <input type="text" placeholder='Enter your number' style={{margin:'10px', width:'300px', height:'25px', borderStyle:'none', borderRadius:'5px', padding:'10px'}} />
      <Link to="/verifyotp">
        <button >Send OTP</button>
      </Link>
    </div>
  )
}
function VerifyOtp() {
  return (
    <div style={{border:'1px solid grey', padding:"10px", borderRadius:"20px"}}>
      <h1>OTP Verification Page</h1>
      <input type='number' style={{width:'20px',height:'40px', borderStyle:"none", padding:"10px", margin:'10px', borderRadius:'5px'}}></input>
      <input type='number' style={{width:'20px',height:'40px', borderStyle:"none", padding:"10px", margin:'10px', borderRadius:'5px'}}></input>
      <input type='number' style={{width:'20px',height:'40px', borderStyle:"none", padding:"10px", margin:'10px', borderRadius:'5px'}}></input>
      <input type='number' style={{ width: '20px', height: '40px', borderStyle: "none", padding: "10px", margin: '10px', borderRadius: '5px' }}></input>
      <div>
        <button>Verify OTP</button>
      </div>
    </div>
  )
}
export default App
