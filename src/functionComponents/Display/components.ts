import styled from 'styled-components'

type DisplayResProps = {
  error: boolean
}

const DisplayStyled = styled.div<DisplayResProps>`
  width: 100%;
  height: 85px;
  background-color: ${({ theme }) => theme.colors.secondaryLightGrey};
  border-radius: 10px;
  color: ${(props) => (props.error ? props.theme.colors.error : props.theme.colors.black)};
  font-size: ${(props) =>
    props.error ? `${props.theme.fontSizes[4]}px` : `${props.theme.fontSizes[6]}px`};
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
`
export { DisplayStyled }
