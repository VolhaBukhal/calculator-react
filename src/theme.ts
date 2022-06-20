import baseStyled, { DefaultTheme, ThemedStyledInterface } from 'styled-components'
import { ITheme, ThemeEnum } from './styled'

// const font = 'sans-serif'
const font = 'Montserrat'

// Color palette
const black = '#000000'
const white = '#ffffff'
const error = '#c86464'
const primary = '#6d84b1'
const secondary = '#6c5b7b'
const secondaryLight = '#6a6b7b'
const secondaryDark = '#213055' // header
const secondaryGrey = '#787C87' // operand's button bg
const secondaryDarkGrey = '#374B57' // calculator bg
const secondaryLightGrey = '#D8E6F2' // display and history bg
const textGrey = '#525A66' // grey fonts
const body = '#6D84B1' // body
const buttonGreyLight = '#d3d7e3'
const buttonGreyDark = '#374b57'

const size = {
  xs: 550,
  small: 768,
  med: 992,
  large: 1200,
}

export const baseTheme: ITheme = {
  boxShadows: 'box-shadow: 0px 4px 24px -8px rgba(0,0,0,0.75)',
  font: font,
  body: '#6d84b1',
  spaces: [0, 4, 8, 16, 32, 64, 128],
  fontSizes: [12, 14, 16, 20, 24, 32, 40, 56, 72, 80],
  fontWeights: [400, 700],
  borderRadius: [5, 10, 20],
  widths: [40, 70, 80, 90, 100, 115, 200, 400, 420, 460],
  size: size,
  colors: {
    primary,
    secondary,
    secondaryLight,
    secondaryDark,
    secondaryGrey,
    secondaryDarkGrey,
    secondaryLightGrey,
    buttonGreyLight,
    buttonGreyDark,
    textGrey,
    black,
    white,
    error,
    body,
  },
  transition: '0.5s',
}

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  type: ThemeEnum.light,

  colors: {
    ...baseTheme.colors,
    secondaryDark: '#213055',
    secondaryLightGrey: '#d8e6f2',
    secondaryDarkGrey: '#374b57',
    buttonGreyLight: '#d3d7e3',
    buttonGreyDark: '#787c87',
    textGrey: '#525a66',
    text: '#ffffff',
    black: '#000000',
    body: '#6d84b1',
  },
}

export const darkTheme: DefaultTheme = {
  ...baseTheme,
  type: ThemeEnum.dark,

  colors: {
    ...baseTheme.colors,
    secondaryDark: '#6d84b1',
    secondaryLightGrey: '#525a66',
    secondaryDarkGrey: '#d3d7e3',
    textGrey: '#d8e6f2',
    buttonGreyLight: '#787c87',
    buttonGreyDark: '#ffffff',
    text: '#213055',
    black: '#d8e6f2',
    body: '#213055',
  },
}

export const coloredTheme: DefaultTheme = {
  ...baseTheme,
  type: ThemeEnum.colored,

  colors: {
    ...baseTheme.colors,
    secondaryDark: '#450e22',
    secondaryLightGrey: '#136f6f',
    secondaryDarkGrey: '#39b92d',
    textGrey: '#d8e6f2',
    buttonGreyLight: '#2d4416',
    buttonGreyDark: '#2ef966',
    text: '#ffff00',
    black: '#d8e6f2',
    body: '#df067d',
  },
}

export type Theme = typeof baseTheme
export const styled = baseStyled as ThemedStyledInterface<Theme>

export default { baseTheme }
