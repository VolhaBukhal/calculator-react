export interface ITheme {
  boxShadows: string
  font: string
  spaces: number[]
  body: string
  colors: {
    primary: string
    secondary: string
    secondaryLight: string
    secondaryDark: string
    secondaryGrey: string
    secondaryDarkGrey: string
    secondaryLightGrey: string
    buttonGreyLight: string
    buttonGreyDark: string
    textGrey: string
    black: string
    white: string
    error: string
    body: string
  }
  fontSizes: number[]
  size: MediaSizes
  transition: string
}

export type MediaSizes = {
  xs: number
  small: number
  med: number
  large: number
}

export enum ThemeEnum {
  light = 'light',
  dark = 'dark',
  colored = 'colored',
}

export enum ThemeBody {
  bodyLight = '#6d84b1',
  bodyDark = '#374b57',
}
