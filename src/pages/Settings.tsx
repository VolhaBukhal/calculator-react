import React from 'react'

const Settings = () => {
  const handleClick = () => {
    console.log('handleClick in Settings')
  }
  return (
    <div>
      <button onClick={handleClick}> Change Theme</button>
    </div>
  )
}

export default Settings
