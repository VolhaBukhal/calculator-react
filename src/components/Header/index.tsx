import { NavLink } from 'react-router-dom'

import { StyledHeader, Logo, Navigation, NavItem } from './styles'

import { PAGE_ROUTES } from '@/constants/router'

const pages = [
  { page: 'In Classes', path: PAGE_ROUTES.CLASS_COMPONENTS },
  { page: 'In Functions', path: PAGE_ROUTES.FUNCTION_COMPONENTS },
  { page: 'Settings', path: PAGE_ROUTES.SETTINGS },
]

const isActiveStyle = {
  color: 'pink',
  textDecoration: 'none',
  borderBottom: '2px solid pink',
}

const notActiveStyle = {
  color: 'white',
  textDecoration: 'none',
}

export const Header = () => (
  <StyledHeader>
    <Logo data-cy="logo">Calculator App</Logo>
    <Navigation>
      {pages.map((pageInfo) => (
        <NavLink
          data-cy="nav-item"
          to={pageInfo.path}
          key={pageInfo.page}
          style={({ isActive }) => (isActive ? isActiveStyle : notActiveStyle)}
        >
          <NavItem> {pageInfo.page}</NavItem>
        </NavLink>
      ))}
    </Navigation>
  </StyledHeader>
)
