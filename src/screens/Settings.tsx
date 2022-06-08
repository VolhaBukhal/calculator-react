import { Component } from 'react'
import { localStorageClear } from '@/helpers/localStorage'
import { ThemeUserContext } from '@/themeContext/ThemeContext'

type SettingsProps = {
  toggleTheme: () => void
}

class Settings extends Component<SettingsProps> {
  static contextType = ThemeUserContext

  componentDidMount() {
    const themeContext = this.context

    console.log(themeContext) // { theme: 'Tania', toggleTheme: () => {} }
    // console.log(Settings.contextType)
  }

  handleClick = () => {
    console.log('handleClick in Settings')
    this.props.toggleTheme()
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
