import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [greetings, setGreetings] = useState('')
  useEffect(() => {
    fetch('/api/test/Kuba')
      .then((res) => res.json())
      .then((data) => console.log(data))
      .then((data) => setGreetings(data.message))
  }, [])


  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <img src="/api/assets/test.png" alt="test" />
      </div>
      <h1>Hello {greetings}</h1>
    </>
  )
}

export default App
