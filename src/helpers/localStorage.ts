export const localStorageSetHistory = (historyCalc: string[]) => {
  const stringifiedValue = JSON.stringify(historyCalc)
  localStorage.setItem('historyCalc', stringifiedValue)
}

export const localStorageGetHistory = () => {
  const storedHistory: string[] = JSON.parse(JSON.stringify('historyCalc'))
  return storedHistory
}
