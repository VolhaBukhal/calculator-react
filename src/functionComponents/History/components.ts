import styled, { css } from 'styled-components'

const fontStyles = css`
  font-size: ${({ theme }) => theme.fontSizes[3]}px;
  color: ${({ theme }) => theme.colors.textGrey};
  line-height: ${({ theme }) => theme.fontSizes[5]}px;
`

export const HistoryStyled = styled.div`
  width: ${({ theme }) => theme.widths[6]}px;
  height: ${({ theme }) => theme.widths[9]}px;
  background-color: ${({ theme }) => theme.colors.secondaryLightGrey};
  margin-left: ${({ theme }) => theme.spaces[4]}px;
  padding-top: ${({ theme }) => theme.spaces[3]}px;
  border-radius: ${({ theme }) => theme.borderRadius[2]}px;
  @media (max-width: ${(props) => props.theme.size.small}px) {
    width: ${({ theme }) => theme.widths[8]}px;
    margin-left: ${({ theme }) => theme.spaces[0]};
  }
`

export const HistoryContent = styled.div`
  height: ${({ theme }) => theme.widths[2]}%;
  padding-right: ${({ theme }) => theme.spaces[3]}px;
  margin: ${({ theme }) => theme.spaces[3]}px;
  overflow: auto;
  margin-right: ${({ theme }) => theme.spaces[1] / 2}px;
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

export const HistoryHeading = styled.h3`
  ${fontStyles};
  font-weight: ${({ theme }) => theme.fontWeights[0]};
  text-align: center;
`

export const Divider = styled.div`
  width: ${({ theme }) => theme.widths[3]}%;
  margin: ${({ theme }) => theme.spaces[0]} auto;
  background-color: ${({ theme }) => theme.colors.textGrey};
  height: ${({ theme }) => theme.spaces[1] / 2}px;
`

export const HistoryItem = styled.p`
  ${fontStyles};
  text-align: right;
  white-space: nowrap;
`
