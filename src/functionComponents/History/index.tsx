import { v4 as uuid } from 'uuid'

import { HistoryProps } from './types'

import { HistoryStyled, HistoryHeading, Divider, HistoryContent, HistoryItem } from './styles'

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
