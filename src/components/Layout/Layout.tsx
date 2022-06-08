import { Outlet } from 'react-router-dom'
import { StyledLayout, StyledContainer } from './components'
import Header from '@/components/Header/Header'

const Layout = () => {
  return (
    <StyledLayout>
      <Header />
      <StyledContainer>
        <Outlet />
      </StyledContainer>
    </StyledLayout>
  )
}

export default Layout
