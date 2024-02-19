import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Card } from './components/card'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <div>
      <RecoilRoot>
        <Card />
      </RecoilRoot>
    </div>

  )
}

export default App
