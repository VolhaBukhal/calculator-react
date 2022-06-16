import { ChangeEvent, Component } from 'react'

import {
  localStorageClear,
  localStorageSetTheme,
  localStorageGetTheme,
} from '@/helpers/localStorage'

import {
  SettingsWrapper,
  SettingsHeader,
  SettingsButton,
  SettingsLabel,
  SettingsSelect,
} from './components'

import { ThemeListKeys } from '@/App'

interface SettingsProps {
  toggleTheme: (curTheme: ThemeListKeys) => void
}

const options = [
  { value: 'light', title: 'Light Theme' },
  { value: 'colored', title: 'Colored Theme' },
  { value: 'dark', title: 'Dark Theme' },
]

class Settings extends Component<SettingsProps> {
  handleClick = (event: ChangeEvent<HTMLSelectElement>) => {
    const curTheme = event.target.value
    this.props.toggleTheme(curTheme as ThemeListKeys)
    localStorageSetTheme(curTheme)
  }

  handleClearHistory = () => {
    localStorageClear()
  }

  render() {
    return (
      <SettingsWrapper>
        <SettingsHeader>Calculator App settings</SettingsHeader>
        <SettingsLabel>
          Change Theme
          <SettingsSelect
            name="theme-switcher"
            onChange={this.handleClick}
            value={localStorageGetTheme() || 'light'}
          >
            {options.map(({ value, title }) => (
              <option key={value} value={value}>
                {title}
              </option>
            ))}
          </SettingsSelect>
        </SettingsLabel>
        <SettingsButton
          buttonType="number"
          width="200"
          height="80"
          onClick={this.handleClearHistory}
        >
          Clear History
        </SettingsButton>
      </SettingsWrapper>
    )
  }
}

export default Settings
