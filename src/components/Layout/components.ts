import styled from 'styled-components'

const StyledLayout = styled.div`
  width: 100%;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};

  border-radius: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: ${({ theme }) => theme.boxShadows[0]};

  padding: ${({ theme }) => theme.spaces[4]}px;
`

export { StyledLayout }
