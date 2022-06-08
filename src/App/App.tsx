import { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '@components/Layout'
import routes from '@/constants/router'
import Settings from '@/screens/Settings'
import ClassCalculator from '@/screens/ClassCalculator'
import FunctionCalculator from '@/screens/FunctionCalculator'
import PageNotFound from '@/screens/PageNotFound'
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import { baseTheme as theme, darkTheme, lightTheme } from '@/theme'

type AppState = {
  theme: DefaultTheme
}

class App extends Component<Record<string, unknown>, AppState> {
  state = {
    theme: darkTheme,
  }

  toggleTheme = () => {
    this.setState(
      ({ theme }) => ({
        theme: theme === darkTheme ? lightTheme : darkTheme,
      }),
      () => {
        console.log('them:', theme)
      }
    )
  }
  render() {
    const { theme } = this.state
    return (
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={routes.HOME_PAGE_ROUTE} element={<Layout />}>
            <Route
              index
              element={
                <ErrorBoundary>
                  <ClassCalculator />
                </ErrorBoundary>
              }
            />
            <Route
              path={routes.FUNCTION_COMPONENTS_PAGE_ROUTE}
              element={
                <ErrorBoundary>
                  <FunctionCalculator />
                </ErrorBoundary>
              }
            />
            <Route
              path={routes.SETTINGS_PAGE_ROUTE}
              element={<Settings toggleTheme={this.toggleTheme} />}
            />
            <Route path={routes.NOT_FOUND_PAGE_ROUTE} element={<PageNotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    )
  }
}

export default App
