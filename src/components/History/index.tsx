import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'

import { HistoryStyled, HistoryHeading, Divider, HistoryContent, HistoryItem } from './components'

interface HistoryProps {
  historyData: Array<string>
}

class History extends Component<HistoryProps> {
  render() {
    return (
      <HistoryStyled>
        <HistoryHeading>History</HistoryHeading>
        <Divider />
        <HistoryContent data-cy="history-list">
          {this.props.historyData.map((expr) => (
            <HistoryItem key={uuid()}>{expr}</HistoryItem>
          ))}
        </HistoryContent>
      </HistoryStyled>
    )
  }
}

export { History }
