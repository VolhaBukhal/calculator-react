import styled from 'styled-components'

export const StyledLayout = styled.div`
  width: ${({ theme }) => theme.widths[4]}%;
  margin: 0 auto;
`
export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: ${({ theme }) => theme.widths[4]}vw;
  height: calc(100vh - 76px);
  margin: 0 auto;
  padding-top: ${({ theme }) => theme.spaces[5]}px;
  background-color: ${({ theme }) => theme.colors.body};
  transition: ${({ theme }) => theme.transition};
  @media (max-width: ${(props) => props.theme.size.small}px) {
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spaces[3]}px;
    height: auto;
  }
`
