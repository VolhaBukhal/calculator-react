import { DefaultTheme } from 'styled-components'
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
const secondaryDark = '#213055' //header
const secondaryGrey = '#787C87' //operand's button bg
const secondaryDarkGrey = '#374B57' // calculator bg
const secondaryLightGrey = '#D8E6F2' //display and history bg
const textGrey = '#525A66' //grey fonts
const body = '#6D84B1' //body

// const boxShadows = ['box-shadow: 0px 4px 24px -8px rgba(0,0,0,0.75)']

// const size = {
//   xs: 550,
//   small: 768,
//   med: 992,
//   large: 1200,
// }

export const baseTheme: ITheme = {
  boxShadows: 'box-shadow: 0px 4px 24px -8px rgba(0,0,0,0.75)',
  font: font,
  spaces: [0, 4, 8, 16, 32, 64, 128],
  fontSizes: [12, 14, 16, 20, 24, 32, 40, 56, 72, 80],
  colors: {
    primary,
    secondary,
    secondaryLight,
    secondaryDark,
    secondaryGrey,
    secondaryDarkGrey,
    secondaryLightGrey,
    textGrey,
    black,
    white,
    error,
    body,
  },
}

// const secondaryDark = '#213055' //header
// const secondaryGrey = '#787C87' //operand's button bg
// const secondaryDarkGrey = '#374B57'
// const secondaryLightGrey = '#D8E6F2' //display and history bg
// const textGrey = '#525A66' //grey fonts
// const body = '#6d84b1' //body

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  type: ThemeEnum.light,

  colors: {
    ...baseTheme.colors,
    secondaryDark: '#213055',
    secondaryLightGrey: '#d8e6f2',
    secondaryDarkGrey: '#374B57',
    textGrey: '#525a66',
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
    black: '#d8e6f2',
    body: '#213055',
  },
}

export default { baseTheme }

// export default {
//   boxShadows,
//   font,
//   spaces: [0, 4, 8, 16, 32, 64, 128],
//   fontSizes: [12, 14, 16, 20, 24, 32, 40, 56, 72, 80],
//   colors: {
//     primary,
//     secondary,
//     secondaryLight,
//     secondaryDark,
//     secondaryGrey,
//     secondaryDarkGrey,
//     secondaryLightGrey,
//     textGrey,
//     black,
//     white,
//     error,
//   },
// }
