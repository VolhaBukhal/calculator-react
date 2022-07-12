import { ThemeListKeys } from '@/App'

export const localStorageSetHistory = (historyCalc: string[]) => {
  const stringifiedValue = JSON.stringify(historyCalc)
  localStorage.setItem('historyCalc', stringifiedValue)
}

export const localStorageGetHistory = () => {
  const storedHistory = localStorage.getItem('historyCalc')
  return storedHistory ? JSON.parse(storedHistory) : []
}

export const localStorageSetTheme = (theme: string) => {
  const stringifiedValue = JSON.stringify(theme)
  localStorage.setItem('CalcTheme', stringifiedValue)
}

export const localStorageGetTheme = (): ThemeListKeys => {
  const storedTheme = localStorage.getItem('CalcTheme')
  return storedTheme ? JSON.parse(storedTheme) : 'light'
}

export const localStorageClear = () => {
  localStorage.clear()
}
