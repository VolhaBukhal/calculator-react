export const localStorageSetHistory = (historyCalc: string[]) => {
  const stringifiedValue = JSON.stringify(historyCalc)
  localStorage.setItem('historyCalc', stringifiedValue)
}

export const localStorageGetHistory = () => {
  const storedHistory = localStorage.getItem('historyCalc')
  return storedHistory ? JSON.parse(storedHistory) : []
}

export const localStorageClear = () => {
  localStorage.clear()
}
