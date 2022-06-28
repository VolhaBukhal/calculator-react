import { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, DefaultTheme } from 'styled-components'

import { Layout } from '@components/Layout'
import { PAGE_ROUTES } from '@/constants/router'
import { Settings } from '@/screens/Settings'
import { CalculatorWrapper as ClassCalculator } from '@/components/CalculatorWrapper'
import { CalculatorWrapper as FunctionCalculator } from '@/functionComponents/CalculatorWrapper'
import { PageNotFound } from '@/screens/PageNotFound'
import { ErrorBoundary } from '@/components/ErrorBoundary'

import { localStorageGetTheme } from '@helpers/localStorage'
import { darkTheme, lightTheme, coloredTheme } from '@/theme'

type AppState = {
  theme: DefaultTheme
}

const ThemeList = {
  light: lightTheme,
  dark: darkTheme,
  colored: coloredTheme,
}

export type ThemeListKeys = keyof typeof ThemeList

class App extends Component<Record<string, unknown>, AppState> {
  state = {
    theme: darkTheme,
  }

  toggleTheme = (curTheme: ThemeListKeys) => {
    this.setState({ theme: ThemeList[curTheme] }, () => {})
  }

  componentDidMount() {
    const storedLSTheme = localStorageGetTheme()
    this.setState({ theme: ThemeList[storedLSTheme] })
  }

  render() {
    const { theme } = this.state
    return (
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <Routes>
            <Route path={PAGE_ROUTES.HOME} element={<Layout />}>
              <Route index element={<ClassCalculator />} />
              <Route path={PAGE_ROUTES.FUNCTION_COMPONENTS} element={<FunctionCalculator />} />
              <Route
                path={PAGE_ROUTES.SETTINGS}
                element={<Settings toggleTheme={this.toggleTheme} />}
              />
              <Route path={PAGE_ROUTES.NOT_FOUND} element={<PageNotFound />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </ThemeProvider>
    )
  }
}

export { App }
