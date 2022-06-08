import styled from 'styled-components'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spaces[3]}px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  transition: ${({ theme }) => theme.transition};
`
const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[5]}px;
  padding-bottom: ${({ theme }) => theme.spaces[1]}px;
`
const Navigation = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 40%;
`
const NavItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  color: ${({ theme }) => theme.colors.text};
  list-style-type: none;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: transparent;
  transition: 0.4s;
  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
  }
`

export { StyledHeader, Logo, Navigation, NavItem }
