import styled from 'styled-components'

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: ${({ theme }) => theme.widths[4]}%;
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spaces[3]}px;
  background-color: ${({ theme }) => theme.colors.secondaryDark};
  transition: ${({ theme }) => theme.transition};
  @media (max-width: ${(props) => props.theme.size.small}px) {
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spaces[3]}px;
  }
`
export const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[5]}px;
  padding-bottom: ${({ theme }) => theme.spaces[1]}px;
`
export const Navigation = styled.ul`
  display: flex;
  justify-content: space-between;
  width: ${({ theme }) => theme.widths[0]}%;
  @media (max-width: ${(props) => props.theme.size.small}px) {
    width: ${({ theme }) => theme.widths[2]}%;
  }
`
export const NavItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes[2]}px;
  color: ${({ theme }) => theme.colors.text};
  list-style-type: none;
  border-bottom-width: ${({ theme }) => theme.spaces[1] / 2}px;
  border-bottom-style: solid;
  border-bottom-color: transparent;
  transition: ${({ theme }) => theme.transition};
  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
  }
`
