import styled from 'styled-components'

type DisplayProps = {
  error: boolean
  result: string
}

type DisplayResProps = {
  result: string
}

export const DisplayStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  height: 115px;
  background-color: ${({ theme }) => theme.colors.secondaryLightGrey};
  border-radius: 10px;
  padding: ${({ theme }) => theme.spaces[3]}px;
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

export const DisplayExpression = styled.div<DisplayProps>`
  color: ${(props) =>
    props.error
      ? props.theme.colors.error
      : !!props.result
      ? props.theme.colors.secondaryDarkGrey
      : props.theme.colors.black};
  font-size: ${(props) =>
    props.error ? `${props.theme.fontSizes[4]}px` : `${props.theme.fontSizes[5]}px`};
  line-height: ${(props) =>
    props.result ? props.theme.fontSizes[6] + 'px' : props.theme.fontSizes[8] + 'px'};
  text-align: right;
`
export const DisplayRes = styled.div<DisplayResProps>`
  text-align: right;
  font-size: ${({ theme }) => theme.fontSizes[5]}px;
  color: ${({ theme }) => theme.colors.black};
  display: ${({ result }) => (!!result ? 'block' : 'none')};
`
