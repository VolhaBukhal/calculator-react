import styled from 'styled-components'

type DisplayResProps = {
  error: boolean
  result: string
}

export const DisplayStyled = styled.div<DisplayResProps>`
  width: 100%;
  height: 115px;
  background-color: ${({ theme }) => theme.colors.secondaryLightGrey};
  border-radius: 10px;
  color: ${(props) =>
    props.error
      ? props.theme.colors.error
      : !!props.result
      ? props.theme.colors.secondaryDarkGrey
      : props.theme.colors.black};
  font-size: ${(props) =>
    props.error ? `${props.theme.fontSizes[4]}px` : `${props.theme.fontSizes[5]}px`};
  padding: ${({ theme }) => theme.spaces[3]}px;
  line-height: ${({ theme }) => theme.fontSizes[6]}px;
  text-align: right;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.secondaryGrey};
    border-radius: 10px;
    &:hover {
      background-color: ${({ theme }) => theme.colors.secondaryDarkGrey};
    }
  }
  div {
    align-self: flex-end;
    font-size: ${({ theme }) => theme.fontSizes[5]}px;
    color: ${({ theme }) => theme.colors.black};
    display: ${({ result }) => (!!result ? 'block' : 'none')};
  }
`
