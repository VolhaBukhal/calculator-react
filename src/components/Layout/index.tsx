import { Outlet } from 'react-router-dom'

import { Header } from '@/components/Header'

import { StyledLayout, StyledContainer } from './styles'

export const Layout = () => (
  <StyledLayout>
    <Header />
    <StyledContainer data-cy="context-container">
      <Outlet />
    </StyledContainer>
  </StyledLayout>
)
