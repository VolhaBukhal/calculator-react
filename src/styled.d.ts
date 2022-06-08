import 'styled-components'
import { ITheme, ThemeEnum } from './styled'

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {
    type: ThemeEnum
  }
}
