import { Component } from 'react'
import { localStorageClear } from '@/helpers/localStorage'

class Settings extends Component {
  handleClick = () => {
    console.log('handleClick in Settings')
  }

  handleClearHistory = () => {
    localStorageClear()
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}> Change Theme</button>
        <button onClick={this.handleClearHistory}> Clear History</button>
      </div>
    )
  }
}

export default Settings
