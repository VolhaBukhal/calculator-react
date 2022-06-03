import { NavLink } from 'react-router-dom'
import { StyledHeader, Logo, Navigation, NavItem } from './components'
import routes from '@/constants/router'

const pages = [
  { page: 'In Classes', path: routes.CLASS_COMPONENTS_PAGE_ROUTE },
  { page: 'In Functions', path: routes.FUNCTION_COMPONENTS_PAGE_ROUTE },
  { page: 'Settings', path: routes.SETTINGS_PAGE_ROUTE },
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

const Header = () => {
  return (
    <>
      <StyledHeader>
        <Logo>Calculator App</Logo>
        <Navigation>
          {pages.map((pageInfo) => (
            <NavLink
              to={pageInfo.path}
              key={pageInfo.page}
              style={({ isActive }) => (isActive ? isActiveStyle : notActiveStyle)}
            >
              <NavItem> {pageInfo.page}</NavItem>
            </NavLink>
          ))}
        </Navigation>
      </StyledHeader>
    </>
  )
}

export default Header
