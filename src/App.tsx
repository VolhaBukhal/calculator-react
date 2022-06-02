import React from 'react'
import './App.css'
import Layout from '@/components/Layout'
import InsideLayout from '@common/TestC'
import Button from '@common/Button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Start react calculator task</p>
        <Layout />
        <InsideLayout />
        <Button />
      </header>
    </div>
  )
}

export default App
