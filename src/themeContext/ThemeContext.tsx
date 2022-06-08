import React, { Component, createContext, Dispatch } from 'react'
import { lightTheme, darkTheme, baseTheme as theme } from '@/theme'
import { DefaultTheme } from 'styled-components'

export const ThemeUserContext = createContext<{
  theme: DefaultTheme
  toggleTheme: Dispatch<DefaultTheme>
}>({
  theme: theme,
  toggleTheme: () => {},
})

type ThemeContextState = {
  theme: DefaultTheme
}

type ThemeContextProps = {
  children: React.ReactNode
}

class ThemeContextProvider extends Component<ThemeContextProps, ThemeContextState> {
  state = {
    theme: theme,
  }

  toggleTheme = () => {
    this.setState(({ theme }) => ({
      theme: theme === lightTheme ? darkTheme : lightTheme,
    }))
  }
  render() {
    const { children } = this.props
    const { theme } = this.state
    return (
      <ThemeUserContext.Provider value={{ theme, toggleTheme: this.toggleTheme }}>
        {children}
      </ThemeUserContext.Provider>
    )
  }
}

export default ThemeContextProvider
