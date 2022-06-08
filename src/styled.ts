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
  transition: string
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

// boxShadows,
// font,
// spaces: [0, 4, 8, 16, 32, 64, 128],
// fontSizes: [12, 14, 16, 20, 24, 32, 40, 56, 72, 80],
// colors: {
//   primary,
//   secondary,
//   secondaryLight,
//   secondaryDark,
//   secondaryGrey,
//   secondaryDarkGrey,
//   secondaryLightGrey,
//   textGrey,
//   black,
//   white,
//   error,
// },
