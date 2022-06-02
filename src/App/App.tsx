import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import routes from '@/constants/router'
import Settings from '@pages/Settings'
import ClassCalculator from '@pages/ClassCalculator'
import FunctionCalculator from '@pages/FunctionCalculator'
import PageNotFound from '@/pages/PageNotFound'

function App() {
  return (
    <>
      <Routes>
        <Route path={routes.HOME_PAGE_ROUTE} element={<Layout />}>
          <Route index element={<ClassCalculator />} />
          <Route path={routes.FUNCTION_COMPONENTS_PAGE_ROUTE} element={<FunctionCalculator />} />
          <Route path={routes.SETTINGS_PAGE_ROUTE} element={<Settings />} />
          <Route path={routes.NOT_FOUND_PAGE_ROUTE} element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
