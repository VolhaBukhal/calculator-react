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
  width: ${({ theme }) => theme.widths[4]}%;
  height: ${({ theme }) => theme.widths[5]}px;
  background-color: ${({ theme }) => theme.colors.secondaryLightGrey};
  border-radius: ${({ theme }) => theme.borderRadius[1]}px;
  padding: ${({ theme }) => theme.spaces[3]}px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: ${({ theme }) => theme.fontSizes[1] / 2}px;
    height: ${({ theme }) => theme.fontSizes[1] / 2}px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.secondaryGrey};
    border-radius: ${({ theme }) => theme.borderRadius[1]}px;
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
