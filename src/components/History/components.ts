import styled, { css } from 'styled-components'

const fontStyles = css`
  font-size: ${({ theme }) => theme.fontSizes[3]}px;
  color: ${({ theme }) => theme.colors.textGrey};
  line-height: ${({ theme }) => theme.fontSizes[5]}px;
`

const HistoryStyled = styled.div`
  width: 200px;
  height: 460px;
  background-color: ${({ theme }) => theme.colors.secondaryLightGrey};
  margin-left: ${({ theme }) => theme.spaces[4]}px;
  padding-top: ${({ theme }) => theme.spaces[3]}px;
  border-radius: 20px;
  @media (max-width: ${(props) => props.theme.size.small}px) {
    width: 420px;
    margin-left: 0;
  }
`

const HistoryContent = styled.div`
  height: 85%;
  /* width: 180px; */
  /* margin-top: ${({ theme }) => theme.spaces[2]}px; */
  /* padding: ${({ theme }) => theme.spaces[3]}px; */
  padding-right: ${({ theme }) => theme.spaces[3]}px;
  margin: ${({ theme }) => theme.spaces[3]}px;
  overflow: auto;
  margin-right: ${({ theme }) => theme.spaces[1] / 2}px;
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

const HistoryHeading = styled.h3`
  ${fontStyles};
  font-weight: 400;
  text-align: center;
`

const Divider = styled.div`
  width: 90%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.textGrey};
  height: 2px;
`

const HistoryItem = styled.p`
  ${fontStyles};
  text-align: right;
  white-space: nowrap;
`
export { HistoryStyled, HistoryHeading, Divider, HistoryContent, HistoryItem }
