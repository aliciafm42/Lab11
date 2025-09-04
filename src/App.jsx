import { useState } from 'react'
import './App.css'
import Header from './Header.jsx';
import './Header.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <h1>Profile App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App
