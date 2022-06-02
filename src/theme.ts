import { css } from 'styled-components'

const font = 'sans-serif'

// Color palette
const black = '#000000'
const white = '#ffffff'
const error = '#c86464'
const primary = '#6d84b1'
const secondary = '#6c5b7b'
const secondaryLight = '#6a6b7b'
const secondaryDark = '#213055'

const boxShadows = ['box-shadow: 0px 4px 24px -8px rgba(0,0,0,0.75)']

const size = {
  xs: 550,
  small: 768,
  med: 992,
  large: 1200,
}

export default {
  boxShadows,
  font,
  spaces: [0, 4, 8, 16, 32, 64, 128],
  fontSizes: [12, 14, 16, 20, 24, 32, 40, 56, 72, 80],
  colors: {
    primary,
    secondary,
    secondaryLight,
    secondaryDark,
    black,
    white,
    error,
  },
}
