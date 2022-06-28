import { v4 as uuid } from 'uuid'

import { HistoryStyled, HistoryHeading, Divider, HistoryContent, HistoryItem } from './components'

type HistoryProps = {
  historyData: Array<string>
}

export const History = ({ historyData }: HistoryProps) => (
  <HistoryStyled>
    <HistoryHeading>History</HistoryHeading>
    <Divider />
    <HistoryContent>
      {historyData.map((expr) => (
        <HistoryItem key={uuid()}>{expr}</HistoryItem>
      ))}
    </HistoryContent>
  </HistoryStyled>
)
