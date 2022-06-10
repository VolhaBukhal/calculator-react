import styled from 'styled-components'

import { ButtonStyled } from '@common/Button/components'

export const SettingsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spaces[5]}px;
  @media (max-width: ${(props) => props.theme.size.small}px) {
    height: calc(100vh - 114.4px - 64px);
  }
`

export const SettingsHeader = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.buttonGreyLight};
`

export const SettingsButton = styled(ButtonStyled)`
  font-size: ${({ theme }) => theme.fontSizes[3]}px;
  color: ${({ theme }) => theme.colors.secondaryDarkGrey};
  &:hover {
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.colors.text};
  }
  &:active {
    box-shadow: 0 2px 3px ${({ theme }) => theme.colors.text};
    transform: scale(0.98);
  }
`

export const SettingsLabel = styled.label`
  color: ${({ theme }) => theme.colors.buttonGreyLight};
  font-weight: 700;
`

export const SettingsSelect = styled.select`
  appearance: none;
  margin-left: ${({ theme }) => theme.spaces[2]}px;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.spaces[1]}px ${({ theme }) => theme.spaces[1]}px 0 0;
  border-color: #87bd87;
  font-size: 1rem;
  transition: 0.5s all;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.text};
  }
`

export default { SettingsWrapper, SettingsHeader, SettingsButton, SettingsLabel, SettingsSelect }
