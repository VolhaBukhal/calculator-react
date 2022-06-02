import React from 'react'
import './App.css'
import Layout from 'components/Layout'
import InsideLayout from 'components/Layout/TestC/TestC'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Start react calculator task</p>
        <Layout />
        <InsideLayout />
      </header>
    </div>
  )
}

export default App
