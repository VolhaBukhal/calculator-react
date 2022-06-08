import styled from 'styled-components'

const StyledLayout = styled.div`
  width: 100%;
  margin: 0 auto;
`
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: calc(100vh - 76px);
  margin: 0 auto;
  padding-top: ${({ theme }) => theme.spaces[5]}px;
  background-color: ${({ theme }) => theme.colors.body};
  transition: ${({ theme }) => theme.transition};
`
export { StyledLayout, StyledContainer }
