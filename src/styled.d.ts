import 'styled-components'

import { ITheme, ThemeEnum, ThemeBody, MediaSizes } from './styled'

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {
    type: ThemeEnum
    body: ThemeBody
    colors: {
      buttonGreyLight: string
      buttonGreyDark: string
      black: string
      white: string
    }
    size: MediaSizes
  }
}
