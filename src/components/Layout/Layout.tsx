import { Outlet } from 'react-router-dom'
import { StyledLayout } from './components'
import Header from '@/components/Header/Header'

const Layout = () => {
  return (
    <StyledLayout>
      <Header />
      <Outlet />
    </StyledLayout>
  )
}

export default Layout
